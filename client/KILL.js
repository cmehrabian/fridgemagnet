positions = new Meteor.Collection("positions");
var arrayMagnets = new Meteor.Collection("arrayMagnets");

// Meteor.subscribe("positions");

require("famous-polyfills"); // Add polyfills
require("famous/core/famous"); // Add the default css file


Engine = require("famous/core/Engine");
Surface = require("famous/core/Surface");
Transform = require("famous/core/Transform"); // Add transform
StateModifier = require("famous/modifiers/StateModifier"); // Add modifiers
Draggable = require("famous/modifiers/Draggable"); // Add's the built in draggable method
Transitionable = require("famous/transitions/Transitionable");

SnapTransition = require("famous/transitions/SnapTransition");
Transitionable.registerMethod('snap', SnapTransition);

mainContext = Engine.createContext();
// var letter = document.getElementById("textadd").value;

if (Meteor.isClient) {

  // TEST TEST TEST

  Template.hello.positions = function() {
    return positions.find({});
  };


  // Template.hello.positions = function(){
  //   return positions.find();
  // };
  Template.hello.greeting = function () {
    // return "A Metacupcake production";
  };

  // Template.hello.events({
  //   console.log("button");
  //   // 'click button': function () {
  //   // var id = Nodes.insert({text:'hello'});
  //   // var selected = Session.get('selected');
  //   // if(!selected)
  //   //   return;

  //   // Links.insert(
  //   //   {
  //   //     source:Session.get('selected'),
  //   //     target:id 
  //   //   });
  // });

  // This damn box thing
  Template.hello.box = function() {
    //Session.surface
    //et("test", localStorage.getItem("test"));

    var mainContext = Engine.createContext();
    // var letter = document.getElementById("textadd").value;



    var surface = new Surface({
        content: "A",
        size: [100, 100],
        properties: {
            lineHeight: "100px",
            textAlign: "center",
            backgroundColor: 'orange',
            cursor: 'pointer'
        }
    });

    var draggable = new Draggable({
      xRange: [-150, 520],
      yRange: [-150, 520]
    });

    surface.pipe(draggable);

    var mod = new StateModifier( {
      transform: Transform.translate(250, 100, 0)
    });

    var trans = {
      method: 'snap',
      period: 300,
      dampingRatio: 0.3,
      velocity: 0
    };


        surface.on('mouseup', function() {
          console.log(draggable.getPosition());
          //var pos = draggable.getPosition();
          //Positions.update(Session.get('pos'), {$set: {pos:pos}});
          Session.set(draggable.getPosition());
          Session.get(draggable.getPosition());
        });

    mainContext.add(mod).add(draggable).add(surface);
  };
  Template.box.events = {
  };
  Template.hello.events = {
      'click input.text': function() {
        var letter = document.getElementById("textadd").value;
        console.log(letter);
        // arrayMagnets.insert({letter});


        var surface = new Surface({
        content: letter,
        size: [75, 75],
        properties: {
          lineHeight: "100px",
          textAlign: "center",
          backgroundColor: 'orange  ',
          cursor: 'pointer'
        }
      });

        var draggable = new Draggable({
        xRange: [-150, 520],
        yRange: [-150, 520]
      });

      surface.pipe(draggable);

      var mod = new StateModifier( {
      transform: Transform.translate(250, 100, 0)
      });
      var trans = {
        method: 'snap',
        period: 300,
        dampingRatio: 0.3,
        velocity: 0
      };

      surface.on('mouseup', function() {
        
        console.log(draggable.getPosition());
        Session.set(draggable.getPosition());
        Session.get(draggable.getPosition());
    });


      mainContext.add(mod).add(draggable).add(surface);
  }
 };
}

// Start the serve code here 8=D
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
