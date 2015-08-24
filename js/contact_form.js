$(document).ready(function(){

  // Initialize Parse with your Parse application & javascript keys
  Parse.initialize("HVFFuvCxSDktNR9plZMsEs7nmcdl8bhGPcbSgNYC", "cSqihbiUK9eAyCp33C2C5ckcxAHLWjIPNYe8xpsh");

  // Setup the form to watch for the submit event
  $('#submit-form').submit(function(e){
    e.preventDefault();

	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var name     = $('#form_name').val(),
		email    = $('#form_email').val(),
		phone    = $('#form_phone').val(),
		date     = $('#form_date').val(),
		message  = $('#form_message').val(),
		data_html,
		success = $('#success'),
		testMessage = $('test-message');
		
	if(name == "")
		$('#form_name').val('Please enter your name.');
		
	if(phone == "")
		$('#form_phone').val('Please enter your phone number.');
		
	if(date == "")
		$('#form_date').val('Please enter a date and time.');

	if(email == ""){
		$('#form_email').val('Your email is required.');
	}else if(reg.test(email) == false){
		$('#form_email').val('Invalid Email Address.');
	}
	
	if(message == "")
		$('#form_message').val('Message is required.');

	if(message != "" && name != "" && reg.test(email) != false) {
		// Grab the elements from the form to make up
		// an object containing name, email and message
		var data = { 
		  name: document.getElementById('form_name').value, 
		  email: document.getElementById('form_email').value,
		  phone: document.getElementById('form_phone').value,
		  date: document.getElementById('form_date').value,
		  message: document.getElementById('form_message').value
		}
		
		// Run our Parse Cloud Code and 
		// pass our 'data' object to it
		Parse.Cloud.run("sendEmail", data, {
		  success: function(object) {
			$('#success').html('<div class="alert alert-success">Message <strong>successfully</strong> sent!</div>').fadeIn('fast');
			$('#form_name').val('Name');
			$('#form_phone').val('Phone');
			$('#form_email').val('Email');
			$('#form_date').val('Date & Time');
			$('#form_message').val('Message');
		  },
	
		  error: function(object, error) {
			console.log(error);
			$('#response').html('Error! Email not sent!').addClass('error').fadeIn('fast');
		  }
		});
    }
  });

});