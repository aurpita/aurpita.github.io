(function($){
	$(document).ready(function() {
		$('#submit-form').click(function(e){
		
			e.preventDefault();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var name     = $('#form_name').val(),
				email    = $('#form_email').val(),
				phone    = $('#form_phone').val(),
				date     = $('#form_date').val(),
				message  = $('#form_message').val(),
				data_html,
				success = $('#success');
				
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
            	//text_body = "name=" + name + "&email="+ email + "&message=" + message + "&phone="+ phone + "&date="+ date;
				//data_html = "api_user=aurpita&api_key=$a1yan123$0ur1n&to=aurpita.paul@keyasnailnirvana.com&toname=Aurpita&subject=Request_a_Booking&text=" + text_body + "&from=info@domain.com"
                //alert(data_html);
                $.ajax({
                    type: 'POST',
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
					data: {
						'key': "lfGKJ4jTZBc57-RV4lAxjQ",
						'message': {
						'from_email': email,
						'to': [
						{
						'email': "aurpita.paul@keyasnailnirvana.com",
						'name': 'Aurpita',
						'type': 'to'
						}
						],
						'autotext': 'true',
						'subject': 'Request_a_Booking',
						'html': 'test'
						}
					},
                    success: function(msg){
						
						if (msg == 'sent'){
							alert('Message sent');
                        	success.html('<div class="alert alert-success">Message <strong>successfully</strong> sent!</div>')  ;
                            $('#form_name').val('');
							$('#form_phone').val('');
							$('#form_email').val('');
							$('#form_date').val('');
							$('#form_message').val('');
                        }else{
                        	alert('Message not sent');
                            success.html('<div class="alert alert-error">Message <strong>not</strong> sent! Please Try Again!</div>')  ; 
                        }
                    }
                });
    
            }
            return false;
        });
	});
})(jQuery);