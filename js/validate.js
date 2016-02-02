$(document).ready(function () {
    
     $('#contactform').validate({ // initialize the plugin
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        }
    });

});
