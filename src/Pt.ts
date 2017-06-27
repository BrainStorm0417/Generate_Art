import {Util, Const} from "./Util"
import {Geom} from "./Op"
import {Bound} from "./Bound"
import {Vec} from "./LinearAlgebra"


export interface IPt {
  x?:number,
  y?:number,
  z?:number,
  w?:number
}

export var PtBaseArray = Float32Array;
export type GroupLike = Group | Pt[];
export type PtLike = Pt | Float32Array | number[];


export class Pt extends PtBaseArray implements IPt, Iterable<number> {


  /**
   * Create a Pt. If no parameter is provided, this will instantiate a Pt with 2 dimensions [0, 0].
   * Example: `new Pt()`, `new Pt(1,2,3,4,5)`, `new Pt([1,2])`, `new Pt({x:0, y:1})`, `new Pt(pt)`
   * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
   */
  constructor(...args) {
    super( (args.length>0) ? Util.getArgs(args) : [0,0] );
  }

  static make( dimensions:number, defaultValue:number=0 ):Pt {
    let p = new PtBaseArray(dimensions);
    if (defaultValue) p.fill( defaultValue );
    return new Pt( p );
  }


  get x():number { return this[0]; }
  get y():number { return this[1]; }
  get z():number { return this[2]; }
  get w():number { return this[3]; }

  set x( n:number ) { this[0] = n; }
  set y( n:number ) { this[1] = n; }
  set z( n:number ) { this[2] = n; }
  set w( n:number ) { this[3] = n; }
  

  clone():Pt {
    return new Pt( this );
  }

  equals( p:PtLike, threshold=0 ):boolean {
    for (let i=0, len=this.length; i<len; i++) {
      if ( Math.abs(this[i]-p[i]) > threshold ) return false;
    }
    return true;
  }


  /**
   * Update the values of this Pt
   * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
   */
  to( ...args ):this {
    let p = Util.getArgs( args );
    for (let i=0, len=Math.min(this.length, p.length); i<len; i++) {
      this[i] = p[i];
    }
    return this;
  }

  /**
   * Update the values of this Pt to point at a specific angle
   * @param radian target angle in radian
   * @param magnitude Optional magnitude if known. If not provided, it'll calculate and use this Pt's magnitude.
   */
  toAngle( radian:number, magnitude?:number ):this {
    let m = (magnitude!=undefined) ? magnitude : this.magnitude();
    return this.to( Math.cos(radian)*m, Math.sin(radian)*m );
  }

  /**
   * Create an operation using this Pt, passing this Pt into a custom function's first parameter
   * For example: `let myOp = pt.op( fn ); let result = myOp( [1,2,3] );`
   * @param fn any function that takes a Pt as its first parameter
   * @returns a resulting function that takes other parameters required in `fn`
   */
  op( fn:(p1:PtLike, ...rest:any[]) => any ): ( ...rest:any[] ) => any {
    let self = this;
    return ( ...params:any[] ) => {
      return fn( self, ...params );
    }
  }

  /**
   * This combines a series of operations into an array. See `op()` for details.
   * For example: `let myOps = pt.ops([fn1, fn2, fn3]); let results = myOps.map( (op) => op([1,2,3]) );`
   * @param fns an array of functions for `op`
   * @returns an array of resulting functions
   */
  ops( fns:((p1:PtLike, ...rest:any[]) => any)[] ): (( ...rest:any[] ) => any)[] {
    let _ops = [];
    for (let i=0, len=fns.length; i<len; i++) {
      _ops.push( this.op( fns[i] ) );
    }
    return _ops;
  }


  $map( fn:(currentValue:number, index:number, array:PtLike) => number):Pt {
    let m = this.clone();
    Vec.map( m, fn );
    return m;
  }

  /**
   * Take specific dimensional values from this Pt and create a new Pt
   * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
   */
  $take( axis:string|number[] ):Pt {
    let p = [];
    for (let i=0, len=axis.length; i<len; i++) {
      p.push( this[axis[i]] || 0 );
    }
    return new Pt(p);
  }


