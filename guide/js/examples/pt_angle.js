(function(){
var demoID = "pt_angle";

// create Space and Form
var space = new CanvasSpace("#"+demoID).setup({ retina: true, bgcolor: "#e2e6ef" });
var form = space.getForm();

// animation
space.add( (time, ftime) => {

  let m = space.pointer;
  let c = space.center;
  let p = m.$subtract(c); // the vector from center to mouse
  let lengthP = p.magnitude();
  
  let ang = p.angle();
  let angText = Geom.boundRadian( ang ); // bound between 0 to 2-PI

  form.fill(false).stroke("#FC0021", 10, "round", "round").line( [c, m] );
  form.stroke("#fff").line( [c, new Pt(c.x + lengthP, c.y)])
  form.stroke("#FC0021", 10).arc(c, lengthP, 0, ang);
  form.fill("#1E252C").text( c.$add( p.toAngle( angText/2, lengthP/2 ) ), Math.floor( Geom.toDegree(angText) )+"°" );
});

// start
space.playOnce(200).bindMouse().bindTouch();

// For use in demo page only
if (window.registerDemo) window.registerDemo(demoID, space);

})();
