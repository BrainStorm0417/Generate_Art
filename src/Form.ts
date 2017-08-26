// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan)


import {Space} from "./Space";
import {Pt, PtLike, GroupLike} from "./Pt";



/**
* Form is an abstract class that represents a form that's used in a Space for expressions.
*/
export abstract class Form {
  
  protected _ready:boolean = false;
  
  /**
  * A property to get the form's Space
  */
  abstract get space():Space;
  
  /**
  * get whether the Form has received the Space's rendering context
  */
  get ready():boolean { return this._ready; }
}




/**
* VisualForm is an abstract class that represents a form that can be used to express Pts visually.
* For example, CanvasForm is an implementation of VisualForm that draws on CanvasSpace which represents a html canvas.
*/
export abstract class VisualForm extends Form {
  
  
  protected _filled = true;
  get filled():boolean { return this._filled; }
  set filled( b:boolean ) { this._filled = b; }
  
  protected _stroked = true;
  get stroked():boolean { return this._stroked; }
  set stroked( b:boolean ) { this._stroked = b; }
  
  protected _font:Font = new Font();
  get currentFont():Font { return this._font; }
  
  
  protected _multiple( groups:GroupLike[], shape:string, ...rest ):this {
    if (!groups) return this;
    for (let i=0, len=groups.length; i<len; i++) {
      this[shape]( groups[i], ...rest );
    }
    return this;
  }
  
  
  /**
  * Abstract reset style
  */
  abstract reset(): this;
  
  
  /**
  * Abstract set fill color
  */
  abstract fill( c:string|boolean ):this;
  abstract fillOnly( c:string|boolean ):this;
  
  
  /**
  * Abstract set stroke style
  */
  abstract stroke( c:string|boolean, width?:number, linejoin?:string, linecap?:string ):this;
  abstract strokeOnly( c:string|boolean, width?:number, linejoin?:string, linecap?:string ):this;
  
  
  /**
  * Abstract point drawing
  * @param p a Pt object
  * @param radius radius of the point. Default is 5.
  * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
  * @example `form.point( p )`, `form.point( p, 10, "circle" )`
  */
  abstract point( p:PtLike, radius:number, shape:string ):this;
  
  
  /**
  * Draw multiple points at once
  * @param pts an array of Pt or an array of number arrays
  * @param radius radius of the point. Default is 5.
  * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
  */
  points( pts:GroupLike|number[][], radius:number, shape:string ): this {
    if (!pts) return;
    for (let i=0, len=pts.length; i<len; i++) {
      this.point( pts[i], radius, shape );
    }
    return this;
  }
  
  
  /**
  * Abstract circle drawing
  * @param pts usually a Group of 2 Pts, but it can also take an array of two numeric arrays [ [position], [size] ]
  * @see [`Circle.fromCenter`](./_op_.circle.html#frompt)
  */
  abstract circle( pts:GroupLike|number[][] ):this;
  
  
  
  /**
  * Draw multiple circles at once
  * @param groups an array of Groups that defines multiple circles
  */
  circles( groups:GroupLike[] ):this {
    return this._multiple( groups, "circle" );
  }
  
  
  /**
  * Abstract arc drawing
  * @param pt center position
  * @param radius radius of the arc circle
  * @param startAngle start angle of the arc
  * @param endAngle end angle of the arc
  * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
  */
  abstract arc( pt:PtLike, radius:number, startAngle:number, endAngle:number, cc?:boolean ):this;
  
  
  /**
  * Abstract a line or polyline drawing
  * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
  */
  abstract line( pts:GroupLike|number[][] ):this;
  
  
  /**
  * Draw multiple lines at once
  * @param groups An array of Groups of Pts
  */
  lines( groups:GroupLike[] ):this {
    return this._multiple( groups, "line" );
  }
  
  
  /**
  * Abstract polygon drawing
  * @param pts a Group of multiple Pts, or an array of multiple numeric arrays
  */
  abstract polygon( pts:GroupLike|number[][] ):this;
  
  
  /**
  * Draw multiple polygons at once
  * @param groups An array of Groups of Pts
  */
  polygons( groups:GroupLike[] ):this {
    return this._multiple( groups, "polygon" );
  }
  
  
  
  /**
  * Abstract rectangle drawing
  * @param pts usually a Group of 2 Pts specifying the top-left and bottom-right positions. Alternatively it can be an array of numeric arrays.
  */
  abstract rect( pts:number[][]|Pt[] ):this;
  
  
  /**
  * Draw multiple rectangles at once
  * @param groups An array of Groups of Pts
  */
  rects( groups:GroupLike[] ):this {
    return this._multiple( groups, "rect" );
  }
  
  
  /**
  * Abstract text rendering
  * @param `pt` a Pt or numeric array to specify the anchor point
  * @param `txt` text
  * @param `maxWidth` specify a maximum width per line
  */
  abstract text( pt:PtLike, txt:string, maxWidth?:number): this;
  
  
  /**
  * Abstract font setting
  * @param sizeOrFont either a number to specify font-size, or a `Font` object to specify all font properties
  * @param weight Optional font-weight string such as "bold"
  * @param style Optional font-style string such as "italic"
  * @param lineHeight Optional line-height number suchas 1.5
  * @param family Optional font-family such as "Helvetica, sans-serif"
  * @see `Font` class
  * @example `form.font( myFont )`, `form.font(14, "bold")`
  */
  abstract font( sizeOrFont:number|Font, weight?:string, style?:string, lineHeight?:number, family?:string ):this;
}



/**
* Font class lets you create a specific font style with properties for its size and style
*/
export class Font {
  public size:number;
  public lineHeight:number;
  public face:string;
  public style:string;
  public weight:string;
  
  /**
  * Create a font style
  * @param size font size. Defaults is 12px.
  * @param face Optional font-family, use css-like string such as "Helvetica" or "Helvetica, sans-serif". Default is "sans-serif".
  * @param weight Optional font weight such as "bold". Default is "" (none).
  * @param style Optional font style such as "italic". Default is "" (none).
  * @param lineHeight Optional line height. Default is 1.5.
  * @example `new Font(12, "Frutiger, sans-serif", "bold", "underline", 1.5)`
  */
  constructor( size:number=12, face:string="sans-serif", weight:string="", style:string="", lineHeight:number=1.5 ) {
    this.size = size;
    this.face = face;
    this.style = style;
    this.weight = weight;
    this.lineHeight = lineHeight;
  }
  
  /**
  * Get a string representing the font style, in css-like string such as "italic bold 12px/1.5 sans-serif"
  */
  get value():string { return `${this.style} ${this.weight} ${this.size}px/${this.lineHeight} ${this.face}`; }
  
  
  /**
  * Get a string representing the font style, in css-like string such as "italic bold 12px/1.5 sans-serif"
  */
  toString():string { return this.value; }
  
}