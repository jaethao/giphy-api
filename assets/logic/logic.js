// displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayAnimalGif() {

      var animal = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Creates AJAX call for the specific animal button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        console.log(response);

        // make a variable named results and set it equal to response.data
        var results = response.data;

        // for (var i = 0; i < results.length; i++) {
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $('<div class= "item">');

          var rating = results[i].rating;

          var p = $('<p>').text('Rating: ' + rating);
          var animalImage = $('<img>');
          animalImage.attr('src', results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(animalImage);

          $('#gifs').prepend(gifDiv);
        }

      });

    // Function for displaying movie data
    function renderButtons() {

      // Deletes the movies prior to adding new movies
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();
      // Loops through the array of movies
      for (var i = 0; i < animal.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("animal");
        // Added a data-attribute
        a.attr("data-name", animal[i]);
        // Provided the initial button text
        a.text(animal[i]);
        // Added the button to the buttons-view div
        $("#gifs").append(a);
      }
    }

    // This function handles events where the add movie button is clicked
    $("#submit").on("click", function(event) {
      event.preventDefault();
      // This line of code will grab the input from the textbox
      var animal = $("#search").val().trim();

      // The movie from the textbox is then added to our array
      movies.push(animal);

      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
    });

    // Adding click event listeners to all elements with a class of "movie"
    $(document).on("click", ".movie", displayMovieInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
