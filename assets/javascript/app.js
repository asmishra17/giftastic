$(document).ready(function() {
// global variables
var topics = ["crying kim", "kermit", "crying jordan", "salt bae", "sips tea", "hair flip", "like a boss", "asahd"]
var meme;

// creating buttons for topics array
for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.text(topics[i]);
    button.attr("data-meme", topics[i]);
    $("#memeButtons").append(button);
}

// event listener for meme buttons
$("#memeButtons").on("click", "button", function() {
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
        // creating a paragraph tag with the result item's rating
        var rating = $("<p>").text("Rating: " + results[i].rating);
        // creating and storing an image tag
        var memeImage = $("<img>");
        // setting the src attribute of the image to a property pulled off the result item
        memeImage.attr("src", results[i].images.fixed_height.url);
        // appending the paragraph and image tag to the memeDiv
        memeDiv.append(rating);
        memeDiv.append(memeImage);
        
        // appending the memeDiv to the HTML page
        $("#gifsHere").append(memeDiv);
        }
        
    })
})



  
});
