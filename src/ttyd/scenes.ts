
import * as Viewer from '../viewer';
import Progressable from '../Progressable';
import { fetch } from '../util';

import * as TPL from './tpl';
import * as World from './world';
import { WorldRenderer, TPLTextureHolder } from './render';

class TTYDSceneDesc implements Viewer.SceneDesc {
    constructor(public id: string, public name: string = id) {
    }

    public createScene(gl: WebGL2RenderingContext): Progressable<Viewer.Scene> {
        const pathBase = `data/ttyd/${this.id}`;
        return Progressable.all([fetch(`${pathBase}/d.blob`), fetch(`${pathBase}/t.blob`)]).then(([dBuffer, tBuffer]) => {
            const d = World.parse(dBuffer);
            const textureHolder = new TPLTextureHolder();
            const tpl = TPL.parse(tBuffer, d.textureNameTable);
            textureHolder.addTPLTextures(gl, tpl);
            return new WorldRenderer(gl, d, textureHolder);
        });
    }
}

const sceneDescs: Viewer.SceneDesc[] = [
    new TTYDSceneDesc('aaa_00'),
    new TTYDSceneDesc('aji_00'),
    new TTYDSceneDesc('aji_01'),
    new TTYDSceneDesc('aji_02'),
    new TTYDSceneDesc('aji_03'),
    new TTYDSceneDesc('aji_04'),
    new TTYDSceneDesc('aji_05'),
    new TTYDSceneDesc('aji_06'),
    new TTYDSceneDesc('aji_07'),
    new TTYDSceneDesc('aji_08'),
    new TTYDSceneDesc('aji_09'),
    new TTYDSceneDesc('aji_10'),
    new TTYDSceneDesc('aji_11'),
    new TTYDSceneDesc('aji_12'),
    new TTYDSceneDesc('aji_13'),
    new TTYDSceneDesc('aji_14'),
    new TTYDSceneDesc('aji_15'),
    new TTYDSceneDesc('aji_16'),
    new TTYDSceneDesc('aji_17'),
    new TTYDSceneDesc('aji_18'),
    new TTYDSceneDesc('aji_19'),
    new TTYDSceneDesc('bom_00'),
    new TTYDSceneDesc('bom_01'),
    new TTYDSceneDesc('bom_02'),
    new TTYDSceneDesc('bom_03'),
    new TTYDSceneDesc('bom_04'),
    new TTYDSceneDesc('bti_01'),
    new TTYDSceneDesc('bti_02'),
    new TTYDSceneDesc('bti_03'),
    new TTYDSceneDesc('bti_04'),
    new TTYDSceneDesc('dou_00'),
    new TTYDSceneDesc('dou_01'),
    new TTYDSceneDesc('dou_02'),
    new TTYDSceneDesc('dou_03'),
    new TTYDSceneDesc('dou_04'),
    new TTYDSceneDesc('dou_05'),
    new TTYDSceneDesc('dou_06'),
    new TTYDSceneDesc('dou_07'),
    new TTYDSceneDesc('dou_08'),
    new TTYDSceneDesc('dou_09'),
    new TTYDSceneDesc('dou_10'),
    new TTYDSceneDesc('dou_11'),
    new TTYDSceneDesc('dou_12'),
    new TTYDSceneDesc('dou_13'),
    new TTYDSceneDesc('eki_00'),
    new TTYDSceneDesc('eki_01'),
    new TTYDSceneDesc('eki_02'),
    new TTYDSceneDesc('eki_03'),
    new TTYDSceneDesc('eki_04'),
    new TTYDSceneDesc('eki_05'),
    new TTYDSceneDesc('eki_06'),
    new TTYDSceneDesc('end_00'),
    new TTYDSceneDesc('gon_00'),
    new TTYDSceneDesc('gon_01'),
    new TTYDSceneDesc('gon_02'),
    new TTYDSceneDesc('gon_03'),
    new TTYDSceneDesc('gon_04'),
    new TTYDSceneDesc('gon_05'),
    new TTYDSceneDesc('gon_06'),
    new TTYDSceneDesc('gon_07'),
    new TTYDSceneDesc('gon_08'),
    new TTYDSceneDesc('gon_09'),
    new TTYDSceneDesc('gon_10'),
    new TTYDSceneDesc('gon_11'),
    new TTYDSceneDesc('gon_12'),
    new TTYDSceneDesc('gon_13'),
    new TTYDSceneDesc('gor_00'),
    new TTYDSceneDesc('gor_01'),
    new TTYDSceneDesc('gor_02'),
    new TTYDSceneDesc('gor_03'),
    new TTYDSceneDesc('gor_04'),
    new TTYDSceneDesc('gor_10'),
    new TTYDSceneDesc('gor_11'),
    new TTYDSceneDesc('gor_12'),
    new TTYDSceneDesc('gra_00'),
    new TTYDSceneDesc('gra_01'),
    new TTYDSceneDesc('gra_02'),
    new TTYDSceneDesc('gra_03'),
    new TTYDSceneDesc('gra_04'),
    new TTYDSceneDesc('gra_05'),
    new TTYDSceneDesc('gra_06'),
    new TTYDSceneDesc('hei_00'),
    new TTYDSceneDesc('hei_01'),
    new TTYDSceneDesc('hei_02'),
    new TTYDSceneDesc('hei_03'),
    new TTYDSceneDesc('hei_04'),
    new TTYDSceneDesc('hei_05'),
    new TTYDSceneDesc('hei_06'),
    new TTYDSceneDesc('hei_07'),
    new TTYDSceneDesc('hei_08'),
    new TTYDSceneDesc('hei_09'),
    new TTYDSceneDesc('hei_10'),
    new TTYDSceneDesc('hei_11'),
    new TTYDSceneDesc('hei_12'),
    new TTYDSceneDesc('hei_13'),
    new TTYDSceneDesc('hom_00'),
    new TTYDSceneDesc('hom_10'),
    new TTYDSceneDesc('hom_11'),
    new TTYDSceneDesc('hom_12'),
    new TTYDSceneDesc('jin_00'),
    new TTYDSceneDesc('jin_01'),
    new TTYDSceneDesc('jin_02'),
    new TTYDSceneDesc('jin_03'),
    new TTYDSceneDesc('jin_04'),
    new TTYDSceneDesc('jin_05'),
    new TTYDSceneDesc('jin_06'),
    new TTYDSceneDesc('jin_07'),
    new TTYDSceneDesc('jin_08'),
    new TTYDSceneDesc('jin_09'),
    new TTYDSceneDesc('jin_10'),
    new TTYDSceneDesc('jin_11'),
    new TTYDSceneDesc('jon_00'),
    new TTYDSceneDesc('jon_01'),
    new TTYDSceneDesc('jon_02'),
    new TTYDSceneDesc('jon_03'),
    new TTYDSceneDesc('jon_04'),
    new TTYDSceneDesc('jon_05'),
    new TTYDSceneDesc('jon_06'),
    new TTYDSceneDesc('kpa_00'),
    new TTYDSceneDesc('kpa_01'),
    new TTYDSceneDesc('kpa_02'),
    new TTYDSceneDesc('kpa_03'),
    new TTYDSceneDesc('kpa_04'),
    new TTYDSceneDesc('kpa_05'),
    new TTYDSceneDesc('kpa_06'),
    new TTYDSceneDesc('kpa_07'),
    new TTYDSceneDesc('las_00'),
    new TTYDSceneDesc('las_01'),
    new TTYDSceneDesc('las_02'),
    new TTYDSceneDesc('las_03'),
    new TTYDSceneDesc('las_04'),
    new TTYDSceneDesc('las_05'),
    new TTYDSceneDesc('las_06'),
    new TTYDSceneDesc('las_07'),
    new TTYDSceneDesc('las_08'),
    new TTYDSceneDesc('las_09'),
    new TTYDSceneDesc('las_10'),
    new TTYDSceneDesc('las_11'),
    new TTYDSceneDesc('las_12'),
    new TTYDSceneDesc('las_13'),
    new TTYDSceneDesc('las_14'),
    new TTYDSceneDesc('las_15'),
    new TTYDSceneDesc('las_16'),
    new TTYDSceneDesc('las_17'),
    new TTYDSceneDesc('las_18'),
    new TTYDSceneDesc('las_19'),
    new TTYDSceneDesc('las_20'),
    new TTYDSceneDesc('las_21'),
    new TTYDSceneDesc('las_22'),
    new TTYDSceneDesc('las_23'),
    new TTYDSceneDesc('las_24'),
    new TTYDSceneDesc('las_25'),
    new TTYDSceneDesc('las_26'),
    new TTYDSceneDesc('las_27'),
    new TTYDSceneDesc('las_28'),
    new TTYDSceneDesc('las_29'),
    new TTYDSceneDesc('las_30'),
    new TTYDSceneDesc('moo_00'),
    new TTYDSceneDesc('moo_01'),
    new TTYDSceneDesc('moo_02'),
    new TTYDSceneDesc('moo_03'),
    new TTYDSceneDesc('moo_04'),
    new TTYDSceneDesc('moo_05'),
    new TTYDSceneDesc('moo_06'),
    new TTYDSceneDesc('moo_07'),
    new TTYDSceneDesc('mri_00'),
    new TTYDSceneDesc('mri_01'),
    new TTYDSceneDesc('mri_02'),
    new TTYDSceneDesc('mri_03'),
    new TTYDSceneDesc('mri_04'),
    new TTYDSceneDesc('mri_05'),
    new TTYDSceneDesc('mri_06'),
    new TTYDSceneDesc('mri_07'),
    new TTYDSceneDesc('mri_08'),
    new TTYDSceneDesc('mri_09'),
    new TTYDSceneDesc('mri_10'),
    new TTYDSceneDesc('mri_11'),
    new TTYDSceneDesc('mri_12'),
    new TTYDSceneDesc('mri_13'),
    new TTYDSceneDesc('mri_14'),
    new TTYDSceneDesc('mri_15'),
    new TTYDSceneDesc('mri_16'),
    new TTYDSceneDesc('mri_17'),
    new TTYDSceneDesc('mri_18'),
    new TTYDSceneDesc('mri_19'),
    new TTYDSceneDesc('mri_20'),
    new TTYDSceneDesc('muj_00'),
    new TTYDSceneDesc('muj_01'),
    new TTYDSceneDesc('muj_02'),
    new TTYDSceneDesc('muj_03'),
    new TTYDSceneDesc('muj_04'),
    new TTYDSceneDesc('muj_05'),
    new TTYDSceneDesc('muj_10'),
    new TTYDSceneDesc('muj_11'),
    new TTYDSceneDesc('muj_12'),
    new TTYDSceneDesc('muj_20'),
    new TTYDSceneDesc('muj_21'),
    new TTYDSceneDesc('nok_00'),
    new TTYDSceneDesc('nok_01'),
    new TTYDSceneDesc('pik_00'),
    new TTYDSceneDesc('pik_01'),
    new TTYDSceneDesc('pik_02'),
    new TTYDSceneDesc('pik_03'),
    new TTYDSceneDesc('pik_04'),
    new TTYDSceneDesc('rsh_00_a'),
    new TTYDSceneDesc('rsh_00_b'),
    new TTYDSceneDesc('rsh_00_c'),
    new TTYDSceneDesc('rsh_01_a'),
    new TTYDSceneDesc('rsh_01_b'),
    new TTYDSceneDesc('rsh_01_c'),
    new TTYDSceneDesc('rsh_02'),
    new TTYDSceneDesc('rsh_02_a'),
    new TTYDSceneDesc('rsh_02_b'),
    new TTYDSceneDesc('rsh_02_c'),
    new TTYDSceneDesc('rsh_03_a'),
    new TTYDSceneDesc('rsh_03_b'),
    new TTYDSceneDesc('rsh_03_c'),
    new TTYDSceneDesc('rsh_04_a'),
    new TTYDSceneDesc('rsh_04_b'),
    new TTYDSceneDesc('rsh_04_c'),
    new TTYDSceneDesc('rsh_05_a'),
    new TTYDSceneDesc('rsh_05_b'),
    new TTYDSceneDesc('rsh_05_c'),
    new TTYDSceneDesc('rsh_06_a'),
    new TTYDSceneDesc('rsh_06_b'),
    new TTYDSceneDesc('rsh_06_c'),
    new TTYDSceneDesc('rsh_07_a'),
    new TTYDSceneDesc('rsh_07_b'),
    new TTYDSceneDesc('rsh_07_c'),
    new TTYDSceneDesc('rsh_08_a'),
    new TTYDSceneDesc('stg_00_0'),
    new TTYDSceneDesc('stg_00_1'),
    new TTYDSceneDesc('stg_00_2'),
    new TTYDSceneDesc('stg_00_3'),
    new TTYDSceneDesc('stg_00_4'),
    new TTYDSceneDesc('stg_01'),
    new TTYDSceneDesc('stg_01_0'),
    new TTYDSceneDesc('stg_01_1'),
    new TTYDSceneDesc('stg_01_2'),
    new TTYDSceneDesc('stg_01_3'),
    new TTYDSceneDesc('stg_01_4'),
    new TTYDSceneDesc('stg_01_5'),
    new TTYDSceneDesc('stg_01_6'),
    new TTYDSceneDesc('stg_02'),
    new TTYDSceneDesc('stg_02_0'),
    new TTYDSceneDesc('stg_02_1'),
    new TTYDSceneDesc('stg_03'),
    new TTYDSceneDesc('stg_03_0'),
    new TTYDSceneDesc('stg_04'),
    new TTYDSceneDesc('stg_04_0'),
    new TTYDSceneDesc('stg_04_1'),
    new TTYDSceneDesc('stg_04_2'),
    new TTYDSceneDesc('stg_04_3'),
    new TTYDSceneDesc('stg_04_4'),
    new TTYDSceneDesc('stg_04_5'),
    new TTYDSceneDesc('stg_04_6'),
    new TTYDSceneDesc('stg_05_0'),
    new TTYDSceneDesc('stg_05_1'),
    new TTYDSceneDesc('stg_05_2'),
    new TTYDSceneDesc('stg_05_3'),
    new TTYDSceneDesc('stg_05_4'),
    new TTYDSceneDesc('stg_05_5'),
    new TTYDSceneDesc('stg_06_0'),
    new TTYDSceneDesc('stg_06_1'),
    new TTYDSceneDesc('stg_06_2'),
    new TTYDSceneDesc('stg_06_3'),
    new TTYDSceneDesc('stg_06_4'),
    new TTYDSceneDesc('stg_07_0'),
    new TTYDSceneDesc('stg_07_1'),
    new TTYDSceneDesc('stg_07_2'),
    new TTYDSceneDesc('stg_07_3'),
    new TTYDSceneDesc('stg_07_4'),
    new TTYDSceneDesc('stg_07_5'),
    new TTYDSceneDesc('stg_07_6'),
    new TTYDSceneDesc('stg_08_0'),
    new TTYDSceneDesc('stg_08_1'),
    new TTYDSceneDesc('stg_08_2'),
    new TTYDSceneDesc('stg_08_3'),
    new TTYDSceneDesc('stg_08_4'),
    new TTYDSceneDesc('stg_08_5'),
    new TTYDSceneDesc('stg_08_6'),
    new TTYDSceneDesc('stg01_1'),
    new TTYDSceneDesc('sys_00'),
    new TTYDSceneDesc('sys_01'),
    new TTYDSceneDesc('tik_00'),
    new TTYDSceneDesc('tik_01'),
    new TTYDSceneDesc('tik_02'),
    new TTYDSceneDesc('tik_03'),
    new TTYDSceneDesc('tik_04'),
    new TTYDSceneDesc('tik_05'),
    new TTYDSceneDesc('tik_06'),
    new TTYDSceneDesc('tik_07'),
    new TTYDSceneDesc('tik_08'),
    new TTYDSceneDesc('tik_09'),
    new TTYDSceneDesc('tik_10'),
    new TTYDSceneDesc('tik_11'),
    new TTYDSceneDesc('tik_12'),
    new TTYDSceneDesc('tik_13'),
    new TTYDSceneDesc('tik_14'),
    new TTYDSceneDesc('tik_15'),
    new TTYDSceneDesc('tik_16'),
    new TTYDSceneDesc('tik_17'),
    new TTYDSceneDesc('tik_18'),
    new TTYDSceneDesc('tik_19'),
    new TTYDSceneDesc('tik_20'),
    new TTYDSceneDesc('tik_21'),
    new TTYDSceneDesc('tou_00'),
    new TTYDSceneDesc('tou_01'),
    new TTYDSceneDesc('tou_02'),
    new TTYDSceneDesc('tou_03'),
    new TTYDSceneDesc('tou_04'),
    new TTYDSceneDesc('tou_05'),
    new TTYDSceneDesc('tou_06'),
    new TTYDSceneDesc('tou_07'),
    new TTYDSceneDesc('tou_08'),
    new TTYDSceneDesc('tou_09'),
    new TTYDSceneDesc('tou_10'),
    new TTYDSceneDesc('tou_11'),
    new TTYDSceneDesc('tou_12'),
    new TTYDSceneDesc('tou_13'),
    new TTYDSceneDesc('tou_20'),
    new TTYDSceneDesc('usu_00'),
    new TTYDSceneDesc('usu_01'),
    new TTYDSceneDesc('win_00'),
    new TTYDSceneDesc('win_01'),
    new TTYDSceneDesc('win_02'),
    new TTYDSceneDesc('win_03'),
    new TTYDSceneDesc('win_04'),
    new TTYDSceneDesc('win_05'),
    new TTYDSceneDesc('win_06'),
    new TTYDSceneDesc('yuu_00'),
    new TTYDSceneDesc('yuu_01'),
    new TTYDSceneDesc('yuu_02'),
    new TTYDSceneDesc('yuu_03'),
];

const id = 'ttyd';
const name = 'Paper Mario: The Thousand Year Door';
export const sceneGroup: Viewer.SceneGroup = { id, name, sceneDescs };