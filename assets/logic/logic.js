$(function(){
  populateButtons(searchArray,'searchButton','#button-holder');
});

var searchArray = ['elephant', 'parrot', 'bear', 'tiger'];

function populateButtons(searchArray, classToAdd, areaToAdd){
  $(areaToAdd).empty();
  for(var i = 0;i<searchArray.length;i++){
    var a = $('<button type="button" class="btn btn-info">');
    a.addClass(classToAdd);
    a.attr('data-type', searchArray[i]);
    a.text(searchArray[i]);
    $(areaToAdd).append(a);
  }
}

$(document).on('click','.searchButton',function(){
  var type = $(this).data('type');
  var queryURL = 'http:///api.giphy.com/v1/gifs/search?q='+type+
  '&api_key=X5KyOyApsC3FaBlvx3X5F8wpQxp06YGz&limit=10';
  $.ajax({url:queryURL,method:"GET"})
  .done(function(response){
    console.log(response);
    for(var i = 0;i<response.data.length;i++){
      var searchDiv = $('<div class="search-item">');
      var rating = response.data[i].rating;
      var p = $('<p>').text('Rating: '+rating);
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;
      var image = $('<img>');
      image.attr('src',still);
      image.attr('data-still',still);
      image.attr('data-animated',animated);
      image.attr('data-state','still');
      image.addClass('searchImage');
      searchDiv.append(p);
      searchDiv.append(image);
      $('#gifs').append(searchDiv);
    }
  })
})