  /**
   * Get a new Pt based on a slice of this Pt. Similar to `Array.slice()`.
   * @param start start index
   * @param end end index (ie, entry will not include value at this index)
   */
  $slice(start?:number, end?:number):Pt {
    // seems like new Pt(...).slice will return an error, must use Float64Array
    let m = new PtBaseArray( this ).slice(start, end); 
    return new Pt( m );
  }

  $concat( ...args ) {
    return new Pt( this.toArray().concat( Util.getArgs( args ) ) );
  }

  add(...args): this { 
    (args.length === 1 && typeof args[0] == "number") ? Vec.add( this, args[0] ) : Vec.add( this, Util.getArgs(args) );
    return this; 
  }

  $add(...args): Pt { return this.clone().add(...args) };


  subtract(...args): this { 
    (args.length === 1 && typeof args[0] == "number") ? Vec.subtract( this, args[0] ) : Vec.subtract( this, Util.getArgs(args) );
    return this; 
  }

  $subtract(...args): Pt { return this.clone().subtract(...args) };


  multiply(...args): this { 
    (args.length === 1 && typeof args[0] == "number") ? Vec.multiply( this, args[0] ) : Vec.multiply( this, Util.getArgs(args) );
    return this;
  }

  $multiply(...args): Pt { return this.clone().multiply(...args) };


  divide(...args): this { 
    (args.length === 1 && typeof args[0] == "number") ? Vec.divide( this, args[0] ) : Vec.divide( this, Util.getArgs(args) );
    return this; 
  }

  $divide(...args): Pt { return this.clone().divide(...args) };

  magnitudeSq():number {  return Vec.dot( this, this ); }

  magnitude():number { return Vec.magnitude( this ); }


  /**
   * Convert to a unit vector
   * @param magnitude Optional: if the magnitude is known, pass it as a parameter to avoid duplicate calculation.
   */
  unit( magnitude:number=undefined ):Pt {
    Vec.unit( this, magnitude );
    return this;
  }

  /**
   * Get a unit vector from this Pt
   */
  $unit( magnitude:number=undefined ):Pt { return this.clone().unit( magnitude ); }

  dot( ...args ):number { return Vec.dot( this, Util.getArgs(args) ); }

  $cross( ...args ): Pt { return Vec.cross( this, Util.getArgs( args ) ); }

  $project( p:Pt ):Pt {
    let m = p.magnitude();
    let a = this.$unit();
    let b = p.$divide(m);
    let dot = a.dot( b );
    return a.multiply( m * dot );
  }


  /**
   * Absolute values for all values in this pt
   */
  abs():Pt {
    Vec.abs( this );
    return this;
  }

  /**
   * Get a new Pt with absolute values of this Pt
   */
  $abs():Pt {
    return this.clone().abs();
  }

  $min( p: Pt ):Pt {
    let m = this.clone();
    for (let i=0, len=Math.min( this.length, p.length ); i<len; i++) {
      m[i] = Math.min( this[i], p[i] );
    }
    return m;
  }

  $max( p: Pt ):Pt {
    let m = this.clone();
    for (let i=0, len=Math.min( this.length, p.length ); i<len; i++) {
      m[i] = Math.max( this[i], p[i] );
    }
    return m;
  }

  /**
   * Get angle of this vector from origin
   * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
   */
  angle( axis:string|number[]=Const.xy ):number {
    return Math.atan2( this[axis[1]], this[axis[0]] );
  }

  /**
   * Get the angle between this and another Pt
   * @param p the other Pt
   * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
   */
  angleBetween( p:Pt, axis:string|number[]=Const.xy ):number {
    return Geom.boundRadian( this.angle(axis) ) - Geom.boundRadian( p.angle(axis) );
  }

  scale( scale:number|number[]|PtLike, anchor?:PtLike ) {    
    Geom.scale( this, scale, anchor || Pt.make( this.length, 0) );
    return this;
  }


  rotate2D( angle:number, anchor?:PtLike, axis?:string ) {    
    Geom.rotate2D( this, angle, anchor || Pt.make( this.length, 0), axis );
    return this;
  }

  shear2D( scale:number|number[]|PtLike, anchor?:PtLike, axis?:string) {
    Geom.shear2D( this, scale, anchor || Pt.make( this.length, 0), axis );
    return this;
  }

