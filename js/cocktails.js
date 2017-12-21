//GET all cocktail's data request
var cocktailURL = 'http://127.0.0.1:8000/api/cocktail/?format=json';
var submitCocktailURL = "http://127.0.0.1:8000/api/cocktail/create";
var currentPage = 'Most Popular';
var dataSet;
const fadeTime = 500;
//Inital load
$.getJSON(cocktailURL,function(data){
    var fadeInTime = 0;
    dataSet = data;
    dataSet.forEach(function (datum){
        if(datum.category === "Most Popular"){
            var $cardTemplate = $("#cocktailTemplate").clone();
            setTimeout(function () {
            }, fadeInTime);
            //set the contents of the card
            $cardTemplate.attr('id', 'newCard');
            $cardTemplate.find("#cardImageTemplate").attr('src', datum.image);
            $cardTemplate.find("#cardTitleTemplate").text(datum.name);
            $cardTemplate.find("#cardDescriptionTemplate").text(datum.description);
            $cardTemplate.find("#cardHardnessTemplate").text(datum.difficulty);
            $cardTemplate.find("#ingredients").text(datum.ingredients);
            $cardTemplate.find("#recipe").text(datum.recipe);
            $cardTemplate.find("#cocktailName").text(datum.name);
            $cardTemplate.appendTo("#cocktailsView");
            setTimeout(function(){
                $cardTemplate.fadeIn(fadeTime).attr('display','flex');
            },fadeInTime);
            fadeInTime +=100;
        }
    });
});


// Switch the views
$(document).on('click', '#buttonShots', function(event){
    currentPage = 'Shots';
	changeView(currentPage);
});

$(document).on('click', '#buttonMostPopular', function(event){
    currentPage = 'Most Popular';
	changeView(currentPage);
});

$(document).on('click', '#buttonSpecials', function(event){
    currentPage = 'Specials';
	changeView(currentPage);
});

//Load the new view
function changeView(category){
    var fadeInTime = 0;
    $("#cocktailsView").children().fadeOut(fadeTime);
    setTimeout(function(){
        $("#cocktailsView").empty();
        dataSet.forEach(function (datum){
            if(datum.category === category){
                var $cardTemplate = $("#cocktailTemplate").clone();
                setTimeout(function () {
                }, fadeInTime);
                //set the contents of the card
                $cardTemplate.attr('id', 'newCard');
                $cardTemplate.find("#cardImageTemplate").attr('src', datum.image);
                $cardTemplate.find("#cardTitleTemplate").text(datum.name);
                $cardTemplate.find("#cardDescriptionTemplate").text(datum.description);
                $cardTemplate.find("#cardHardnessTemplate").text(datum.difficulty);
                $cardTemplate.find("#ingredients").text(datum.ingredients);
                $cardTemplate.find("#recipe").text(datum.recipe);
                $cardTemplate.find("#cocktailName").text(datum.name);
                $cardTemplate.appendTo("#cocktailsView");

                setTimeout(function(){
                    $cardTemplate.fadeIn(fadeTime).attr('display','flex');
                },fadeInTime);
                fadeInTime +=100;
            }
        });
	}, fadeTime);
}

$(document).on('click','#buttonSubmit', function(event){
	var name = $("#submitName").val();
	var category = $("#submitCategory").val();
	var ingredients = $("#submitIngredients").val();
	var recipe = $("#submitRecipe").val();
	var image = $("#submitImage").val();
	var description = $("#submitDescription").val();
	var difficulty = $("#submitDifficulty").val();
	var data = {
		name : name,
		category: category,
		ingredients: ingredients,
		recipe: recipe,
		image:image,
		description: description,
		difficulty: difficulty
	};
	$.ajax({
       type: 'POST',
		dataType: 'json',
       data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
       url: submitCocktailURL,
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