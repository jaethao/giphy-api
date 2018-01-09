$(function(){
  populateButtons(topics,'searchButton','#button-holder');
});

var topics = ['elephant', 'parrot', 'bear', 'tiger'];

function populateButtons(topics, classToAdd, areaToAdd){
  $(areaToAdd).empty();
  for(var i = 0;i<topics.length;i++){
    var a = $('<button type="button" class="btn btn-info">');
    a.addClass(classToAdd);
    a.attr('data-type', topics[i]);
    a.text(topics[i]);
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
    for(var i =0;i<response.data.length;i++){
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

$(document).on('click','.searchImage', function(){
  var state = $(this).attr('data-state');
  if(state == 'still'){
    $(this).attr('src',$(this).data('animated'));
    $(this).attr('data-state','animated');
  } else {
    $(this).attr('src',$(this).data('still'));
    $(this).attr('data-state','still');
  }
})

$('#addSearch').on('click', function(){
  var newSearch = $('input').eq(0).val();
  topics.push(newSearch);
  populateButtons(topics,'searchButton','#button-holder');
  return false;
  $('#search-input').empty();
})

$(document).on('click','#clear', function(){
  $('#gifs').empty();
  $('#button-holder').empty();
})
