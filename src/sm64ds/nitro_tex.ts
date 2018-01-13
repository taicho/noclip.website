// Read DS texture formats.

export enum Format {
    Tex_None =       0x00,
    Tex_A3I5 =       0x01,
    Tex_Palette4 =   0x02,
    Tex_Palette16 =  0x03,
    Tex_Palette256 = 0x04,
    Tex_CMPR_4x4 =   0x05,
    Tex_A5I3 =       0x06,
    Tex_Direct =     0x07,
}

function expand3to8(n: number): number {
    return (n << (8 - 3)) | (n << (8 - 6)) | (n >>> (9 - 8));
}

function expand5to8(n: number): number {
    return (n << (8 - 5)) | (n >>> (10 - 8));
}

function s3tcblend(a: number, b: number): number {
    // return (a*3 + b*5) / 8;
    return (((a << 1) + a) + ((b << 2) + b)) >>> 3;
}

export function bgr5(pixels: Uint8Array, dstOffs: number, p: number) {
    pixels[dstOffs + 0] = expand5to8(p & 0x1F);
    pixels[dstOffs + 1] = expand5to8((p >>> 5) & 0x1F);
    pixels[dstOffs + 2] = expand5to8((p >>> 10) & 0x1F);
}

function readTexture_A3I5(width: number, height: number, texData: ArrayBuffer, palData: ArrayBuffer): Uint8Array {
    const pixels = new Uint8Array(width * height * 4);
    const texView = new DataView(texData);
    const palView = new DataView(palData);
    let srcOffs = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const texBlock = texView.getUint8(srcOffs++);
            const palIdx = (texBlock & 0x1F) << 1;
            const alpha = texBlock >>> 5;
            const p = palView.getUint16(palIdx, true);
            const dstOffs = 4 * ((y * width) + x);
            bgr5(pixels, dstOffs, p);
            pixels[dstOffs + 3] = expand3to8(alpha);
        }
    }
    return pixels;
}

function readTexture_Palette16(width: number, height: number, texData: ArrayBuffer,
                               palData: ArrayBuffer, color0: boolean) {
    const pixels = new Uint8Array(width * height * 4);
    const texView = new DataView(texData);
    const palView = new DataView(palData);
    let srcOffs = 0;
    for (let y = 0; y < height; y++) {
        for (let xx = 0; xx < width; xx += 4) {
            let texBlock = texView.getUint16(srcOffs, true);
            srcOffs += 2;
            for (let x = 0; x < 4; x++) {
                const palIdx = texBlock & 0x0F;
                const p = palView.getUint16(palIdx * 2, true);
                const dstOffs = 4 * ((y * width) + xx + x);
                bgr5(pixels, dstOffs, p);
                pixels[dstOffs + 3] = palIdx === 0 ? (color0 ? 0x00 : 0xFF) : 0xFF;
                texBlock >>= 4;
            }
        }
    }
    return pixels;
}

function readTexture_Palette256(width: number, height: number, texData: ArrayBuffer,
                                palData: ArrayBuffer, color0: boolean) {
    const pixels = new Uint8Array(width * height * 4);
    const texView = new DataView(texData);
    const palView = new DataView(palData);
    let srcOffs = 0;
    for (let y = 0; y < height; y++) {
        for (let xx = 0; xx < width; xx++) {
            const palIdx = texView.getUint8(srcOffs++);
            const p = palView.getUint16(palIdx * 2, true);
            const dstOffs = 4 * ((y * width) + xx);
            bgr5(pixels, dstOffs, p);
            pixels[dstOffs + 3] = palIdx === 0 ? (color0 ? 0x00 : 0xFF) : 0xFF;
        }
    }
    return pixels;
}

