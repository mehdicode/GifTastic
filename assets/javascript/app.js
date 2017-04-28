        var animals = ["Hamster", "Raccoon", "Dog", "Sheep", "Elephent", "Whale", "Dolphin", "Koala"];

        function createButtons() {

            $(".animal").empty();
            for (var i = 0; i < animals.length; i++) {
                var li = $("<li>");
                var a = $("<a>");
                a.addClass("animal");
                a.attr("data-name", animals[i]);
                a.text(animals[i]);
                li.html(a);
                $(".sidebar-brand").append(li);

            }

        };

        $("#add-btn").on("click", function(event) {

            event.preventDefault();
            var newAnimal = $("#animal-input").val().trim();
            animals.push(newAnimal);
            createButtons();

        });


        function viewGIF() {
            $("#imgCol").css("background", "rgba(0, 0, 255, 0.6)")
            $(gifHere).empty();

            var gifTitle = $(this).attr("data-name");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifTitle + "&api_key=dc6zaTOxFJmzC";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                for (var i = 0; i < response.data.length; i++) {
                    var rate = response.data[i].rating;
                    var gifRating = $("<p>")
                        .addClass("ratingFont")
                        .text(rate);

                    var gifDiv = $("<div>")
                        .addClass("gifRateBox");

                    var gifImageContainer = $("<div>")
                        .addClass("imageContainer");

                    var gifImage = $("<img>")


                        .attr("src", response.data[i].images.fixed_height_still.url)

                        .data("animate", response.data[i].images.fixed_height.url)

                        .data("still", response.data[i].images.fixed_height_still.url)

                        .attr("data-state", "still");



                    gifImageContainer.append(gifImage);
                    gifImageContainer.append(gifRating);
                    gifDiv.append(gifImageContainer);

                    $("#gifHere").prepend(gifDiv);

                }


                $("#gifHere img").on("click", function() {
                    var status = $(this).attr("data-state");

                    if (status == "still") {

                        $(this).attr("src", $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });

            });

        };

        $("#gifHere img").on("click", function() {
            var status = $(this).attr("data-state");

            if (status == "still") {

                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        });

        $(document).on("click", ".animal", viewGIF);


        createButtons();