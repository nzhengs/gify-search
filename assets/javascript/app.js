$(document).ready(function() {
  var topics = ["cat", "dog", "rabbit", "chicken"];
  var apiKey = "dw3fylOS6Pf9y9QaGWwQ4YMUj10A23xw";

  displayButtons(topics);
  setUpTopicClickEvent();

  ///////////////////

  function displayButtons(topics) {
    topics.forEach(function(topic) {
      var btn = $("<button>");
      btn.addClass("topic");
      btn.text(topic);
      $(".topics").append(btn);
    });
  }

  function setUpTopicClickEvent() {
    $(".topic").click(function() {
      var topic = $(this).text();
      getAndDisplayTopicGifs(topic);
    });
  }

  function getAndDisplayTopicGifs(topic) {
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=" +
      apiKey +
      "&q=" +
      topic +
      "&tag=&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var result = response.data;

      displayGifs(result);
    });
  }

  function displayGifs(gifData) {
    gifData.forEach(function(aGifData) {
      var imgDisplay = $("<img>");
      var imgUrl = aGifData.images.fixed_height.url;
      imgDisplay.attr("src", imgUrl);

      var ratingDisplay = $("<p>");
      var rating = aGifData.rating;
      ratingDisplay.text(rating);

      var image = $("<div>");
      image.append(ratingDisplay);
      image.append(imgDisplay);
      $("#gifs").append(image);
    });
  }


});
