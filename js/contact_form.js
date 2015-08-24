  $(document).ready(function(){

  // Initialize Parse with your Parse application & javascript keys
  Parse.initialize("HVFFuvCxSDktNR9plZMsEs7nmcdl8bhGPcbSgNYC", "cSqihbiUK9eAyCp33C2C5ckcxAHLWjIPNYe8xpsh");

  // Setup the form to watch for the submit event
  $('#submit-form').submit(function(e){
    e.preventDefault();

    // Grab the elements from the form to make up
    // an object containing name, email and message
    var data = { 
      name: document.getElementById('form_name').value, 
      email: document.getElementById('form_email').value,
      message: document.getElementById('form_message').value
    }
    
    // Run our Parse Cloud Code and 
    // pass our 'data' object to it
    Parse.Cloud.run("sendEmail", data, {
      success: function(object) {
        $('#success').html('Email sent!').addClass('success').fadeIn('fast');
      },

      error: function(object, error) {
        console.log(error);
        $('#success').html('Error! Email not sent!').addClass('error').fadeIn('fast');
      }
    });
  });

});

});