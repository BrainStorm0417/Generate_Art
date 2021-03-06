/*! Pts.js is licensed under Apache License 2.0. Copyright © 2017-current William Ngan and contributors. (https://github.com/williamngan/pts) */
import { VisualForm, Font } from "./Form";
import { Bound } from './Pt';
import { DOMSpace } from "./Dom";
import { PtLike, PtLikeIterable, IPlayer, DOMFormContext } from "./Types";
export declare class SVGSpace extends DOMSpace {
    protected _bgcolor: string;
    constructor(elem: string | Element, callback?: Function);
    getForm(): SVGForm;
    get element(): Element;
    resize(b: Bound, evt?: Event): this;
    static svgElement(parent: Element, name: string, id?: string): SVGElement;
    remove(player: IPlayer): this;
    removeAll(): this;
}
export declare class SVGForm extends VisualForm {
    protected _style: {
        filled: boolean;
        stroked: boolean;
        fill: string;
        stroke: string;
        "stroke-width": number;
        "stroke-linejoin": string;
        "stroke-linecap": string;
        opacity: number;
    };
    protected _ctx: DOMFormContext;
    static groupID: number;
    static domID: number;
    protected _space: SVGSpace;
    protected _ready: boolean;
    constructor(space: SVGSpace);
    get space(): SVGSpace;
    styleTo(k: any, v: any): void;
    alpha(a: number): this;
    fill(c: string | boolean): this;
    stroke(c: string | boolean, width?: number, linejoin?: string, linecap?: string): this;
    cls(c: string | boolean): this;
    font(sizeOrFont: number | Font, weight?: string, style?: string, lineHeight?: number, family?: string): this;
    reset(): this;
    updateScope(group_id: string, group?: Element): object;
    scope(item: IPlayer): object;
    nextID(): string;
    static getID(ctx: any): string;
    static scopeID(item: IPlayer): string;
    static style(elem: SVGElement, styles: object): Element;
    static point(ctx: DOMFormContext, pt: PtLike, radius?: number, shape?: string): SVGElement;
    point(pt: PtLike, radius?: number, shape?: string): this;
    static circle(ctx: DOMFormContext, pt: PtLike, radius?: number): SVGElement;
    circle(pts: PtLikeIterable): this;
    static arc(ctx: DOMFormContext, pt: PtLike, radius: number, startAngle: number, endAngle: number, cc?: boolean): SVGElement;
    arc(pt: PtLike, radius: number, startAngle: number, endAngle: number, cc?: boolean): this;
    static square(ctx: DOMFormContext, pt: PtLike, halfsize: number): SVGElement;
    square(pt: PtLike, halfsize: number): this;
    static line(ctx: DOMFormContext, pts: PtLikeIterable): SVGElement;
    line(pts: PtLikeIterable): this;
    protected static _poly(ctx: DOMFormContext, points: string, closePath?: boolean): SVGElement;
    protected static pointsString(pts: PtLikeIterable): {
        string: string;
        count: number;
    };
    static polygon(ctx: DOMFormContext, pts: PtLikeIterable): SVGElement;
    polygon(pts: PtLikeIterable): this;
    static rect(ctx: DOMFormContext, pts: PtLikeIterable): SVGElement;
    rect(pts: PtLikeIterable): this;
    static text(ctx: DOMFormContext, pt: PtLike, txt: string): SVGElement;
    text(pt: PtLike, txt: string): this;
    log(txt: any): this;
}
