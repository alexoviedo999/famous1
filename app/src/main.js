/*globals define*/
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Surface   = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Easing    = require('famous/transitions/Easing');
    var Modifier  = require('famous/core/Modifier');
    var PhysicsEngine = require('famous/physics/PhysicsEngine');
    var Vector = require('famous/math/Vector');
    var Spring = require('famous/physics/forces/Spring');
    var Particle = require('famous/physics/bodies/Particle');
    // create the main context
    var mainCtx = Engine.createContext();
    var PE = new PhysicsEngine();

    // your app here
    var logo = new ImageSurface({
        size: [100, 100],
        content: '/content/images/famous_logo.png'
    });

    var logoModifier = new StateModifier({
        origin: [0.9, 0.9]
    });

    // Create a surface, content is html
    var surface = new Surface({
        size:    [100, 100],
        content: "<span>Click To<br/>Move<br/>Surface</span>",
        classes: ["test-surface"]
    });

    // Create a physical particle with position (p), velocity (v), mass(m)
    var particle = new Particle({
      mass: 1,
      position: [0, 0, 0],
      velocity: [0, 0, 0]
    });

    // Create a spring that will act on the particle
    var spring = new Spring({
      anchor: [0, 0, 0],
      period: 400,  // <= Play with these values :-)
      dampingRatio: 0.07, // <=
      length: 0
    });


    // Define Matrix transforms for start/end positions
    // and an easing curve to transition between them
    var startPos = Transform.translate(0, 0, 0);
    var startPos2 = Transform.translate(60, 60, 0);
    var endPos = Transform.translate(150, 200, 0);
    var transform = new Modifier({ transform: startPos });
    var transform2 = new Modifier({ transform: startPos2 });
    var parti = new Modifier({ origin: [.5, .5] })
    var easeTransition = { duration: 500, curve: Easing.inOutCubic };

    // Apply the transition on click and switch start/end
    surface.on("click", function (e) {
      transform.setTransform(endPos, easeTransition);
      startPos = [endPos, endPos = startPos][0];
      particle.applyForce(new Vector(0, 0, -0.005 * 100));
    });
    logo.on("click", function (e) {
      transform2.setTransform(endPos, easeTransition);
      startPos2 = [endPos, endPos = startPos2][0];
      particle.applyForce(new Vector(0, 0, -0.005 * 100));
    });

    // Link the spring, particle and surface together
    PE.attach(spring, particle);
    PE.addBody(particle);

  // Create the scene, applying a top level modifier to center
  // the scene vertically in the viewport


    // mainCtx.add(logoModifier).add(logo).add(particle);
    mainCtx.add(transform).add(surface).add(particle);
    mainCtx.add(transform2).add(logo).add(particle);
    // mainCtx.add(transform).add(logo);

    mainCtx.add(parti).add(particle).add(surface);
    mainCtx.add(parti).add(particle).add(logo);
    mainCtx.setPerspective(1000);

});
