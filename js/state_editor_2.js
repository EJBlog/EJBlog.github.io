//Changing the control colors from light blue to black
fabric.Object.prototype.set({
  transparentCorners: true,
  borderColor: '#111111',
  cornerColor: '#111111'
});

//get information about the state that the user clicked on the main map page
var stateNameStored = localStorage.getItem('storedStateName');
var idNameStored = localStorage.getItem('storedIdName');

// changing the editor background color
var canvas = new fabric.Canvas('editor', {
  width: $("#editor").width(),
  height: $("#editor").height(),
  // backgroundColor: 'white'
  backgroundColor: 'whitesmoke'
});

// loading the background/overlay image from SVG of the state that was cicked
var statePath;
var groupStates = [];

$("#trim").click(function() {

  var text = new fabric.Text("Test", {
    fontSize: 50,
    fill: "red",
    top: 50,
    left: 50
  });
  canvas.add(text);
  text.globalCompositeOperation = 'source-atop';
  canvas.renderAll();
});


var path = "svg/usa_map.svg";
var overlayState;
fabric.loadSVGFromURL(path, function(objects) {
    var stateObjects = new fabric.PathGroup(objects,
    //stateObjects.set(
      {
      left: 10,
      top: 10,
      //width: 500,
      //height: 500,
    });


//     for (var i = 0; i < objects.length; i++) {
//       if (stateObjects._objects[i].id == idNameStored) {
//         overlayState = stateObjects._objects[i];

//         overlayState.set({
//           left: 0,
//           top: 0,
//           stroke: 'black',
//           fill: 'transparent',
//           selectable: false,
//           scaleX: canvas.height / overlayState.height,
//           scaleY: canvas.width / overlayState.width, // Increasing the size of the state image so it is easier for the user to fit their image into the shape of the state.\
//         })

        canvas.add(stateObjects);
        //canvas.setOverlayImage(overlayState);
        //canvas.controlsAboveOverlay = true;
        //canvas.calcOffset();
        canvas.renderAll();

      }
    }
  },
  function(item, object) {
    object.set('id', item.getAttribute('id'));
    groupStates.push(object);
  });



// uploading user image
var userImage = new fabric.Image();
var imageRemoved = false;
document.getElementById('UploadImage').onchange = function handleImage(e) {

  if (userImage.height > 0 && imageRemoved == false) {

    if (confirm("An image has already been loaded. Did you mean to load a second image?") === true) {
      var reader = new FileReader();
      reader.onload = function(event) {

        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function() {

          userImage = new fabric.Image(imgObj);
          userImage.set({
            left: 10,
            top: 10,
            width: canvas.width - 10,
            height: canvas.height - 10,
            opacity: 1
          });
          canvas.add(userImage);
          userImage.globalCompositeOperation = 'source-atop';
          canvas.renderAll();
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    //end of if for "confirm"

  } else {
    var reader = new FileReader();
    reader.onload = function(event) {

      var imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = function() {

        userImage = new fabric.Image(imgObj);
        userImage.set({
          left: 10,
          top: 10,
          width: canvas.width - 10,
          height: canvas.height - 10,
          opacity: 1,
        });
        canvas.add(userImage);
        userImage.globalCompositeOperation = 'source-atop';
        canvas.renderAll();
      }
    }
    reader.readAsDataURL(e.target.files[0]);
    imageRemoved = false;
  }
};

(function($) {
  // 	toolbar functions
  var tools = {

    //output to <img>
    save: function() {

      if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
      } else {

        window.open(canvas.toDataURL({
          format: 'png'
        }))
      }

      // Below is a way to download the image straight to the users computer without having to right click and save as
      // function downloadCanvas(link, canvasId, filename) {
      //     link.href = document.getElementById(canvasId).toDataURL();
      //     link.download = filename;
      // }
      //
      // document.getElementById('download').addEventListener('click', function() {
      //     downloadCanvas(this, 'canvas', 'test.png');
      // }, false);

    },

    ReCenter: function() {
      canvas.centerObject(userImage);
      canvas.renderAll();
    },


    // The below function is used for testing
    removeImage: function() {
      canvas.remove(userImage);
      imageRemoved = true;
    }
    //,

    // Reset: function() {
    //   canvas.clear();
    //   canvas.set({ backgroundColor: 'whitesmoke'});
    //   canvas.add(overlayState);
    //   canvas.setOverlayImage(overlayState);
    //   canvas.controlsAboveOverlay = true;
    //   canvas.renderAll();
    //   imageRemoved = true;
    // },


    // trim2: function() {
    //   var editedImage = JSON.stringify(canvas);
    //   canvas.clear();
    //   canvas.loadFromJSON(editedImage, canvas.renderAll.bind(canvas), function(o, object) {
    //
    //     object.set({
    //       //stroke:'black',
    //       //fill:'red',
    //       stroke: 'transparent',
    //       fill: 'transparent',
    //       selectable: false,
    //       clipTo: function(ctx) {
    //         overlayState.set({
    //
    //           width: ctx.width,
    //           length: ctx.length,
    //           height: ctx.height,
    //           selectable: false,
    //           scaleX: 2.5,
    //           scaleY: 2.5,
    //           fill: 'transparent',
    //           stroke: 'transparent'
    //           //stroke:'black',
    //           //fill:'blue'
    //
    //         });
    //         canvas.setOverlayImage(object);
    //         canvas.controlsAboveOverlay = true;
    //         overlayState.render(ctx);
    //       }
    //     });
    //
    //     // fabric.log(o, object);
    //     // canvas.remove(object);
    //   });
    //
    //   // window.open(canvas.toDataURL({
    //   //   format: 'png'
    //   // }));
    //
    // }

  };

  $("#toolbar").children().click(function(e) {
    e.preventDefault();
    //call the relevant function
    tools[this.id].call(this);
  });

})(jQuery);



////// THIS IS WHAT WAS CAUSING THE ISSUES - Jake
    // var canvas = new fabric.Canvas('editor', {
    //   width: $("#editor").width(),
    //   height: $("#editor").height()
    // });
    //


// var background;
// fabric.loadSVGFromURL("svg/usa_map.svg", function(objects, options) {
//     var background = new fabric.Group(groupStates);
//     background.set({
//       left: 0,
//       top: 0,
//       width: canvas.height / background.width,
//       height: canvas.width / background.width,
//       selectable: false
//     });
//canvas.add(overlayState);
//canvas.renderAll();
//});






function changeBorderBlack() {

  overlayState.set({
    stroke: 'black'
  });
  canvas.renderAll();

};

function changeBorderWhite() {

  overlayState.set({
    stroke: 'white'
  });
  canvas.renderAll();

};
