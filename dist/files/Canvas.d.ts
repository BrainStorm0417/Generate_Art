/*! Source code licensed under Apache License 2.0. Copyright © 2017-current William Ngan and contributors. (https://github.com/williamngan/pts) */
import { MultiTouchSpace } from './Space';
import { VisualForm, Font } from "./Form";
import { Pt, Bound } from "./Pt";
import { PtLike, GroupLike, PtsCanvasRenderingContext2D } from "./Types";
export declare class CanvasSpace extends MultiTouchSpace {
    protected _canvas: HTMLCanvasElement;
    protected _container: Element;
    protected _pixelScale: number;
    protected _autoResize: boolean;
    protected _bgcolor: string;
    protected _ctx: PtsCanvasRenderingContext2D;
    protected _offscreen: boolean;
    protected _offCanvas: HTMLCanvasElement;
    protected _offCtx: PtsCanvasRenderingContext2D;
    protected _initialResize: boolean;
    constructor(elem: string | Element, callback?: Function);
    protected _createElement(elem: string, id: any): HTMLElement;
    private _ready;
    setup(opt: {
        bgcolor?: string;
        resize?: boolean;
        retina?: boolean;
        offscreen?: boolean;
    }): this;
    autoResize: boolean;
    resize(b: Bound, evt?: Event): this;
    protected _resizeHandler(evt: Event): void;
    background: string;
    readonly pixelScale: number;
    readonly hasOffscreen: boolean;
    readonly offscreenCtx: PtsCanvasRenderingContext2D;
    readonly offscreenCanvas: HTMLCanvasElement;
    getForm(): CanvasForm;
    readonly element: HTMLCanvasElement;
    readonly parent: Element;
    readonly ready: boolean;
    readonly ctx: PtsCanvasRenderingContext2D;
    clear(bg?: string): this;
    clearOffscreen(bg?: string): this;
    protected playItems(time: number): void;
}
export declare class CanvasForm extends VisualForm {
    protected _space: CanvasSpace;
    protected _ctx: CanvasRenderingContext2D;
    protected _estimateTextWidth: (string: any) => number;
    protected _style: {
        fillStyle: string;
        strokeStyle: string;
        lineWidth: number;
        lineJoin: string;
        lineCap: string;
        globalAlpha: number;
    };
    constructor(space: CanvasSpace);
    readonly space: CanvasSpace;
    useOffscreen(off?: boolean, clear?: boolean | string): this;
    renderOffscreen(offset?: PtLike): void;
    alpha(a: number): this;
    fill(c: string | boolean): this;
    stroke(c: string | boolean, width?: number, linejoin?: CanvasLineJoin, linecap?: CanvasLineCap): this;
    font(sizeOrFont: number | Font, weight?: string, style?: string, lineHeight?: number, family?: string): this;
    fontWidthEstimate(estimate?: boolean): this;
    getTextWidth(c: string): number;
    protected _textTruncate(str: string, width: number, tail?: string): [string, number];
    protected _textAlign(box: GroupLike, vertical: string, offset?: PtLike, center?: Pt): Pt;
    reset(): this;
    protected _paint(): void;
    point(p: PtLike, radius?: number, shape?: string): this;
    static circle(ctx: CanvasRenderingContext2D, pt: PtLike, radius?: number): void;
    circle(pts: GroupLike | number[][]): this;
    static ellipse(ctx: CanvasRenderingContext2D, pt: PtLike, radius: PtLike, rotation?: number, startAngle?: number, endAngle?: number, cc?: boolean): void;
    ellipse(pt: PtLike, radius: PtLike, rotation?: number, startAngle?: number, endAngle?: number, cc?: boolean): this;
    static arc(ctx: CanvasRenderingContext2D, pt: PtLike, radius: number, startAngle: number, endAngle: number, cc?: boolean): void;
    arc(pt: PtLike, radius: number, startAngle: number, endAngle: number, cc?: boolean): this;
    static square(ctx: CanvasRenderingContext2D, pt: PtLike, halfsize: number): void;
    square(pt: PtLike, halfsize: number): this;
    static line(ctx: CanvasRenderingContext2D, pts: GroupLike | number[][]): void;
    line(pts: GroupLike | number[][]): this;
    static polygon(ctx: CanvasRenderingContext2D, pts: GroupLike | number[][]): void;
    polygon(pts: GroupLike | number[][]): this;
    static rect(ctx: CanvasRenderingContext2D, pts: GroupLike | number[][]): void;
    rect(pts: number[][] | Pt[]): this;
    static image(ctx: CanvasRenderingContext2D, img: ImageBitmap, target?: PtLike | GroupLike, orig?: GroupLike): void;
    image(img: ImageBitmap, target: PtLike | GroupLike, original?: GroupLike): this;
    static text(ctx: CanvasRenderingContext2D, pt: PtLike, txt: string, maxWidth?: number): void;
    text(pt: PtLike, txt: string, maxWidth?: number): this;
    textBox(box: GroupLike, txt: string, verticalAlign?: string, tail?: string, overrideBaseline?: boolean): this;
    paragraphBox(box: GroupLike, txt: string, lineHeight?: number, verticalAlign?: string, crop?: boolean): this;
    alignText(alignment?: CanvasTextAlign, baseline?: CanvasTextBaseline): this;
    log(txt: any): this;
}
