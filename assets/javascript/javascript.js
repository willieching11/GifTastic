$(document).ready(function() {
  var animals = ["tiger", "lion", "elephant"];

  function renderButtons() {
    // Deletes the buttons prior to adding new buttons
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of animals
    for (var i = 0; i < animals.length; i++) {
      // Then dynamicaly generates buttons for each animal in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of animal to our button
      a.addClass("animal");
      // Added a data-attribute
      a.attr("data-name", animals[i]);
      // Provided the initial button text
      a.text(animals[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  $("#buttons-view").on("click", ".animal", function() {
    $("#gifs-appear-here").empty();
    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var animalImage = $("<img>");
          animalImage.addClass("gif");
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          animalImage.attr("data-state", "still");
          $("#gifs-appear-here").append(animalImage);
        }
      });
  });

  $("#gifs-appear-here").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();
    // The animal from the textbox is then added to our array
    animals.push(animal);
    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
  });
  renderButtons();
});