function readTexture_CMPR_4x4(width: number, height: number, texData: ArrayBuffer, palData: ArrayBuffer) {
    function getPal16(offs) {
        return offs < palView.byteLength ? palView.getUint16(offs, true) : 0;
    }

    function buildColorTable(palBlock) {
        const palMode = palBlock >> 14;
        const palOffs = (palBlock & 0x3FFF) << 2;

        const colorTable = new Uint8Array(16);

        const p0 = getPal16(palOffs + 0x00);
        bgr5(colorTable, 0, p0);
        colorTable[3] = 0xFF;

        const p1 = getPal16(palOffs + 0x02);
        bgr5(colorTable, 4, p1);
        colorTable[7] = 0xFF;

        if (palMode === 0) {
            // PTY=0, A=0
            const p2 = getPal16(palOffs + 0x04);
            bgr5(colorTable, 8, p2);
            colorTable[11] = 0xFF;
            // Color4 is transparent black.
        } else if (palMode === 1) {
            // PTY=1, A=0
            // Color3 is a blend of Color1/Color2.
            colorTable[8]  = (colorTable[0] + colorTable[4]) >>> 1;
            colorTable[9]  = (colorTable[1] + colorTable[5]) >>> 1;
            colorTable[10] = (colorTable[2] + colorTable[6]) >>> 1;
            colorTable[11] = 0xFF;
            // Color4 is transparent black.
        } else if (palMode === 2) {
            // PTY=0, A=1
            const p2 = getPal16(palOffs + 0x04);
            bgr5(colorTable, 8, p2);
            colorTable[11] = 0xFF;

            const p3 = getPal16(palOffs + 0x06);
            bgr5(colorTable, 12, p3);
            colorTable[15] = 0xFF;
        } else {
            colorTable[8]  = s3tcblend(colorTable[4], colorTable[0]);
            colorTable[9]  = s3tcblend(colorTable[5], colorTable[1]);
            colorTable[10] = s3tcblend(colorTable[6], colorTable[2]);
            colorTable[11] = 0xFF;

            colorTable[12] = s3tcblend(colorTable[0], colorTable[4]);
            colorTable[13] = s3tcblend(colorTable[1], colorTable[5]);
            colorTable[14] = s3tcblend(colorTable[2], colorTable[6]);
            colorTable[15] = 0xFF;
        }

        return colorTable;
    }

    const pixels = new Uint8Array(width * height * 4);
    const texView = new DataView(texData);
    const palView = new DataView(palData);

    const palIdxStart = (width * height) / 4;

    let srcOffs = 0;
    for (let yy = 0; yy < height; yy += 4) {
        for (let xx = 0; xx < width; xx += 4) {
            let texBlock = texView.getUint32((srcOffs * 0x04), true);
            const palBlock = texView.getUint16(palIdxStart + (srcOffs * 0x02), true);
            const colorTable = buildColorTable(palBlock);

            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    const colorIdx = texBlock & 0x03;
                    const dstOffs = 4 * (((yy + y) * width) + xx + x);
                    pixels[dstOffs + 0] = colorTable[colorIdx * 4 + 0];
                    pixels[dstOffs + 1] = colorTable[colorIdx * 4 + 1];
                    pixels[dstOffs + 2] = colorTable[colorIdx * 4 + 2];
                    pixels[dstOffs + 3] = colorTable[colorIdx * 4 + 3];
                    texBlock >>= 2;
                }
            }

            srcOffs++;
        }
    }
    return pixels;
}

function readTexture_A5I3(width: number, height: number, texData: ArrayBuffer, palData: ArrayBuffer) {
    const pixels = new Uint8Array(width * height * 4);
    const texView = new DataView(texData);
    const palView = new DataView(palData);
    let srcOffs = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const texBlock = texView.getUint8(srcOffs++);
            const palIdx = (texBlock & 0x03) << 1;
            const alpha = texBlock >>> 3;
            const p = palView.getUint16(palIdx, true);
            const dstOffs = 4 * ((y * width) + x);
            bgr5(pixels, dstOffs, p);
            pixels[dstOffs + 3] = expand5to8(alpha);
        }
    }
    return pixels;
}

function readTexture_Direct(width: number, height: number, texData: ArrayBuffer) {
    const pixels = new Uint8Array(width * height * 4);
    const texView = new DataView(texData);
    let srcOffs = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const p = texView.getUint16(srcOffs, true);
            const dstOffs = 4 * ((y * width) + x);
            bgr5(pixels, dstOffs, p);
            pixels[dstOffs + 3] = 0xFF;
            srcOffs += 2;
        }
    }
    return pixels;
}

export function readTexture(format: Format, width: number, height: number, texData: ArrayBuffer,
                            palData: ArrayBuffer, color0: boolean) {
    switch (format) {
    case Format.Tex_A3I5:
        return readTexture_A3I5(width, height, texData, palData);
    case Format.Tex_Palette16:
        return readTexture_Palette16(width, height, texData, palData, color0);
    case Format.Tex_Palette256:
        return readTexture_Palette256(width, height, texData, palData, color0);
    case Format.Tex_CMPR_4x4:
        return readTexture_CMPR_4x4(width, height, texData, palData);
    case Format.Tex_A5I3:
        return readTexture_A5I3(width, height, texData, palData);
    case Format.Tex_Direct:
        return readTexture_Direct(width, height, texData);
    default:
        throw new Error(`Unsupported texture type! ${format}`);
    }
}
