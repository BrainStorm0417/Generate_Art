(function(){
  // Pts.namespace( this ); // add Pts into scope if needed
  
  var demoID = "op_bspline";
  
  // create Space and Form
  var space = new CanvasSpace("#"+demoID).setup({ retina: true, bgcolor: "#e2e6ef" });
  var form = space.getForm();
  var pts = undefined;

  // animation
  space.add( (time, ftime) => {

    // create a group of 4 Pts from rectangle
    let c = space.center.clone()
    let corners = Rectangle.corners( Rectangle.fromCenter( c, space.height ) );

    // interpolate with time to make them move
    let cycle = (t, i) => Num.cycle( (t+i*500)%3000/3000 );
    let pts = corners.map( (p, i) => Geom.interpolate( p, c, cycle(time, i)) );

    // close the B-spline path
    pts.push( space.pointer );
    pts.insert( pts.slice(0, 3), pts.length );

    // draw the B-spline curve
    let curve = Curve.bspline( pts );
    form.fill("#f03").stroke("#fff", 5).polygon( curve );
    form.stroke("rgba(0,0,0,.2", 1).lines( corners.map( (p) => [p, space.center]) );
    form.fillOnly("#123").points( pts, 3, "circle" );
    
  });
  
  // start
  space.playOnce(200).bindMouse().bindTouch();
  
  // For use in demo page only
  if (window.registerDemo) window.registerDemo(demoID, space);
  
})();