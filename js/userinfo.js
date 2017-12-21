
var usercreateURL = 'http://127.0.0.1:8000/api/usercreate/';
var userloginURL = 'http://127.0.0.1:8000/api/login/';
var csrf_token = '<%= token_value %>';
//login button
$(document).on('click', '#singInButton', function (event){
	username = $('#loginUsername').val();
	const password = $('#loginPass').val();
	var data = {
		username : username,
		password : password,
		CSRF: csrf_token
	};
	$.ajax({
		type: "POST",
		url: userloginURL,
		data: JSON.stringify(data),
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function(msg) {
			console.log(msg)
		},
		error: function(error) {
		console.log(error);
		}
	});
});



//register button
$(document).on('click', '#registerButtonRequest', function (event) {
	var username = $("#username").val();
	var password = $("#password").val();
	var data = {
		username : username,
		password : password,
	};
	console.log(JSON.stringify(data));
	$.ajax({
       type: 'POST',
		dataType: 'json',
       data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
       url: usercreateURL,
       success: function(res){
       		$('#RegisterModal').modal('hide');
		   $('#loginButtonNav').css('display', 'none');
		   $('#UsernamePass').val(username);
		   console.log(res);
       },
       error: function(error) {
           console.log(error);
       }
   });
});



