$(document).ready(function() {
  var topics = ["cat", "dog", "rabbit", "chicken"];
  var apiKey = "dw3fylOS6Pf9y9QaGWwQ4YMUj10A23xw";

  displayButtons(topics);
  setUpTopicClickEvent();

  ///////////////////

  function displayButtons(topics) {
    topics.forEach(function(topic) {
      addButton(topic);
    });
  }

  function addButton(topic) {
    var btn = $("<button>");
    btn.addClass("topic");
    btn.text(topic);
    $(".topics").append(btn);
  }

  function setUpTopicClickEvent() {
    $(".topic").click(function() {
      var topic = $(this).text();
      console.log(topic);
      getAndDisplayTopicGifs(topic).then(function() {
        setUpOnClickOnGif();
      });
    });
  }

  function getAndDisplayTopicGifs(topic) {
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=" +
      apiKey +
      "&q=" +
      topic +
      "&tag=&limit=10";

    var promise = $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var result = response.data;
      console.log(result);
      displayGifs(result);
    });
    return promise;
  }

  function displayGifs(gifData) {
    $("#gifs").empty();
    gifData.forEach(function(aGifData) {
      var imgDisplay = $("<img>");
      var imgUrl = aGifData.images.fixed_height.url;
      imgDisplay.attr("src", imgUrl);
      imgDisplay.addClass("gif");

      var dataStill = aGifData.images.fixed_height_still.url;
      console.log(dataStill);
      console.log(imgUrl);
      imgDisplay.attr("data-still", dataStill);
      imgDisplay.attr("data-animate", imgUrl);
      imgDisplay.attr("data-state", "still");

      var ratingDisplay = $("<p>");
      var rating = aGifData.rating;
      ratingDisplay.text(rating);

      var image = $("<div>");
      image.append(ratingDisplay);
      image.append(imgDisplay);
      $("#gifs").append(image);
    });
  }

  function addTopic() {
    var input = $("#add-topic").val();

    if (!topics.includes(input)) {
      topics.push(input);
      addButton(input);
    }
  }
  $("#submit").click(function() {
    addTopic();
  });
});
function setUpOnClickOnGif() {
  $(".gif").click(function pauseStartGif() {
    console.log("Clicked gif");
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
}
