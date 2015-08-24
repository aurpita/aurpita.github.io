Parse.Cloud.define("sendEmail", function(request, response) {
  var sendgrid = require("sendgrid");
  sendgrid.initialize("aurpita", "$a1yan123$0ur1n");
 
  var name = request.params.name;
  var email = request.params.email;
  var message = request.params.message;
 
  SendGrid.sendEmail({
    to: "aurpita.paul@keyasnailnirvana.com",
    from: email,
    fromname: name,
    subject: "Hello from Cloud Code!",
    text: "Using Parse and SendGrid is great!",
    replyto: "reply@example.com (mailto:reply@example.com)"
  }).then(function(httpResponse) {
    console.log(httpResponse);
    response.success("Email sent!");
  },function(httpResponse) {
    console.error(httpResponse);
    response.error("Uh oh, something went wrong");
  });
});
