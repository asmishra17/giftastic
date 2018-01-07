$(document).ready(function() {
// global variables
var topics = ["crying kim", "kermit", "crying jordan", "salt bae", "sips tea", "doge", "grumpy cat", "asahd"]
var meme;

// creating buttons for topics array
for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.text(topics[i]);
    button.attr("data-meme", topics[i]);
    $("#memeButtons").append(button);
}

$("#addMeme").on("click", function(event) {
    // preventing the button from trying to submit the form
    event.preventDefault();
    // storing the artist name
    var inputMeme = $("#meme-input").val().trim();

    console.log(inputMeme);
    var newButton = $("<button>");
    newButton.text(inputMeme);
    newButton.attr("data-meme", inputMeme);
    $("#memeButtons").append(newButton); 
  })

// event listener for meme buttons
$("#memeButtons").on("click", "button", function() {
    $("#gifsHere").empty();
    meme = $(this).attr("data-meme");

    // Storing our giphy API URL for random memes
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + meme + "&api_key=zZpHwgeLyNsagu20ptH3a5OTh0gx5742&limit=10";

    // performing an AJAX request with the query URL
    $.ajax ({
        url: queryURL,
        method: "GET"
    })

    // after data comes back from the request
    .done(function(response) {
    console.log(queryURL);
    console.log(response);

    // storing the data from the AJAX request in the results variable
    var results = response.data;

    // looping through each result item
        for (var i = 0; i < results.length; i++) {
        
        // creating and storing a div tag
        var memeDiv = $("<div>");
        memeDiv.addClass("memeDiv");
        // creating a paragraph tag with the result item's rating
        var rating = $("<p>").text("Rating: " + results[i].rating);
        // creating and storing an image tag
        var memeImage = $("<img>");
        memeImage.addClass("gif");
        // setting the src attribute of the image to a property pulled off the result item
        memeImage.attr("src", results[i].images.fixed_height_still.url);
        memeImage.attr("data-still", results[i].images.fixed_height_still.url);
        memeImage.attr("data-animate", results[i].images.fixed_height.url);
        memeImage.attr("data-state", "still")
        //fixed_height.url);
        // appending the paragraph and image tag to the memeDiv
        memeDiv.append(rating);
        memeDiv.append(memeImage);
        
        // appending the memeDiv to the HTML page
        $("#gifsHere").append(memeDiv);
        }

        // click function for gifs 
        $(".gif").on("click", function() {
            console.log("test");
            var state = $(this).attr("data-state");
            if (state === "still") {
                console.log("test");
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                console.log("test");
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
    }) 

    });       
})
})

