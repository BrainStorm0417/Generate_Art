"use strict";
/*! Pts.js is licensed under Apache License 2.0. Copyright © 2017-current William Ngan and contributors. (https://github.com/williamngan/pts) */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Const = void 0;
const Num_1 = require("./Num");
const Pt_1 = require("./Pt");
exports.Const = {
    xy: "xy",
    yz: "yz",
    xz: "xz",
    xyz: "xyz",
    horizontal: 0,
    vertical: 1,
    identical: 0,
    right: 4,
    bottom_right: 5,
    bottom: 6,
    bottom_left: 7,
    left: 8,
    top_left: 1,
    top: 2,
    top_right: 3,
    epsilon: 0.0001,
    max: Number.MAX_VALUE,
    min: Number.MIN_VALUE,
    pi: Math.PI,
    two_pi: 6.283185307179586,
    half_pi: 1.5707963267948966,
    quarter_pi: 0.7853981633974483,
    one_degree: 0.017453292519943295,
    rad_to_deg: 57.29577951308232,
    deg_to_rad: 0.017453292519943295,
    gravity: 9.81,
    newton: 0.10197,
    gaussian: 0.3989422804014327
};
class Util {
    static warnLevel(lv) {
        if (lv) {
            Util._warnLevel = lv;
        }
        return Util._warnLevel;
    }
    static getArgs(args) {
        if (args.length < 1)
            return [];
        let pos = [];
        let isArray = Array.isArray(args[0]) || ArrayBuffer.isView(args[0]);
        if (typeof args[0] === 'number') {
            pos = Array.prototype.slice.call(args);
        }
        else if (typeof args[0] === 'object' && !isArray) {
            let a = ["x", "y", "z", "w"];
            let p = args[0];
            for (let i = 0; i < a.length; i++) {
                if ((p.length && i >= p.length) || !(a[i] in p))
                    break;
                pos.push(p[a[i]]);
            }
        }
        else if (isArray) {
            pos = [].slice.call(args[0]);
        }
        return pos;
    }
    static warn(message = "error", defaultReturn = undefined) {
        if (Util.warnLevel() == "error") {
            throw new Error(message);
        }
        else if (Util.warnLevel() == "warn") {
            console.warn(message);
        }
        return defaultReturn;
    }
    static randomInt(range, start = 0) {
        Util.warn("Util.randomInt is deprecated. Please use `Num.randomRange`");
        return Math.floor(Num_1.Num.random() * range) + start;
    }
    static split(pts, size, stride, loopBack = false, matchSize = true) {
        let chunks = [];
        let part = [];
        let st = stride || size;
        let index = 0;
        if (pts.length <= 0 || st <= 0)
            return [];
        while (index < pts.length) {
            part = [];
            for (let k = 0; k < size; k++) {
                if (loopBack) {
                    part.push(pts[(index + k) % pts.length]);
                }
                else {
                    if (index + k >= pts.length)
                        break;
                    part.push(pts[index + k]);
                }
            }
            index += st;
            if (!matchSize || (matchSize && part.length === size))
                chunks.push(part);
        }
        return chunks;
    }
    static flatten(pts, flattenAsGroup = true) {
        let arr = (flattenAsGroup) ? new Pt_1.Group() : new Array();
        return arr.concat.apply(arr, pts);
    }
    static combine(a, b, op) {
        let result = [];
        for (let i = 0, len = a.length; i < len; i++) {
            for (let k = 0, lenB = b.length; k < lenB; k++) {
                result.push(op(a[i], b[k]));
            }
        }
        return result;
    }
    static zip(arrays) {
        let z = [];
        for (let i = 0, len = arrays[0].length; i < len; i++) {
            let p = [];
            for (let k = 0; k < arrays.length; k++) {
                p.push(arrays[k][i]);
            }
            z.push(p);
        }
        return z;
    }
    static stepper(max, min = 0, stride = 1, callback) {
        let c = min;
        return function () {
            c += stride;
            if (c >= max) {
                c = min + (c - max);
            }
            if (callback)
                callback(c);
            return c;
        };
    }
    static forRange(fn, range, start = 0, step = 1) {
        let temp = [];
        for (let i = start, len = range; i < len; i += step) {
            temp[i] = fn(i);
        }
        return temp;
    }
    static load(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                callback(request.responseText, true);
            }
            else {
                callback(`Server error (${request.status}) when loading "${url}"`, false);
            }
        };
        request.onerror = function () {
            callback(`Unknown network error`, false);
        };
        request.send();
    }
    static download(space, filename = 'pts_canvas_image', filetype = "png", quality = 1) {
        const ftype = filetype === 'jpg' ? 'jpeg' : filetype;
        space.element.toBlob(function (blob) {
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `${filename}.${filetype}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, `image/${ftype}`, quality);
    }
    static performance(avgFrames = 10) {
        let last = Date.now();
        let avg = [];
        return function () {
            const now = Date.now();
            avg.push(now - last);
            if (avg.length >= avgFrames)
                avg.shift();
            last = now;
            return Math.floor(avg.reduce((a, b) => a + b, 0) / avg.length);
        };
    }
    static arrayCheck(pts, minRequired = 2) {
        if (Array.isArray(pts) && pts.length < minRequired) {
            Util.warn(`Requires ${minRequired} or more Pts in this Group.`);
            return false;
        }
        return true;
    }
    static iterToArray(it) {
        return (!Array.isArray(it)) ? [...it] : it;
    }
    static isMobile() {
        return /iPhone|iPad|Android/i.test(navigator.userAgent);
    }
}
exports.Util = Util;
Util._warnLevel = "mute";
//# sourceMappingURL=Util.js.map