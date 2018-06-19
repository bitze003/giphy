$(document).ready(function () {

    // Initial array of movies
    var topics = ["animals", "video games", "astronomy", "geology", "baking"];
    // Function for dumping the JSON content for each button into the div




    function renderButtons() {
        $("#topics").empty();
        $.each(topics, function (_ ,topicString) { // The function(topicString){} runs for each element in the topics array   
            var button = $('<button>'); // Creates new JQuery representation of a `<button>` tag   
            button.addClass('topicButton'); // Adds the class "topicButton" to the new `<button>`   
            button.text(topicString); // Adds text to button that is the topic (example: animals)   
            $('#topics').append(button); // Adds the newly created button to the screen   

        })
    }

    renderButtons();



    $(document).on('click', '.topicButton', function () {
        // var gifs = $(this).text();
        var gifs = $(this).text();
        // console.log(gifs,"is gifs value");
        // console.log(this);
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=erYAoxUWYN14ZHhcblPetsdA6ykJyYSO&limit=10";
        // console.log(queryUrl);


        $.ajax({
                url: queryUrl,
                method: 'GET'
            })
            .then(function (response) {
                for (var i = 0; i < 10; i++) {
                    var imageDiv = $('<div>');
                    var imageTag = $('<img>');
                    imageTag.attr("data-state", "still");
                    var paragraph = $('<p>');
                    // console.log(response)
                    paragraph.text(response.data[i].rating);
                    imageTag.attr('src', response.data[i].images.fixed_width_still.url);
                    imageTag.attr("data-still", response.data[i].images.fixed_width_still.url);
                    imageTag.attr("data-animate", response.data[i].images.fixed_width.url);
                    imageTag.attr("data-state", "still");
                    imageDiv.prepend(imageTag);
                    imageDiv.prepend(paragraph);
                    $("#allGifs").prepend(imageDiv);
                    console.log(response)

                }
            })
    })


    $(document).on("click", "img", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
            // console.log(this);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
  
    $('#submit').on('click', function () {

        var newTopic = $('#newTopic').val();
        if (newTopic) {        
            topics.push(newTopic);
            renderButtons();

        }


    })
})