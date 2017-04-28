
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
            // strokeWidth: 2,
            fill: 'transparent',
            height: 250,
            width: 300, // Changed the size of the state so that it fits better in the canvas. This ties with the scaling X and Y
            selectable: false,
            scaleX: 1.5,
            scaleY: 1.5 // Increasing the size of the state image so it is easier for the user to fit their image into the shape of the state.\
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

    document.getElementById('UploadImage').onchange = function handleImage(e) {

      if (userImage.height > 0) {

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
        }
        else {
          window.open(canvas.toDataURL('png'));
        }
      },

      ReCenter: function() {

        canvas.centerObject(userImage);

      },


      // The below function is used for testing
      clear: function() {
        canvas.clear(userImage);
      }
    };

    $("#toolbar").children().click(function(e) {
      e.preventDefault();
      //call the relevant function
      tools[this.id].call(this);
    });

  })(jQuery);