  reflect2D( line:GroupLike, anchor?:PtLike, axis?:string):this {
    Geom.reflect2D( this, line, anchor || Pt.make( this.length, 0), axis );
    return this;
  }

  /**
   * Check if another Pt is perpendicular to this Pt
   * @param p another Pt
   */
  isPerpendicular( p ) {
    return this.dot(p) == 0
  } 


  toString():string {
    return `Pt(${ this.join(",")})`
  }

  toArray():number[] {
    return [].slice.call( this );
  }


  /**
   * Given two groups of Pts, and a function that operate on two Pt, return a group of Pts  
   * @param a a group of Pts
   * @param b another array of Pts
   * @param op a function that takes two parameters (p1, p2) and returns a Pt 
   */
  static combine( a:GroupLike, b:GroupLike, op:(p1:Pt, p2:Pt) => Pt ):Group {
    let result = new Group();
    for (let i=0, len=a.length; i<len; i++) {
      for (let k=0, len=b.length; k<len; k++) {
        result.push( op(a[i], b[k]) );
      }
    }
    return result;
  }

}


export class Group extends Array<Pt> {

  constructor(...args) {
    super(...args);
  }

  clone():Group {
    let group = new Group();   
    for (let i=0, len=this.length; i<len; i++) {
      group.push( this[i].clone() );
    }
    return group;
  }

  static fromArray( list:PtLike[] ):Group {
    let g = new Group();
    for (let i=0, len=list.length; i<len; i++) {
      let p = (list[i] instanceof Pt) ? list[i] as Pt : new Pt(list[i]);
      g.push( p );
    }
    return g;
  }

  static fromGroup( list:GroupLike ):Group {
    return Group.from( list ) as Group;
  }

  split( chunkSize:number, stride?:number ):Group[] {
    let sp = Util.split( this, chunkSize, stride );
    return sp.map( (g) => Group.fromGroup( g ) );
  }

  /**
   * Insert a
   * @param pts Another group of Pts
   * @param index the index position to insert into
   */
  insert( pts:GroupLike, index=0 ):this {
    let g = Group.prototype.splice.apply( this, [index, 0, ...pts] );
    return this;
  }
  
  /**
   * Like Array's splice function, with support for negative index and a friendlier name.
   * @param index start index, which can be negative (where -1 is at index 0, -2 at index 1, etc)
   * @param count number of items to remove
   * @returns The items that are removed. 
   */
  remove( index=0, count:number=1 ):Group {
    let param = (index<0) ? [index*-1 - 1, count] : [index, count];
    return Group.prototype.splice.apply( this, param );
  }

  pairs( stride:number=2 ):Group[] { return this.split(2, stride); }

  segments():Group[] { return this.pairs(1); }


  /**
   * Create an operation using this Group, passing this Group into a custom function's first parameter
   * For example: `let myOp = group.op( fn ); let result = myOp( [1,2,3] );`
   * @param fn any function that takes a Group as its first parameter
   * @returns a resulting function that takes other parameters required in `fn`
   */
  op( fn:(g1:GroupLike, ...rest:any[]) => any ): ( ...rest:any[] ) => any {
    let self = this;
    return ( ...params:any[] ) => {
      return fn( self, ...params );
    }
  }


  /**
   * This combines a series of operations into an array. See `op()` for details.
   * For example: `let myOps = pt.ops([fn1, fn2, fn3]); let results = myOps.map( (op) => op([1,2,3]) );`
   * @param fns an array of functions for `op`
   * @returns an array of resulting functions
   */
  ops( fns:((g1:GroupLike, ...rest:any[]) => any)[] ): (( ...rest:any[] ) => any)[] {
    let _ops = [];
    for (let i=0, len=fns.length; i<len; i++) {
      _ops.push( this.op( fns[i] ) );
    }
    return _ops;
  }


  boundingBox():Group {
    return Geom.boundingBox( this );
  }

  centroid():Pt {
    return Geom.centroid( this );
  }

