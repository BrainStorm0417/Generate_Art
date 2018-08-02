
declare class Bound extends Group implements IPt {
    protected _center: Pt;
    protected _size: Pt;
    protected _topLeft: Pt;
    protected _bottomRight: Pt;
    protected _inited: boolean;
    constructor(...args: Pt[]);
    static fromBoundingRect(rect: ClientRect): Bound;
    static fromGroup(g: GroupLike): Bound;
    protected init(): void;
    clone(): Bound;
    protected _updateSize(): void;
    protected _updateCenter(): void;
    protected _updatePosFromTop(): void;
    protected _updatePosFromBottom(): void;
    protected _updatePosFromCenter(): void;
    size: Pt;
    center: Pt;
    topLeft: Pt;
    bottomRight: Pt;
    width: number;
    height: number;
    depth: number;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly inited: boolean;
    update(): this;
}

declare interface PtsCanvasRenderingContext2D extends CanvasRenderingContext2D {
    webkitBackingStorePixelRatio?: number;
    mozBackingStorePixelRatio?: number;
    msBackingStorePixelRatio?: number;
    oBackingStorePixelRatio?: number;
    backingStorePixelRatio?: number;
}
declare class CanvasSpace extends MultiTouchSpace {
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
declare class CanvasForm extends VisualForm {
    protected _space: CanvasSpace;
    protected _ctx: CanvasRenderingContext2D;
    protected _estimateTextWidth: (string) => number;
    protected _style: {
        fillStyle: string;
        strokeStyle: string;
        lineWidth: number;
        lineJoin: string;
        lineCap: string;
    };
    constructor(space: CanvasSpace);
    readonly space: CanvasSpace;
    useOffscreen(off?: boolean, clear?: boolean | string): this;
    renderOffscreen(offset?: PtLike): void;
    fill(c: string | boolean): this;
    stroke(c: string | boolean, width?: number, linejoin?: string, linecap?: string): this;
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
    alignText(alignment?: string, baseline?: string): this;
    log(txt: any): this;
}

declare type ColorType = "rgb" | "hsl" | "hsb" | "lab" | "lch" | "luv" | "xyz";
declare class Color extends Pt {
    protected _mode: ColorType;
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
    readonly hex: string;
    readonly rgb: string;
    readonly rgba: string;
    clone(): Color;
    toMode(mode: ColorType, convert?: boolean): this;
    readonly mode: ColorType;
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    l: number;
    a: number;
    c: number;
    u: number;
    v: number;
    readonly alpha: number;
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

declare class Create {
    static distributeRandom(bound: Bound, count: number, dimensions?: number): Group;
    static distributeLinear(line: GroupLike, count: number): Group;
    static gridPts(bound: Bound, columns: number, rows: number, orientation?: PtLike): Group;
    static gridCells(bound: Bound, columns: number, rows: number): Group[];
    static radialPts(center: PtLike, radius: number, count: number): Group;
    static noisePts(pts: GroupLike, dx?: number, dy?: number, rows?: number, columns?: number): Group;
    static delaunay(pts: GroupLike): Delaunay;
}
declare class Noise extends Pt {
    protected perm: number[];
    constructor(...args: any[]);
    initNoise(...args: any[]): void;
    step(x?: number, y?: number): void;
    seed(s: any): void;
    noise2D(): number;
}
declare type DelaunayShape = {
    i: number;
    j: number;
    k: number;
    triangle: GroupLike;
    circle: Group;
};
declare type DelaunayMesh = {
    [key: string]: DelaunayShape;
}[];
declare class Delaunay extends Group {
    delaunay(triangleOnly?: boolean): GroupLike[] | DelaunayShape[];
    voronoi(): Group[];
    mesh(): DelaunayMesh;
    neighborPts(i: number, sort?: boolean): GroupLike;
    neighbors(i: number): DelaunayShape[];
    protected _cache(o: any): void;
    protected _superTriangle(): Group;
    protected _triangle(i: number, j: number, k: number, pts?: GroupLike): Group;
    protected _circum(i: number, j: number, k: number, tri: GroupLike | false, pts?: GroupLike): DelaunayShape;
    protected static _dedupe(edges: number[]): number[];
}

declare type DOMFormContext = {
    group: Element;
    groupID: string;
    groupCount: number;
    currentID: string;
    currentClass?: string;
    style: object;
    font: string;
    fontSize: number;
    fontFamily: string;
};
declare class DOMSpace extends MultiTouchSpace {
    protected _canvas: HTMLElement | SVGElement;
    protected _container: Element;
    id: string;
    protected _autoResize: boolean;
    protected _bgcolor: string;
    protected _css: {};
    constructor(elem: string | Element, callback?: Function);
    static createElement(elem: string, id: string, appendTo?: Element): Element;
    setup(opt: {
        bgcolor?: string;
        resize?: boolean;
    }): this;
    getForm(): Form;
    autoResize: boolean;
    resize(b: Bound, evt?: Event): this;
    protected _resizeHandler(evt: Event): void;
    readonly element: Element;
    readonly parent: Element;
    readonly ready: boolean;
    clear(bg?: string): this;
    background: string;
    style(key: string, val: string, update?: boolean): this;
    styles(styles: object, update?: boolean): this;
    static setAttr(elem: Element, data: object): Element;
    static getInlineStyles(data: object): string;
}
declare class HTMLSpace extends DOMSpace {
    getForm(): Form;
    static htmlElement(parent: Element, name: string, id?: string, autoClass?: boolean): HTMLElement;
    remove(player: IPlayer): this;
    removeAll(): this;
}
declare class HTMLForm extends VisualForm {
    protected _ctx: DOMFormContext;
    static groupID: number;
    static domID: number;
    protected _space: HTMLSpace;
    protected _ready: boolean;
    constructor(space: HTMLSpace);
    readonly space: HTMLSpace;
    protected styleTo(k: any, v: any, unit?: string): void;
    fill(c: string | boolean): this;
    stroke(c: string | boolean, width?: number, linejoin?: string, linecap?: string): this;
    fillText(c: string): this;
    cls(c: string | boolean): this;
    font(sizeOrFont: number | Font, weight?: string, style?: string, lineHeight?: number, family?: string): this;
    reset(): this;
    updateScope(group_id: string, group?: Element): object;
    scope(item: IPlayer): object;
    nextID(): string;
    static getID(ctx: any): string;
    static scopeID(item: IPlayer): string;
    static style(elem: Element, styles: object): Element;
    static rectStyle(ctx: DOMFormContext, pt: PtLike, size: PtLike): DOMFormContext;
    static point(ctx: DOMFormContext, pt: PtLike, radius?: number, shape?: string): Element;
    point(pt: PtLike, radius?: number, shape?: string): this;
    static circle(ctx: DOMFormContext, pt: PtLike, radius?: number): Element;
    circle(pts: GroupLike | number[][]): this;
    static square(ctx: DOMFormContext, pt: PtLike, halfsize: number): HTMLElement;
    square(pt: PtLike, halfsize: number): this;
    static rect(ctx: DOMFormContext, pts: GroupLike | number[][]): Element;
    rect(pts: number[][] | Pt[]): this;
    static text(ctx: DOMFormContext, pt: PtLike, txt: string): Element;
    text(pt: PtLike, txt: string): this;
    log(txt: any): this;
    arc(pt: PtLike, radius: number, startAngle: number, endAngle: number, cc?: boolean): this;
    line(pts: GroupLike | number[][]): this;
    polygon(pts: GroupLike | number[][]): this;
}

declare abstract class Form {
    protected _ready: boolean;
    readonly ready: boolean;
    static _checkSize(pts: GroupLike | number[][], required?: number): boolean;
}
declare abstract class VisualForm extends Form {
    protected _filled: boolean;
    filled: boolean;
    protected _stroked: boolean;
    stroked: boolean;
    protected _font: Font;
    readonly currentFont: Font;
    protected _multiple(groups: GroupLike[], shape: string, ...rest: any[]): this;
    abstract reset(): this;
    fill(c: string | boolean): this;
    fillOnly(c: string | boolean): this;
    stroke(c: string | boolean, width?: number, linejoin?: string, linecap?: string): this;
    strokeOnly(c: string | boolean, width?: number, linejoin?: string, linecap?: string): this;
    abstract point(p: PtLike, radius: number, shape: string): this;
    points(pts: GroupLike | number[][], radius: number, shape: string): this;
    abstract circle(pts: GroupLike | number[][]): this;
    circles(groups: GroupLike[]): this;
    squares(groups: GroupLike[]): this;
    abstract arc(pt: PtLike, radius: number, startAngle: number, endAngle: number, cc?: boolean): this;
    abstract line(pts: GroupLike | number[][]): this;
    lines(groups: GroupLike[]): this;
    abstract polygon(pts: GroupLike | number[][]): this;
    polygons(groups: GroupLike[]): this;
    abstract rect(pts: number[][] | Pt[]): this;
    rects(groups: GroupLike[]): this;
    abstract text(pt: PtLike, txt: string, maxWidth?: number): this;
    abstract font(sizeOrFont: number | Font, weight?: string, style?: string, lineHeight?: number, family?: string): this;
}
declare class Font {
    size: number;
    lineHeight: number;
    face: string;
    style: string;
    weight: string;
    constructor(size?: number, face?: string, weight?: string, style?: string, lineHeight?: number);
    readonly value: string;
    toString(): string;
}

declare class Vec {
    static add(a: PtLike, b: PtLike | number): PtLike;
    static subtract(a: PtLike, b: PtLike | number): PtLike;
    static multiply(a: PtLike, b: PtLike | number): PtLike;
    static divide(a: PtLike, b: PtLike | number): PtLike;
    static dot(a: PtLike, b: PtLike): number;
    static cross2D(a: PtLike, b: PtLike): number;
    static cross(a: PtLike, b: PtLike): Pt;
    static magnitude(a: PtLike): number;
    static unit(a: PtLike, magnitude?: number): PtLike;
    static abs(a: PtLike): PtLike;
    static floor(a: PtLike): PtLike;
    static ceil(a: PtLike): PtLike;
    static round(a: PtLike): PtLike;
    static max(a: PtLike): {
        value;
        index;
    };
    static min(a: PtLike): {
        value;
        index;
    };
    static sum(a: PtLike): number;
    static map(a: PtLike, fn: (n: number, index: number, arr) => number): PtLike;
}
declare class Mat {
    static add(a: GroupLike, b: GroupLike | number[][] | number): Group;
    static multiply(a: GroupLike, b: GroupLike | number[][] | number, transposed?: boolean, elementwise?: boolean): Group;
    static zipSlice(g: GroupLike | number[][], index: number, defaultValue?: number | boolean): Pt;
    static zip(g: GroupLike | number[][], defaultValue?: number | boolean, useLongest?: boolean): Group;
    static transpose(g: GroupLike | number[][], defaultValue?: number | boolean, useLongest?: boolean): Group;
    static transform2D(pt: PtLike, m: GroupLike | number[][]): Pt;
    static scale2DMatrix(x: number, y: number): GroupLike;
    static rotate2DMatrix(cosA: number, sinA: number): GroupLike;
    static shear2DMatrix(tanX: number, tanY: number): GroupLike;
    static translate2DMatrix(x: number, y: number): GroupLike;
    static scaleAt2DMatrix(sx: number, sy: number, at: PtLike): GroupLike;
    static rotateAt2DMatrix(cosA: number, sinA: number, at: PtLike): GroupLike;
    static shearAt2DMatrix(tanX: number, tanY: number, at: PtLike): GroupLike;
    static reflectAt2DMatrix(p1: PtLike, p2: PtLike): Pt[];
}

declare class Num {
    static equals(a: number, b: number, threshold?: number): boolean;
    static lerp(a: number, b: number, t: number): number;
    static clamp(val: number, min: number, max: number): number;
    static boundValue(val: number, min: number, max: number): number;
    static within(p: number, a: number, b: number): boolean;
    static randomRange(a: number, b?: number): number;
    static normalizeValue(n: number, a: number, b: number): number;
    static sum(pts: GroupLike | number[][]): Pt;
    static average(pts: GroupLike | number[][]): Pt;
    static cycle(t: number): number;
    static mapToRange(n: number, currA: any, currB: any, targetA: any, targetB: any): number;
}
declare class Geom {
    static boundAngle(angle: number): number;
    static boundRadian(angle: number): number;
    static toRadian(angle: number): number;
    static toDegree(radian: number): number;
    static boundingBox(pts: GroupLike): Group;
    static centroid(pts: GroupLike | number[][]): Pt;
    static anchor(pts: GroupLike, ptOrIndex?: PtLike | number, direction?: ("to" | "from")): void;
    static interpolate(a: Pt | number[], b: Pt | number[], t?: number): Pt;
    static perpendicular(pt: PtLike, axis?: string | number[]): Group;
    static isPerpendicular(p1: PtLike, p2: PtLike): boolean;
    static withinBound(pt: PtLike | number[], boundPt1: PtLike | number[], boundPt2: PtLike | number[]): boolean;
    static sortEdges(pts: GroupLike): GroupLike;
    static scale(ps: Pt | GroupLike, scale: number | number[] | PtLike, anchor?: PtLike): Geom;
    static rotate2D(ps: Pt | GroupLike, angle: number, anchor?: PtLike, axis?: string): Geom;
    static shear2D(ps: Pt | GroupLike, scale: number | number[] | PtLike, anchor?: PtLike, axis?: string): Geom;
    static reflect2D(ps: Pt | GroupLike, line: GroupLike, axis?: string): Geom;
    static cosTable(): {
        table: Float64Array;
        cos: (rad: number) => number;
    };
    static sinTable(): {
        table: Float64Array;
        sin: (rad: number) => number;
    };
}
declare class Shaping {
    static linear(t: number, c?: number): number;
    static quadraticIn(t: number, c?: number): number;
    static quadraticOut(t: number, c?: number): number;
    static quadraticInOut(t: number, c?: number): number;
    static cubicIn(t: number, c?: number): number;
    static cubicOut(t: number, c?: number): number;
    static cubicInOut(t: number, c?: number): number;
    static exponentialIn(t: number, c?: number, p?: number): number;
    static exponentialOut(t: number, c?: number, p?: number): number;
    static sineIn(t: number, c?: number): number;
    static sineOut(t: number, c?: number): number;
    static sineInOut(t: number, c?: number): number;
    static cosineApprox(t: number, c?: number): number;
    static circularIn(t: number, c?: number): number;
    static circularOut(t: number, c?: number): number;
    static circularInOut(t: number, c?: number): number;
    static elasticIn(t: number, c?: number, p?: number): number;
    static elasticOut(t: number, c?: number, p?: number): number;
    static elasticInOut(t: number, c?: number, p?: number): number;
    static bounceIn(t: number, c?: number): number;
    static bounceOut(t: number, c?: number): number;
    static bounceInOut(t: number, c?: number): number;
    static sigmoid(t: number, c?: number, p?: number): number;
    static logSigmoid(t: number, c?: number, p?: number): number;
    static seat(t: number, c?: number, p?: number): number;
    static quadraticBezier(t: number, c?: number, p?: number | PtLike): number;
    static cubicBezier(t: number, c?: number, p1?: PtLike, p2?: PtLike): number;
    static quadraticTarget(t: number, c?: number, p1?: PtLike): number;
    static cliff(t: number, c?: number, p?: number): number;
    static step(fn: Function, steps: number, t: number, c: number, ...args: any[]): any;
}
declare class Range {
    protected _source: Group;
    protected _max: Pt;
    protected _min: Pt;
    protected _mag: Pt;
    protected _dims: number;
    constructor(g: GroupLike);
    readonly max: Pt;
    readonly min: Pt;
    readonly magnitude: Pt;
    calc(): this;
    mapTo(min: number, max: number, exclude?: boolean[]): Group;
    append(g: GroupLike, update?: boolean): this;
    ticks(count: number): Group;
}

declare type IntersectContext = {
    which: number;
    dist: number;
    normal: Pt;
    vertex: Pt;
    edge: Group;
    other?: any;
};
declare class Line {
    static fromAngle(anchor: PtLike, angle: number, magnitude: number): Group;
    static slope(p1: PtLike | number[], p2: PtLike | number[]): number;
    static intercept(p1: PtLike | number[], p2: PtLike | number[]): {
        slope: number;
        xi: number;
        yi: number;
    };
    static sideOfPt2D(line: GroupLike, pt: PtLike): number;
    static collinear(p1: PtLike | number[], p2: PtLike | number[], p3: PtLike | number[], threshold?: number): boolean;
    static magnitude(line: GroupLike): number;
    static magnitudeSq(line: GroupLike): number;
    static perpendicularFromPt(line: GroupLike, pt: PtLike | number[], asProjection?: boolean): Pt;
    static distanceFromPt(line: GroupLike, pt: PtLike | number[]): number;
    static intersectRay2D(la: GroupLike, lb: GroupLike): Pt;
    static intersectLine2D(la: GroupLike, lb: GroupLike): Pt;
    static intersectLineWithRay2D(line: GroupLike, ray: GroupLike): Pt;
    static intersectPolygon2D(lineOrRay: GroupLike, poly: GroupLike, sourceIsRay?: boolean): Group;
    static intersectLines2D(lines1: GroupLike[], lines2: GroupLike[], isRay?: boolean): Group;
    static intersectGridWithRay2D(ray: GroupLike, gridPt: PtLike | number[]): Group;
    static intersectGridWithLine2D(line: GroupLike, gridPt: PtLike | number[]): Group;
    static intersectRect2D(line: GroupLike, rect: GroupLike): Group;
    static subpoints(line: GroupLike | number[][], num: number): Group;
    static crop(line: GroupLike, size: PtLike, index?: number, cropAsCircle?: boolean): Pt;
    static marker(line: GroupLike, size: PtLike, graphic?: string, atTail?: boolean): Group;
    static toRect(line: GroupLike): Group;
}
declare class Rectangle {
    static from(topLeft: PtLike | number[], widthOrSize: number | PtLike, height?: number): Group;
    static fromTopLeft(topLeft: PtLike | number[], widthOrSize: number | PtLike, height?: number): Group;
    static fromCenter(center: PtLike | number[], widthOrSize: number | PtLike, height?: number): Group;
    static toCircle(pts: GroupLike): Group;
    static toSquare(pts: GroupLike, enclose?: boolean): Group;
    static size(pts: GroupLike): Pt;
    static center(pts: GroupLike): Pt;
    static corners(rect: GroupLike): Group;
    static sides(rect: GroupLike): Group[];
    static lines(rect: GroupLike): Group[];
    static boundingBox(rects: GroupLike[]): Group;
    static polygon(rect: GroupLike): Group;
    static quadrants(rect: GroupLike, center?: PtLike): Group[];
    static halves(rect: GroupLike, ratio?: number, asRows?: boolean): Group[];
    static withinBound(rect: GroupLike, pt: PtLike): boolean;
    static hasIntersectRect2D(rect1: GroupLike, rect2: GroupLike, resetBoundingBox?: boolean): boolean;
    static intersectRect2D(rect1: GroupLike, rect2: GroupLike): Group;
}
declare class Circle {
    static fromRect(pts: GroupLike, enclose?: boolean): Group;
    static fromCenter(pt: PtLike, radius: number): Group;
    static withinBound(pts: GroupLike, pt: PtLike, threshold?: number): boolean;
    static intersectRay2D(pts: GroupLike, ray: GroupLike): Group;
    static intersectLine2D(pts: GroupLike, line: GroupLike): Group;
    static intersectCircle2D(pts: GroupLike, circle: GroupLike): Group;
    static intersectRect2D(pts: GroupLike, rect: GroupLike): Group;
    static toRect(pts: GroupLike): Group;
    static toInnerRect(pts: GroupLike): Group;
    static toInnerTriangle(pts: GroupLike): Group;
}
declare class Triangle {
    static fromRect(rect: GroupLike): Group;
    static fromCircle(circle: GroupLike): Group;
    static fromCenter(pt: PtLike, size: number): Group;
    static medial(pts: GroupLike): Group;
    static oppositeSide(pts: GroupLike, index: number): Group;
    static altitude(pts: GroupLike, index: number): Group;
    static orthocenter(pts: GroupLike): Pt;
    static incenter(pts: GroupLike): Pt;
    static incircle(pts: GroupLike, center?: Pt): Group;
    static circumcenter(pts: GroupLike): Pt;
    static circumcircle(pts: GroupLike, center?: Pt): Group;
}
declare class Polygon {
    static centroid(pts: GroupLike): Pt;
    static rectangle(center: PtLike, widthOrSize: number | PtLike, height?: number): Group;
    static fromCenter(center: PtLike, radius: number, sides: number): Group;
    static lineAt(pts: GroupLike, idx: number): Group;
    static lines(pts: GroupLike, closePath?: boolean): Group[];
    static midpoints(pts: GroupLike, closePath?: boolean, t?: number): Group;
    static adjacentSides(pts: GroupLike, index: number, closePath?: boolean): Group[];
    static bisector(pts: GroupLike, index: number): Pt;
    static perimeter(pts: GroupLike, closePath?: boolean): {
        total: number;
        segments: Pt;
    };
    static area(pts: GroupLike): any;
    static convexHull(pts: GroupLike, sorted?: boolean): Group;
    static network(pts: GroupLike, originIndex?: number): Group[];
    static nearestPt(pts: GroupLike, pt: PtLike): number;
    static projectAxis(poly: GroupLike, unitAxis: Pt): Pt;
    protected static _axisOverlap(poly1: any, poly2: any, unitAxis: any): number;
    static hasIntersectPoint(poly: GroupLike, pt: PtLike): boolean;
    static hasIntersectCircle(poly: GroupLike, circle: GroupLike): IntersectContext;
    static hasIntersectPolygon(poly1: GroupLike, poly2: GroupLike): IntersectContext;
    static intersectPolygon2D(poly1: GroupLike, poly2: GroupLike): Group;
    static toRects(polys: GroupLike[]): GroupLike[];
}
declare class Curve {
    static getSteps(steps: number): Group;
    static controlPoints(pts: GroupLike, index?: number, copyStart?: boolean): Group;
    static _calcPt(ctrls: GroupLike, params: PtLike): Pt;
    static catmullRom(pts: GroupLike, steps?: number): Group;
    static catmullRomStep(step: Pt, ctrls: GroupLike): Pt;
    static cardinal(pts: GroupLike, steps?: number, tension?: number): Group;
    static cardinalStep(step: Pt, ctrls: GroupLike, tension?: number): Pt;
    static bezier(pts: GroupLike, steps?: number): Group;
    static bezierStep(step: Pt, ctrls: GroupLike): Pt;
    static bspline(pts: GroupLike, steps?: number, tension?: number): Group;
    static bsplineStep(step: Pt, ctrls: GroupLike): Pt;
    static bsplineTensionStep(step: Pt, ctrls: GroupLike, tension?: number): Pt;
}

declare class World {
    protected _gravity: Pt;
    protected _friction: number;
    protected _damping: number;
    protected _bound: Bound;
    protected _particles: Particle[];
    protected _bodies: Body[];
    protected _names: {
        p: {};
        b: {};
    };
    protected _drawParticles: (p: Particle, i: number) => void;
    protected _drawBodies: (p: Body, i: number) => void;
    constructor(bound: Group, friction?: number, gravity?: PtLike | number);
    gravity: Pt;
    friction: number;
    damping: number;
    readonly bodyCount: number;
    readonly particleCount: number;
    body(id: number | string): Body;
    particle(id: number | string): Particle;
    update(ms: number): void;
    drawParticles(fn: (p: Particle, i: number) => void): void;
    drawBodies(fn: (p: Body, i: number) => void): void;
    add(p: Particle | Body, name?: string): this;
    remove(which: "body" | "particle", index: number, count?: number): this;
    static edgeConstraint(p1: Particle, p2: Particle, dist: number, stiff?: number, precise?: boolean): Particle;
    static boundConstraint(p: Particle, rect: Group, damping?: number): void;
    protected integrate(p: Particle, dt: number, prevDt?: number): Particle;
    protected _updateParticles(dt: number): void;
    protected _updateBodies(dt: number): void;
}
declare class Particle extends Pt {
    protected _mass: number;
    protected _radius: number;
    protected _force: Pt;
    protected _prev: Pt;
    protected _body: Body;
    protected _lock: boolean;
    protected _lockPt: Pt;
    constructor(...args: any[]);
    mass: number;
    radius: number;
    previous: Pt;
    force: Pt;
    body: Body;
    lock: boolean;
    readonly changed: Pt;
    position: Pt;
    size(r: number): this;
    addForce(...args: any[]): Pt;
    verlet(dt: number, friction: number, lastDt?: number): this;
    hit(...args: any[]): this;
    collide(p2: Particle, damp?: number): void;
    toString(): string;
}
declare class Body extends Group {
    protected _cs: Array<number[]>;
    protected _stiff: number;
    protected _locks: {
        [index: string]: Particle;
    };
    protected _mass: number;
    constructor();
    static fromGroup(list: GroupLike, stiff?: number, autoLink?: boolean, autoMass?: boolean): Body;
    init(list: GroupLike, stiff?: number): this;
    mass: number;
    autoMass(): this;
    link(index1: number, index2: number, stiff?: number): this;
    linkAll(stiff: number): void;
    linksToLines(): Group[];
    processEdges(): void;
    processBody(b: Body): void;
    processParticle(b: Particle): void;
}

declare interface IPt {
    x?: number;
    y?: number;
    z?: number;
    w?: number;
}
declare var PtBaseArray: Float32ArrayConstructor;
declare type GroupLike = Group | Pt[];
declare type PtLike = Pt | Float32Array | number[];
declare class Pt extends PtBaseArray implements IPt, Iterable<number> {
    protected _id: string;
    constructor(...args: any[]);
    static make(dimensions: number, defaultValue?: number, randomize?: boolean): Pt;
    id: string;
    x: number;
    y: number;
    z: number;
    w: number;
    clone(): Pt;
    equals(p: PtLike, threshold?: number): boolean;
    to(...args: any[]): this;
    $to(...args: any[]): Pt;
    toAngle(radian: number, magnitude?: number, anchorFromPt?: boolean): this;
    op(fn: (p1: PtLike, ...rest: any[]) => any): (...rest: any[]) => any;
    ops(fns: ((p1: PtLike, ...rest: any[]) => any)[]): ((...rest: any[]) => any)[];
    $take(axis: string | number[]): Pt;
    $concat(...args: any[]): Pt;
    add(...args: any[]): this;
    $add(...args: any[]): Pt;
    subtract(...args: any[]): this;
    $subtract(...args: any[]): Pt;
    multiply(...args: any[]): this;
    $multiply(...args: any[]): Pt;
    divide(...args: any[]): this;
    $divide(...args: any[]): Pt;
    magnitudeSq(): number;
    magnitude(): number;
    unit(magnitude?: number): Pt;
    $unit(magnitude?: number): Pt;
    dot(...args: any[]): number;
    cross2D(...args: any[]): number;
    $cross(...args: any[]): Pt;
    $project(...args: any[]): Pt;
    projectScalar(...args: any[]): number;
    abs(): Pt;
    $abs(): Pt;
    floor(): Pt;
    $floor(): Pt;
    ceil(): Pt;
    $ceil(): Pt;
    round(): Pt;
    $round(): Pt;
    minValue(): {
        value: number;
        index: number;
    };
    maxValue(): {
        value: number;
        index: number;
    };
    $min(...args: any[]): Pt;
    $max(...args: any[]): Pt;
    angle(axis?: string | number[]): number;
    angleBetween(p: Pt, axis?: string | number[]): number;
    scale(scale: number | number[] | PtLike, anchor?: PtLike): this;
    rotate2D(angle: number, anchor?: PtLike, axis?: string): this;
    shear2D(scale: number | number[] | PtLike, anchor?: PtLike, axis?: string): this;
    reflect2D(line: GroupLike, axis?: string): this;
    toString(): string;
    toArray(): number[];
}
declare class Group extends Array<Pt> {
    protected _id: string;
    constructor(...args: Pt[]);
    id: string;
    readonly p1: Pt;
    readonly p2: Pt;
    readonly p3: Pt;
    readonly p4: Pt;
    readonly q1: Pt;
    readonly q2: Pt;
    readonly q3: Pt;
    readonly q4: Pt;
    clone(): Group;
    static fromArray(list: PtLike[]): Group;
    static fromPtArray(list: GroupLike): Group;
    split(chunkSize: number, stride?: number, loopBack?: boolean): Group[];
    insert(pts: GroupLike, index?: number): this;
    remove(index?: number, count?: number): Group;
    segments(pts_per_segment?: number, stride?: number, loopBack?: boolean): Group[];
    lines(): Group[];
    centroid(): Pt;
    boundingBox(): Group;
    anchorTo(ptOrIndex?: PtLike | number): void;
    anchorFrom(ptOrIndex?: PtLike | number): void;
    op(fn: (g1: GroupLike, ...rest: any[]) => any): (...rest: any[]) => any;
    ops(fns: ((g1: GroupLike, ...rest: any[]) => any)[]): ((...rest: any[]) => any)[];
    interpolate(t: number): Pt;
    moveBy(...args: any[]): this;
    moveTo(...args: any[]): this;
    scale(scale: number | number[] | PtLike, anchor?: PtLike): this;
    rotate2D(angle: number, anchor?: PtLike, axis?: string): this;
    shear2D(scale: number | number[] | PtLike, anchor?: PtLike, axis?: string): this;
    reflect2D(line: GroupLike, axis?: string): this;
    sortByDimension(dim: number, desc?: boolean): this;
    forEachPt(ptFn: string, ...args: any[]): this;
    add(...args: any[]): this;
    subtract(...args: any[]): this;
    multiply(...args: any[]): this;
    divide(...args: any[]): this;
    $matrixAdd(g: GroupLike | number[][] | number): Group;
    $matrixMultiply(g: GroupLike | number, transposed?: boolean, elementwise?: boolean): Group;
    zipSlice(index: number, defaultValue?: number | boolean): Pt;
    $zip(defaultValue?: number | boolean, useLongest?: boolean): Group;
    toString(): string;
}

declare type AnimateFunction = (time?: number, frameTime?: number, currentSpace?: any) => void;
declare interface IPlayer {
    animateID?: string;
    animate?: AnimateFunction;
    resize?(size: IPt, evt?: Event): undefined;
    action?(type: string, px: number, py: number, evt: Event): any;
    start?(bound: Bound, space: Space): any;
}
declare interface ISpacePlayers {
    [key: string]: IPlayer;
}
declare interface ITimer {
    prev: number;
    diff: number;
    end: number;
}
declare abstract class Space {
    id: string;
    protected bound: Bound;
    protected _time: ITimer;
    protected players: ISpacePlayers;
    protected playerCount: number;
    protected _ctx: any;
    protected _pointer: Pt;
    protected _isReady: boolean;
    protected _playing: boolean;
    refresh(b: boolean): this;
    add(p: IPlayer | AnimateFunction): this;
    remove(player: IPlayer): this;
    removeAll(): this;
    play(time?: number): this;
    replay(): void;
    protected playItems(time: number): void;
    pause(toggle?: boolean): this;
    resume(): this;
    stop(t?: number): this;
    playOnce(duration?: number): this;
    protected render(context: any): this;
    customRendering: (context: any, self: Space) => null;
    readonly isPlaying: boolean;
    readonly outerBound: Bound;
    readonly innerBound: Bound;
    readonly size: Pt;
    readonly center: Pt;
    readonly width: number;
    readonly height: number;
    abstract resize(b: IPt, evt?: Event): this;
    abstract clear(): this;
    abstract getForm(): Form;
}
declare type TouchPointsKey = "touches" | "changedTouches" | "targetTouches";
declare interface MultiTouchElement {
    addEventListener(evt: any, callback: Function): any;
    removeEventListener(evt: any, callback: Function): any;
}
declare abstract class MultiTouchSpace extends Space {
    protected _pressed: boolean;
    protected _dragged: boolean;
    protected _hasMouse: boolean;
    protected _hasTouch: boolean;
    protected _canvas: EventTarget;
    readonly pointer: Pt;
    bindCanvas(evt: string, callback: EventListener): void;
    unbindCanvas(evt: string, callback: EventListener): void;
    bindMouse(_bind?: boolean): this;
    bindTouch(_bind?: boolean): this;
    touchesToPoints(evt: TouchEvent, which?: TouchPointsKey): Pt[];
    protected _mouseAction(type: string, evt: MouseEvent | TouchEvent): void;
    protected _mouseDown(evt: MouseEvent | TouchEvent): boolean;
    protected _mouseUp(evt: MouseEvent | TouchEvent): boolean;
    protected _mouseMove(evt: MouseEvent | TouchEvent): boolean;
    protected _mouseOver(evt: MouseEvent | TouchEvent): boolean;
    protected _mouseOut(evt: MouseEvent | TouchEvent): boolean;
    protected _touchMove(evt: TouchEvent): boolean;
}

declare class SVGSpace extends DOMSpace {
    id: string;
    protected _bgcolor: string;
    constructor(elem: string | Element, callback?: Function);
    getForm(): SVGForm;
    readonly element: Element;
    resize(b: Bound, evt?: Event): this;
    static svgElement(parent: Element, name: string, id?: string): SVGElement;
    remove(player: IPlayer): this;
    removeAll(): this;
}
declare class SVGForm extends VisualForm {
    protected _ctx: DOMFormContext;
    static groupID: number;
    static domID: number;
    protected _space: SVGSpace;
    protected _ready: boolean;
    constructor(space: SVGSpace);
    readonly space: SVGSpace;
    protected styleTo(k: any, v: any): void;
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
    circle(pts: GroupLike | number[][]): this;
    static arc(ctx: DOMFormContext, pt: PtLike, radius: number, startAngle: number, endAngle: number, cc?: boolean): SVGElement;
    arc(pt: PtLike, radius: number, startAngle: number, endAngle: number, cc?: boolean): this;
    static square(ctx: DOMFormContext, pt: PtLike, halfsize: number): SVGElement;
    square(pt: PtLike, halfsize: number): this;
    static line(ctx: DOMFormContext, pts: GroupLike | number[][]): SVGElement;
    line(pts: GroupLike | number[][]): this;
    static _poly(ctx: DOMFormContext, pts: GroupLike | number[][], closePath?: boolean): SVGElement;
    static polygon(ctx: DOMFormContext, pts: GroupLike | number[][]): SVGElement;
    polygon(pts: GroupLike | number[][]): this;
    static rect(ctx: DOMFormContext, pts: GroupLike | number[][]): SVGElement;
    rect(pts: number[][] | Pt[]): this;
    static text(ctx: DOMFormContext, pt: PtLike, txt: string): SVGElement;
    text(pt: PtLike, txt: string): this;
    log(txt: any): this;
}

declare class Typography {
    static textWidthEstimator(fn: (string) => number, samples?: string[], distribution?: number[]): (string) => number;
    static truncate(fn: (string) => number, str: string, width: number, tail?: string): [string, number];
    static fontSizeToBox(box: GroupLike, ratio?: number, byHeight?: boolean): (GroupLike) => number;
    static fontSizeToThreshold(threshold: number, direction?: number): (a: number, b: number) => number;
}

declare enum UIShape {
    Rectangle = 0,
    Circle = 1,
    Polygon = 2,
    Polyline = 3,
    Line = 4,
}
declare const UIPointerActions: {
    up: string;
    down: string;
    move: string;
    drag: string;
    drop: string;
    over: string;
    out: string;
};
declare type UIHandler = (pt: Pt, target: UI, type: string) => void;
declare class UI {
    group: Group;
    shape: UIShape;
    protected _id: string;
    protected _actions: {
        [key: string]: UIHandler;
    };
    protected _states: {
        [key: string]: any;
    };
    constructor(group: Group, shape: UIShape, states: {}, id?: string);
    id: string;
    state(key: string): any;
    on(key: string, fn: UIHandler): this;
    off(key: string): this;
    listen(key: string, p: Pt): boolean;
    render(fn: (group: Group, states: {
        [key: string]: any;
    }) => void): void;
    protected _trigger(p: Pt): boolean;
}
declare class UIButton extends UI {
    _clicks: number;
    constructor(group: Group, shape: UIShape, states: {}, id?: string);
    readonly clicks: number;
    onClick(fn: UIHandler): void;
    onHover(over: UIHandler, out: UIHandler): void;
}

declare const Const: {
    xy: string;
    yz: string;
    xz: string;
    xyz: string;
    horizontal: number;
    vertical: number;
    identical: number;
    right: number;
    bottom_right: number;
    bottom: number;
    bottom_left: number;
    left: number;
    top_left: number;
    top: number;
    top_right: number;
    epsilon: number;
    max: number;
    min: number;
    pi: number;
    two_pi: number;
    half_pi: number;
    quarter_pi: number;
    one_degree: number;
    rad_to_deg: number;
    deg_to_rad: number;
    gravity: number;
    newton: number;
    gaussian: number;
};
declare class Util {
    static warnLevel: "error" | "warn" | "default";
    static getArgs(args: any[]): Array<number>;
    static warn(message?: string, defaultReturn?: any): any;
    static randomInt(range: number, start?: number): number;
    static split(pts: any[], size: number, stride?: number, loopBack?: boolean): any[][];
    static flatten(pts: any[], flattenAsGroup?: boolean): any;
    static combine<T>(a: T[], b: T[], op: (a: T, b: T) => T): T[];
    static zip(...arrays: Array<any>[]): any[];
    static stepper(max: number, min?: number, stride?: number, callback?: (n: number) => void): (() => number);
    static forRange(fn: (index: number) => any, range: number, start?: number, step?: number): any[];
}

