/*! Source code licensed under Apache License 2.0. Copyright © 2017-current William Ngan and contributors. (https://github.com/williamngan/pts) */
import { Pt, Group } from "./Pt";
import { ColorType } from "./Types";
export declare class Color extends Pt {
    private static D65;
    protected _mode: ColorType;
    private _isNorm;
    static ranges: {
        [name: string]: Group;
    };
    constructor(...args: any[]);
    static from(...args: any[]): Color;
    static fromHex(hex: string): Color;
    static rgb(...args: any[]): Color;
    static hsl(...args: any[]): Color;
    static hsb(...args: any[]): Color;
    static lab(...args: any[]): Color;
    static lch(...args: any[]): Color;
    static luv(...args: any[]): Color;
    static xyz(...args: any[]): Color;
    static maxValues(mode: string): Pt;
    get hex(): string;
    get rgb(): string;
    get rgba(): string;
    clone(): Color;
    toMode(mode: ColorType, convert?: boolean): this;
    get mode(): ColorType;
    get r(): number;
    set r(n: number);
    get g(): number;
    set g(n: number);
    get b(): number;
    set b(n: number);
    get h(): number;
    set h(n: number);
    get s(): number;
    set s(n: number);
    get l(): number;
    set l(n: number);
    get a(): number;
    set a(n: number);
    get c(): number;
    set c(n: number);
    get u(): number;
    set u(n: number);
    get v(): number;
    set v(n: number);
    set alpha(n: number);
    get alpha(): number;
    get normalized(): boolean;
    set normalized(b: boolean);
    normalize(toNorm?: boolean): Color;
    $normalize(toNorm?: boolean): Color;
    toString(format?: ("hex" | "rgb" | "rgba" | "mode")): string;
    static RGBtoHSL(rgb: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static HSLtoRGB(hsl: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static RGBtoHSB(rgb: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static HSBtoRGB(hsb: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static RGBtoLAB(rgb: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static LABtoRGB(lab: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static RGBtoLCH(rgb: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static LCHtoRGB(lch: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static RGBtoLUV(rgb: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static LUVtoRGB(luv: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static RGBtoXYZ(rgb: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static XYZtoRGB(xyz: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static XYZtoLAB(xyz: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static LABtoXYZ(lab: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static XYZtoLUV(xyz: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static LUVtoXYZ(luv: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static LABtoLCH(lab: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
    static LCHtoLAB(lch: Color, normalizedInput?: boolean, normalizedOutput?: boolean): Color;
}
