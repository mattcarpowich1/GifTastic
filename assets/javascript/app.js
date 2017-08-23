$(function() {  

  //initial array for names of buttons
  var buttonList = ["dog", "cat", "mouse", "eagle", "octopus", "ostrich", "goose", "snake"];

  //dynamically create buttons from array
  for (var i = 0; i < buttonList.length; i++) {
    var $newButton = $("<button>");

    //give the button a data value with name of item
    $newButton.attr("data-val", buttonList[i]);

    //make the text of the button the name of the item
    $newButton.text(buttonList[i]);

    $("#buttons").append($newButton);

  }

  //when a button is clicked, use ajax to retrieve 10 gifs
  //and append the gifs to the #gifs div
  $("#buttons").on("click", "button", function() {

    $("#gifs").empty();

    //get data from button
    var item = $(this).data("val");

    var api_key = "eb2a08b4e22049ae890ccf2296deab6c";

    //create the query url with the data from button
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=" + api_key + "&limit=10";

    //hit up ajax
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      for (var i = 0; i < 10; i++) {
        console.log(response);
        var gifPausedURL = response.data[i].images.fixed_height_still.url;
        var gifPlayURL = response.data[i].images.fixed_height.url;
        var $gif = $("<img>");
        $gif.addClass("gif");
        $gif.attr("src", gifPausedURL);
        $gif.attr("data-paused", gifPausedURL);
        $gif.attr("data-play", gifPlayURL);
        $gif.attr("alt", item);
        $gif.attr("data-state", "paused");
        $("#gifs").append($gif);
      }

    });


  });

    //when a gif is clicked, play the gif if it is paused, otherwise 
    //if it is already playing, pause it
    $("#gifs").on("click", ".gif", function() {

      console.log($(this).data("state"));

      if ($(this).data("state") === "paused") {
        $(this).attr("src", $(this).data("play"));
        $(this).data("state", "play");
        console.log($(this).data("state"));
      } else if ($(this).data("state") === "play") {
        $(this).attr("src", $(this).data("paused"));
        $(this).data("state", "paused");
      }

    });


    //when form is submitted, add a new button 


});
