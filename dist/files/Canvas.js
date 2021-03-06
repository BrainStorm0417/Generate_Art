"use strict";
/*! Pts.js is licensed under Apache License 2.0. Copyright © 2017-current William Ngan and contributors. (https://github.com/williamngan/pts) */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasForm = exports.CanvasSpace = void 0;
const Space_1 = require("./Space");
const Form_1 = require("./Form");
const Pt_1 = require("./Pt");
const Util_1 = require("./Util");
const Typography_1 = require("./Typography");
const Op_1 = require("./Op");
const Image_1 = require("./Image");
class CanvasSpace extends Space_1.MultiTouchSpace {
    constructor(elem, callback) {
        super();
        this._pixelScale = 1;
        this._autoResize = true;
        this._bgcolor = "#e1e9f0";
        this._offscreen = false;
        this._initialResize = false;
        var _selector = null;
        var _existed = false;
        this.id = "pt";
        if (elem instanceof Element) {
            _selector = elem;
            this.id = "pts_existing_space";
        }
        else {
            let id = elem;
            id = (elem[0] === "#" || elem[0] === ".") ? elem : "#" + elem;
            _selector = document.querySelector(id);
            _existed = true;
            this.id = id.substr(1);
        }
        if (!_selector) {
            this._container = this._createElement("div", this.id + "_container");
            this._canvas = this._createElement("canvas", this.id);
            this._container.appendChild(this._canvas);
            document.body.appendChild(this._container);
            _existed = false;
        }
        else if (_selector.nodeName.toLowerCase() != "canvas") {
            this._container = _selector;
            this._canvas = this._createElement("canvas", this.id + "_canvas");
            this._container.appendChild(this._canvas);
            this._initialResize = true;
        }
        else {
            this._canvas = _selector;
            this._container = _selector.parentElement;
            this._autoResize = false;
        }
        setTimeout(this._ready.bind(this, callback), 100);
        this._ctx = this._canvas.getContext('2d');
    }
    _createElement(elem = "div", id) {
        let d = document.createElement(elem);
        d.setAttribute("id", id);
        return d;
    }
    _ready(callback) {
        if (!this._container)
            throw new Error(`Cannot initiate #${this.id} element`);
        this._isReady = true;
        this._resizeHandler(null);
        this.clear(this._bgcolor);
        this._canvas.dispatchEvent(new Event("ready"));
        for (let k in this.players) {
            if (this.players.hasOwnProperty(k)) {
                if (this.players[k].start)
                    this.players[k].start(this.bound.clone(), this);
            }
        }
        this._pointer = this.center;
        this._initialResize = false;
        if (callback)
            callback(this.bound, this._canvas);
    }
    setup(opt) {
        this._bgcolor = opt.bgcolor ? opt.bgcolor : "transparent";
        this.autoResize = (opt.resize != undefined) ? opt.resize : false;
        if (opt.retina !== false) {
            let r1 = window ? window.devicePixelRatio || 1 : 1;
            let r2 = this._ctx.webkitBackingStorePixelRatio || this._ctx.mozBackingStorePixelRatio || this._ctx.msBackingStorePixelRatio || this._ctx.oBackingStorePixelRatio || this._ctx.backingStorePixelRatio || 1;
            this._pixelScale = Math.max(1, r1 / r2);
        }
        if (opt.offscreen) {
            this._offscreen = true;
            this._offCanvas = this._createElement("canvas", this.id + "_offscreen");
            this._offCtx = this._offCanvas.getContext('2d');
        }
        else {
            this._offscreen = false;
        }
        if (opt.pixelDensity) {
            this._pixelScale = opt.pixelDensity;
        }
        return this;
    }
    set autoResize(auto) {
        if (!window)
            return;
        this._autoResize = auto;
        if (auto) {
            window.addEventListener('resize', this._resizeHandler.bind(this));
        }
        else {
            window.removeEventListener('resize', this._resizeHandler.bind(this));
        }
    }
    get autoResize() { return this._autoResize; }
    resize(b, evt) {
        this.bound = b;
        this._canvas.width = Math.ceil(this.bound.size.x) * this._pixelScale;
        this._canvas.height = Math.ceil(this.bound.size.y) * this._pixelScale;
        this._canvas.style.width = Math.ceil(this.bound.size.x) + "px";
        this._canvas.style.height = Math.ceil(this.bound.size.y) + "px";
        if (this._offscreen) {
            this._offCanvas.width = Math.ceil(this.bound.size.x) * this._pixelScale;
            this._offCanvas.height = Math.ceil(this.bound.size.y) * this._pixelScale;
        }
        if (this._pixelScale != 1) {
            this._ctx.scale(this._pixelScale, this._pixelScale);
            if (this._offscreen) {
                this._offCtx.scale(this._pixelScale, this._pixelScale);
            }
        }
        for (let k in this.players) {
            if (this.players.hasOwnProperty(k)) {
                let p = this.players[k];
                if (p.resize)
                    p.resize(this.bound, evt);
            }
        }
        this.render(this._ctx);
        if (evt && !this.isPlaying)
            this.playOnce(0);
        return this;
    }
    _resizeHandler(evt) {
        if (!window)
            return;
        let b = (this._autoResize || this._initialResize) ? this._container.getBoundingClientRect() : this._canvas.getBoundingClientRect();
        if (b) {
            let box = Pt_1.Bound.fromBoundingRect(b);
            box.center = box.center.add(window.pageXOffset, window.pageYOffset);
            this.resize(box, evt);
        }
    }
    set background(bg) { this._bgcolor = bg; }
    get background() { return this._bgcolor; }
    get pixelScale() {
        return this._pixelScale;
    }
    get hasOffscreen() {
        return this._offscreen;
    }
    get offscreenCtx() { return this._offCtx; }
    get offscreenCanvas() { return this._offCanvas; }
    getForm() { return new CanvasForm(this); }
    get element() {
        return this._canvas;
    }
    get parent() {
        return this._container;
    }
    get ready() {
        return this._isReady;
    }
    get ctx() { return this._ctx; }
    clear(bg) {
        if (bg)
            this._bgcolor = bg;
        const lastColor = this._ctx.fillStyle;
        const px = Math.ceil(this.pixelScale);
        if (!this._bgcolor || this._bgcolor === "transparent") {
            this._ctx.clearRect(-px, -px, this._canvas.width + px, this._canvas.height + px);
        }
        else {
            if (this._bgcolor.indexOf("rgba") === 0 || (this._bgcolor.length === 9 && this._bgcolor.indexOf("#") === 0)) {
                this._ctx.clearRect(-px, -px, this._canvas.width + px, this._canvas.height + px);
            }
            this._ctx.fillStyle = this._bgcolor;
            this._ctx.fillRect(-px, -px, this._canvas.width + px, this._canvas.height + px);
        }
        this._ctx.fillStyle = lastColor;
        return this;
    }
    clearOffscreen(bg) {
        if (this._offscreen) {
            const px = Math.ceil(this.pixelScale);
            if (bg) {
                this._offCtx.fillStyle = bg;
                this._offCtx.fillRect(-px, -px, this._canvas.width + px, this._canvas.height + px);
            }
            else {
                this._offCtx.clearRect(-px, -px, this._offCanvas.width + px, this._offCanvas.height + px);
            }
        }
        return this;
    }
    playItems(time) {
        if (this._isReady) {
            this._ctx.save();
            if (this._offscreen)
                this._offCtx.save();
            super.playItems(time);
            this._ctx.restore();
            if (this._offscreen)
                this._offCtx.restore();
            this.render(this._ctx);
        }
    }
    dispose() {
        if (!window)
            return;
        window.removeEventListener('resize', this._resizeHandler.bind(this));
        this.stop();
        this.removeAll();
        return this;
    }
    recorder(downloadOrCallback, filetype = "webm", bitrate = 15000000) {
        let stream = this._canvas.captureStream();
        const recorder = new MediaRecorder(stream, { mimeType: `video/${filetype}`, bitsPerSecond: bitrate });
        recorder.ondataavailable = function (d) {
            let url = URL.createObjectURL(new Blob([d.data], { type: `video/${filetype}` }));
            if (typeof downloadOrCallback === "function") {
                downloadOrCallback(url);
            }
            else if (downloadOrCallback) {
                let a = document.createElement("a");
                a.href = url;
                a.download = `canvas_video.${filetype}`;
                a.click();
                a.remove();
            }
        };
        return recorder;
    }
}
exports.CanvasSpace = CanvasSpace;
class CanvasForm extends Form_1.VisualForm {
    constructor(space) {
        super();
        this._style = {
            fillStyle: "#f03", strokeStyle: "#fff",
            lineWidth: 1, lineJoin: "bevel", lineCap: "butt",
            globalAlpha: 1
        };
        if (!space)
            return this;
        const _setup = (ctx) => {
            this._ctx = ctx;
            this._ctx.fillStyle = this._style.fillStyle;
            this._ctx.strokeStyle = this._style.strokeStyle;
            this._ctx.lineJoin = "bevel";
            this._ctx.font = this._font.value;
            this._ready = true;
        };
        if (space instanceof CanvasRenderingContext2D) {
            _setup(space);
        }
        else {
            this._space = space;
            this._space.add({ start: () => {
                    _setup(this._space.ctx);
                } });
        }
    }
    get space() { return this._space; }
    get ctx() { return this._space.ctx; }
    useOffscreen(off = true, clear = false) {
        if (clear)
            this._space.clearOffscreen((typeof clear == "string") ? clear : null);
        this._ctx = (this._space.hasOffscreen && off) ? this._space.offscreenCtx : this._space.ctx;
        return this;
    }
    renderOffscreen(offset = [0, 0]) {
        if (this._space.hasOffscreen) {
            this._space.ctx.drawImage(this._space.offscreenCanvas, offset[0], offset[1], this._space.width, this._space.height);
        }
    }
    alpha(a) {
        this._ctx.globalAlpha = a;
        this._style.globalAlpha = a;
        return this;
    }
    fill(c) {
        if (typeof c == "boolean") {
            this.filled = c;
        }
        else {
            this.filled = true;
            this._style.fillStyle = c;
            this._ctx.fillStyle = c;
        }
        return this;
    }
    stroke(c, width, linejoin, linecap) {
        if (typeof c == "boolean") {
            this.stroked = c;
        }
        else {
            this.stroked = true;
            this._style.strokeStyle = c;
            this._ctx.strokeStyle = c;
            if (width) {
                this._ctx.lineWidth = width;
                this._style.lineWidth = width;
            }
            if (linejoin) {
                this._ctx.lineJoin = linejoin;
                this._style.lineJoin = linejoin;
            }
            if (linecap) {
                this._ctx.lineCap = linecap;
                this._style.lineCap = linecap;
            }
        }
        return this;
    }
    applyFillStroke(filled = true, stroked = true, strokeWidth = 1) {
        if (filled) {
            if (typeof filled === 'string')
                this.fill(filled);
            this._ctx.fill();
        }
        if (stroked) {
            if (typeof stroked === 'string')
                this.stroke(stroked, strokeWidth);
            this._ctx.stroke();
        }
        return this;
    }
    gradient(stops) {
        let vals = [];
        if (stops.length < 2)
            stops.push([0.99, "#000"], [1, "#000"]);
        for (let i = 0, len = stops.length; i < len; i++) {
            let t = typeof stops[i] === 'string' ? i * (1 / (stops.length - 1)) : stops[i][0];
            let v = typeof stops[i] === 'string' ? stops[i] : stops[i][1];
            vals.push([t, v]);
        }
        return (area1, area2) => {
            area1 = area1.map(a => a.abs());
            if (area2)
                area2.map(a => a.abs());
            let grad = area2
                ? this.ctx.createRadialGradient(area1[0][0], area1[0][1], area1[1][0], area2[0][0], area2[0][1], area2[1][0])
                : this.ctx.createLinearGradient(area1[0][0], area1[0][1], area1[1][0], area1[1][1]);
            for (let i = 0, len = vals.length; i < len; i++) {
                grad.addColorStop(vals[i][0], vals[i][1]);
            }
            return grad;
        };
    }
    composite(mode = 'source-over') {
        this.ctx.globalCompositeOperation = mode;
        return this;
    }
    clip() {
        this.ctx.clip();
        return this;
    }
    dash(segments = true, offset = 0) {
        if (!segments) {
            this._ctx.setLineDash([]);
            this._ctx.lineDashOffset = 0;
        }
        else {
            if (segments === true) {
                segments = [5, 5];
            }
            this._ctx.setLineDash([segments[0], segments[1]]);
            this._ctx.lineDashOffset = offset;
        }
        return this;
    }
    font(sizeOrFont, weight, style, lineHeight, family) {
        if (typeof sizeOrFont == "number") {
            this._font.size = sizeOrFont;
            if (family)
                this._font.face = family;
            if (weight)
                this._font.weight = weight;
            if (style)
                this._font.style = style;
            if (lineHeight)
                this._font.lineHeight = lineHeight;
        }
        else {
            this._font = sizeOrFont;
        }
        this._ctx.font = this._font.value;
        if (this._estimateTextWidth)
            this.fontWidthEstimate(true);
        return this;
    }
    fontWidthEstimate(estimate = true) {
        this._estimateTextWidth = (estimate) ? Typography_1.Typography.textWidthEstimator(((c) => this._ctx.measureText(c).width)) : undefined;
        return this;
    }
    getTextWidth(c) {
        return (!this._estimateTextWidth) ? this._ctx.measureText(c + " .").width : this._estimateTextWidth(c);
    }
    _textTruncate(str, width, tail = "") {
        return Typography_1.Typography.truncate(this.getTextWidth.bind(this), str, width, tail);
    }
    _textAlign(box, vertical, offset, center) {
        let _box = Util_1.Util.iterToArray(box);
        if (!Util_1.Util.arrayCheck(_box))
            return;
        if (!center)
            center = Op_1.Rectangle.center(_box);
        var px = _box[0][0];
        if (this._ctx.textAlign == "end" || this._ctx.textAlign == "right") {
            px = _box[1][0];
        }
        else if (this._ctx.textAlign == "center" || this._ctx.textAlign == "middle") {
            px = center[0];
        }
        var py = center[1];
        if (vertical == "top" || vertical == "start") {
            py = _box[0][1];
        }
        else if (vertical == "end" || vertical == "bottom") {
            py = _box[1][1];
        }
        return (offset) ? new Pt_1.Pt(px + offset[0], py + offset[1]) : new Pt_1.Pt(px, py);
    }
    reset() {
        for (let k in this._style) {
            if (this._style.hasOwnProperty(k)) {
                this._ctx[k] = this._style[k];
            }
        }
        this._font = new Form_1.Font();
        this._ctx.font = this._font.value;
        return this;
    }
    _paint() {
        if (this._filled)
            this._ctx.fill();
        if (this._stroked)
            this._ctx.stroke();
    }
    static point(ctx, p, radius = 5, shape = "square") {
        if (!p)
            return;
        if (!CanvasForm[shape])
            throw new Error(`${shape} is not a static function of CanvasForm`);
        CanvasForm[shape](ctx, p, radius);
    }
    point(p, radius = 5, shape = "square") {
        CanvasForm.point(this._ctx, p, radius, shape);
        this._paint();
        return this;
    }
    static circle(ctx, pt, radius = 10) {
        if (!pt)
            return;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], radius, 0, Util_1.Const.two_pi, false);
        ctx.closePath();
    }
    circle(pts) {
        let p = Util_1.Util.iterToArray(pts);
        CanvasForm.circle(this._ctx, p[0], p[1][0]);
        this._paint();
        return this;
    }
    static ellipse(ctx, pt, radius, rotation = 0, startAngle = 0, endAngle = Util_1.Const.two_pi, cc = false) {
        if (!pt || !radius)
            return;
        ctx.beginPath();
        ctx.ellipse(pt[0], pt[1], radius[0], radius[1], rotation, startAngle, endAngle, cc);
    }
    ellipse(pt, radius, rotation = 0, startAngle = 0, endAngle = Util_1.Const.two_pi, cc = false) {
        CanvasForm.ellipse(this._ctx, pt, radius, rotation, startAngle, endAngle, cc);
        this._paint();
        return this;
    }
    static arc(ctx, pt, radius, startAngle, endAngle, cc) {
        if (!pt)
            return;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], radius, startAngle, endAngle, cc);
    }
    arc(pt, radius, startAngle, endAngle, cc) {
        CanvasForm.arc(this._ctx, pt, radius, startAngle, endAngle, cc);
        this._paint();
        return this;
    }
    static square(ctx, pt, halfsize) {
        if (!pt)
            return;
        let x1 = pt[0] - halfsize;
        let y1 = pt[1] - halfsize;
        let x2 = pt[0] + halfsize;
        let y2 = pt[1] + halfsize;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2, y1);
        ctx.closePath();
    }
    square(pt, halfsize) {
        CanvasForm.square(this._ctx, pt, halfsize);
        this._paint();
        return this;
    }
    static line(ctx, pts) {
        if (!Util_1.Util.arrayCheck(pts))
            return;
        let i = 0;
        ctx.beginPath();
        for (let it of pts) {
            if (it) {
                if (i++ > 0) {
                    ctx.lineTo(it[0], it[1]);
                }
                else {
                    ctx.moveTo(it[0], it[1]);
                }
            }
        }
    }
    line(pts) {
        CanvasForm.line(this._ctx, pts);
        this._paint();
        return this;
    }
    static polygon(ctx, pts) {
        if (!Util_1.Util.arrayCheck(pts))
            return;
        CanvasForm.line(ctx, pts);
        ctx.closePath();
    }
    polygon(pts) {
        CanvasForm.polygon(this._ctx, pts);
        this._paint();
        return this;
    }
    static rect(ctx, pts) {
        let p = Util_1.Util.iterToArray(pts);
        if (!Util_1.Util.arrayCheck(p))
            return;
        ctx.beginPath();
        ctx.moveTo(p[0][0], p[0][1]);
        ctx.lineTo(p[0][0], p[1][1]);
        ctx.lineTo(p[1][0], p[1][1]);
        ctx.lineTo(p[1][0], p[0][1]);
        ctx.closePath();
    }
    rect(pts) {
        CanvasForm.rect(this._ctx, pts);
        this._paint();
        return this;
    }
    static image(ctx, ptOrRect, img, orig) {
        let t = Util_1.Util.iterToArray(ptOrRect);
        let pos;
        if (typeof t[0] === "number") {
            pos = t;
        }
        else {
            if (orig) {
                let o = Util_1.Util.iterToArray(orig);
                pos = [o[0][0], o[0][1], o[1][0] - o[0][0], o[1][1] - o[0][1],
                    t[0][0], t[0][1], t[1][0] - t[0][0], t[1][1] - t[0][1]];
            }
            else {
                pos = [t[0][0], t[0][1], t[1][0] - t[0][0], t[1][1] - t[0][1]];
            }
        }
        if (img instanceof Image_1.Img) {
            if (img.loaded) {
                ctx.drawImage(img.image, ...pos);
            }
        }
        else {
            ctx.drawImage(img, ...pos);
        }
    }
    image(ptOrRect, img, orig) {
        if (img instanceof Image_1.Img) {
            if (img.loaded) {
                CanvasForm.image(this._ctx, ptOrRect, img.image, orig);
            }
        }
        else {
            CanvasForm.image(this._ctx, ptOrRect, img, orig);
        }
        return this;
    }
    static imageData(ctx, ptOrRect, img) {
        let t = Util_1.Util.iterToArray(ptOrRect);
        if (typeof t[0] === "number") {
            ctx.putImageData(img, t[0], t[1]);
        }
        else {
            ctx.putImageData(img, t[0][0], t[0][1], t[0][0], t[0][1], t[1][0], t[1][1]);
        }
    }
    imageData(ptOrRect, img) {
        CanvasForm.imageData(this._ctx, ptOrRect, img);
        return this;
    }
    static text(ctx, pt, txt, maxWidth) {
        if (!pt)
            return;
        ctx.fillText(txt, pt[0], pt[1], maxWidth);
    }
    text(pt, txt, maxWidth) {
        CanvasForm.text(this._ctx, pt, txt, maxWidth);
        return this;
    }
    textBox(box, txt, verticalAlign = "middle", tail = "", overrideBaseline = true) {
        if (overrideBaseline)
            this._ctx.textBaseline = verticalAlign;
        let size = Op_1.Rectangle.size(box);
        let t = this._textTruncate(txt, size[0], tail);
        this.text(this._textAlign(box, verticalAlign), t[0]);
        return this;
    }
    paragraphBox(box, txt, lineHeight = 1.2, verticalAlign = "top", crop = true) {
        let b = Util_1.Util.iterToArray(box);
        let size = Op_1.Rectangle.size(b);
        this._ctx.textBaseline = "top";
        let lstep = this._font.size * lineHeight;
        let nextLine = (sub, buffer = [], cc = 0) => {
            if (!sub)
                return buffer;
            if (crop && cc * lstep > size[1] - lstep * 2)
                return buffer;
            if (cc > 10000)
                throw new Error("max recursion reached (10000)");
            let t = this._textTruncate(sub, size[0], "");
            let newln = t[0].indexOf("\n");
            if (newln >= 0) {
                buffer.push(t[0].substr(0, newln));
                return nextLine(sub.substr(newln + 1), buffer, cc + 1);
            }
            let dt = t[0].lastIndexOf(" ") + 1;
            if (dt <= 0 || t[1] === sub.length)
                dt = undefined;
            let line = t[0].substr(0, dt);
            buffer.push(line);
            return (t[1] <= 0 || t[1] === sub.length) ? buffer : nextLine(sub.substr((dt || t[1])), buffer, cc + 1);
        };
        let lines = nextLine(txt);
        let lsize = lines.length * lstep;
        let lbox = b;
        if (verticalAlign == "middle" || verticalAlign == "center") {
            let lpad = (size[1] - lsize) / 2;
            if (crop)
                lpad = Math.max(0, lpad);
            lbox = new Pt_1.Group(b[0].$add(0, lpad), b[1].$subtract(0, lpad));
        }
        else if (verticalAlign == "bottom") {
            lbox = new Pt_1.Group(b[0].$add(0, size[1] - lsize), b[1]);
        }
        else {
            lbox = new Pt_1.Group(b[0], b[0].$add(size[0], lsize));
        }
        let center = Op_1.Rectangle.center(lbox);
        for (let i = 0, len = lines.length; i < len; i++) {
            this.text(this._textAlign(lbox, "top", [0, i * lstep], center), lines[i]);
        }
        return this;
    }
    alignText(alignment = "left", baseline = "alphabetic") {
        if (baseline == "center")
            baseline = "middle";
        if (baseline == "baseline")
            baseline = "alphabetic";
        this._ctx.textAlign = alignment;
        this._ctx.textBaseline = baseline;
        return this;
    }
    log(txt) {
        let w = this._ctx.measureText(txt).width + 20;
        this.stroke(false).fill("rgba(0,0,0,.4)").rect([[0, 0], [w, 20]]);
        this.fill("#fff").text([10, 14], txt);
        return this;
    }
}
exports.CanvasForm = CanvasForm;
//# sourceMappingURL=Canvas.js.map