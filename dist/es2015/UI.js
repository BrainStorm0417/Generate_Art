import { Rectangle, Circle } from "./Op";
export var UIShape;
(function (UIShape) {
    UIShape[UIShape["Rectangle"] = 0] = "Rectangle";
    UIShape[UIShape["Circle"] = 1] = "Circle";
    UIShape[UIShape["Polygon"] = 2] = "Polygon";
    UIShape[UIShape["Polyline"] = 3] = "Polyline";
    UIShape[UIShape["Line"] = 4] = "Line";
})(UIShape || (UIShape = {}));
export const UIPointerActions = {
    up: "up", down: "down", move: "move", drag: "drag", drop: "drop", over: "over", out: "out"
};
export class UI {
    constructor(group, shape, states, id) {
        this.group = group;
        this.shape = shape;
        this._id = id;
        this._states = states;
        this._actions = {};
    }
    get id() { return this._id; }
    set id(d) { this._id = d; }
    state(key) {
        return this._states[key] || false;
    }
    on(key, fn) {
        this._actions[key] = fn;
        return this;
    }
    off(key) {
        delete this._actions[key];
        return this;
    }
    listen(key, p) {
        if (this._actions[key] !== undefined) {
            if (this._trigger(p)) {
                this._actions[key](p, this, key);
                return true;
            }
        }
        return false;
    }
    render(fn) {
        fn(this.group, this._states);
    }
    _trigger(p) {
        let fn = null;
        if (this.shape === UIShape.Rectangle) {
            fn = Rectangle.withinBound;
        }
        else if (this.shape === UIShape.Circle) {
            fn = Circle.withinBound;
        }
        else if (this.shape === UIShape.Polygon) {
            fn = Rectangle.withinBound;
        }
        else {
            return false;
        }
        return fn(this.group, p);
    }
}
export class UIButton extends UI {
    constructor(group, shape, states, id) {
        super(group, shape, states, id);
        this._clicks = 0;
    }
    get clicks() { return this._clicks; }
    onClick(fn) {
        this._clicks++;
        this.on(UIPointerActions.up, fn);
    }
    onHover(over, out) {
        this.on(UIPointerActions.over, over);
        this.on(UIPointerActions.out, out);
    }
}
//# sourceMappingURL=UI.js.map