  /**
   * Get an interpolated point on the line segments defined by this Group
   * @param t a value between 0 to 1 usually
   */
  interpolate( t:number ):Pt {
    let chunk = this.length-1;
    let tc = 1/(this.length-1);
    let idx = Math.floor( t / tc );
    return Geom.interpolate( this[idx], this[idx+1], (t - idx*tc) * chunk );
  }

  moveBy( ...args ):this {
    let pt = Util.getArgs( args );
    for (let i=0, len=this.length; i<len; i++) {
      this[i].add( pt );
    }
    return this;
  }

  /**
   * Move the first Pt in this group to a specific position, and move all the other Pts correspondingly
   * @param args a list of numbers, an array of number, or an object with {x,y,z,w} properties
   */
  moveTo( ...args ):this {
    let d = new Pt( Util.getArgs(args) ).subtract( this[0] );
    this.moveBy( d );
    return this; 
  }

  scale( scale:number|number[]|PtLike, anchor?:PtLike ):this {    
    for (let i=0, len=this.length; i<len; i++) {
      Geom.scale( this[i], scale, anchor || this[0] );
    }
    return this;
  }

  rotate2D( angle:number, anchor?:PtLike, axis?:string ):this {   
    for (let i=0, len=this.length; i<len; i++) {
      Geom.rotate2D( this[i], angle, anchor || this[0], axis );
    } 
    return this;
  }

  shear2D( scale:number|number[]|PtLike, anchor?:PtLike, axis?:string):this {
    for (let i=0, len=this.length; i<len; i++) {
      Geom.shear2D( this[i], scale, anchor || this[0], axis );
    }
    return this;
  }

  reflect2D( line:GroupLike, anchor?:PtLike, axis?:string):this {
    for (let i=0, len=this.length; i<len; i++) {
      Geom.reflect2D( this[i], line, anchor || this[0], axis );
    }
    return this;
  }

  /**
   * Sort this group's Pts by values in a specific dimension
   * @param dim dimensional index
   * @param desc if true, sort descending. Default is false (ascending)
   */
  sortByDimension( dim:number, desc:boolean=false ):this {
    return this.sort( (a, b) => (desc) ? b[dim] - a[dim] : a[dim] - b[dim] );
  }

  toString():string {
    return "Group[ "+ this.reduce( (p, c) => p+c.toString()+" ", "" )+" ]";
  }


  /**
   * Zip one slice of an array of Pt
   * @param pts an array of Pt
   * @param idx index to zip at
   * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
   */
  zipOne( index:number, defaultValue:number|boolean = false ):Pt {
    let f = (typeof defaultValue == "boolean") ? "get" : "at"; // choose `get` or `at` function
    let z = [];
    for (let i=0, len=this.length; i<len; i++) {
      if (this[i].length-1 < index && defaultValue === false) throw `Index ${index} is out of bounds`;
      z.push( this[i][index] || defaultValue );
    }
    return new Pt(z);
  }


  /**
   * Zip an array of Pt. eg, [[1,2],[3,4],[5,6]] => [[1,3,5],[2,4,6]]
   * @param pts an array of Pt
   * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
   * @param useLongest If true, find the longest list of values in a Pt and use its length for zipping. Default is false, which uses the first item's length for zipping.
   */
  zip( defaultValue:number|boolean = false, useLongest=false ):Group {
    let ps = new Group();
    let len = (useLongest) ? this.reduce( (a,b) => Math.max(a, b.length), 0 ) : this[0].length;
    for (let i=0; i<len; i++) {
      ps.push( this.zipOne( i, defaultValue ) )
    }
    return ps;
  }


  /**
   * Given two arrays of Groups, and a function that operate on two Groups, return an array of Group  
   * @param a an array of Groups, eg [ Group, Group, ... ]
   * @param b another array of Groups
   * @param op a function that takes two parameters (group1, group2) and returns a Group
   */
  static combine( a:Group[], b:Group[], op:(group1:Group, group2:Group) => Group ):Group[] {
    let result = [];
    for (let i=0, len=a.length; i<len; i++) {
      for (let k=0, len=b.length; k<len; k++) {
        result.push( op(a[i], b[k]) );
      }
    }
    return result;
  }
}