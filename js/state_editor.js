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
  // backgroundColor: 'white'
  backgroundColor: 'whitesmoke'
});

// loading the background/overlay image from SVG of the state that was cicked
var statePath;
var groupStates = [];
var overlayState;
fabric.loadSVGFromURL("svg/usa_map.svg", function(objects, options) {
    var stateObjects = new fabric.Group(groupStates);
    stateObjects.set({
      left: 10,
      top: 10,
      width: canvas.width - 10,
      height: canvas.height - 10
    });


    for (var i = 0; i < objects.length; i++) {
      if (stateObjects._objects[i].id == idNameStored) {
        overlayState = stateObjects._objects[i];

        overlayState.set({
          left: 0,
          top: 0,
          stroke: 'black',
          fill: 'transparent',
          height: 250,
          width: 300, // Changed the size of the state so that it fits better in the canvas. This ties with the scaling X and Y
          selectable: false,
          scaleX: 2,
          scaleY: 2 // Increasing the size of the state image so it is easier for the user to fit their image into the shape of the state.\
        })

        canvas.add(overlayState);
        canvas.setOverlayImage(overlayState);
        canvas.controlsAboveOverlay = true;
        statePath = String(stateObjects._objects[i].path); // hoping this will work for clip-path

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
            // 	,clipTo: function (ctx) {
            // 		overlayState.set ({
            // 			// left: -100,
            // 			// top: -100,
            // 			// width: ctx.width,
            // 			// height: ctx.height
            // 		});
            // 	 overlayState.render(ctx);
            //  }
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

        // var userImage = new fabric.Image(imgObj);
        userImage = new fabric.Image(imgObj);
        userImage.set({
          left: 10,
          top: 10,
          width: canvas.width - 10,
          height: canvas.height - 10,
          opacity: 1,
          // 	clipTo: function (ctx) {
          // 		overlayState.set ({
          // 			// left: 10,
          // 			// top: 10,
          // 			// width: canvas.width - 10,
          // 			// height: canvas.height - 10
          // 		});
          // 	 overlayState.render(ctx);
          //  }
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
    // I think we can possibly use clipTo in the save button
    save: function() {
      if (!fabric.Canvas.supports('toDataURL')) {
        alert('This browser doesn\'t provide means to serialize canvas to an image');
      } else {
        //  window.open(canvas.toDataURL('png'));

        window.open(canvas.toDataURL({
          format: 'png',
          multiplier: 2
        }))


      }
    },

    ReCenter: function() {
      canvas.centerObject(userImage);
    },


    // The below function is used for testing
    clear: function() {
      canvas.remove(userImage);
      imageRemoved = true;
    }
  };

  $("#toolbar").children().click(function(e) {
    e.preventDefault();
    //call the relevant function
    tools[this.id].call(this);
  });

})(jQuery);

function changeBorderColor() {

  // if (document.getElementById("borderColor").value == "black") {
  //
  //   overlayState.set({
  //     stroke: 'red'
  //   });
  //   canvas.add(overlayState);
  //   canvas.setOverlayImage(overlayState);
  //   canvas.controlsAboveOverlay = true;
  //
  // }
  // else {
  //
  // }

  if(document.getElementById("borderColor").value == "white"){

    overlayState.set({
      stroke: 'white'
    });
    canvas.add(overlayState);
    canvas.setOverlayImage(overlayState);
    canvas.controlsAboveOverlay = true;

  }
  else {

  }

}
