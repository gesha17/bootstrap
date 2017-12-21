var username = "Anonymous";
var postcommentURL = "http://127.0.0.1:8000/api/comment/create";
//Image click popup
$(document).on('click', '.card-img-top', function (event){
	const recipe = $(event.currentTarget).siblings('.recipeClass').html();
	const imageSource = $(event.currentTarget).attr('src');
	$('.modalImage').attr("src", imageSource);
	$('.modalRecipe').html(recipe);
});

//Comment button popup
$(document).on('click', '.cardbutton .btn', function (event) {
	const titleName = $(event.currentTarget).parent().siblings('.card-body').children('.card-title').children().text();
	$('.modal-title').text(titleName);
});

//share button comment Section
$(document).on('click', '#buttonShare', function (event){
	//TODO:add the comments to the local storage
	var cocktailName = $("#CommentSectionTitle").text();
	const comment = $('#commentTyped').val();
	$(event.currentTarget).siblings('#fullComment').children("#commentForm").children('.media-body').children('#userComment').text(comment);
	$(event.currentTarget).siblings('#fullComment').children("#commentForm").children('.media-body').children("#commentUserName").html(username);
	var data = {
		user: 'Anonymous',
		cocktail: cocktailName,
		comment: comment,
	};
	$.ajax({
       type: 'POST',
		dataType: 'json',
       data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
       url: postcommentURL,
       success: function(res){
       		$('#').modal('hide');
		   $('#loginButtonNav').css('display', 'none');
		   $('#UsernamePass').val(username);
		   console.log(res);
       },
       error: function(error) {
           console.log(error);
       }
   });
	var $fullCom = $("#fullComment").clone();
	$fullCom.css('display','block');
	$fullCom.appendTo("#commentSection");
});

