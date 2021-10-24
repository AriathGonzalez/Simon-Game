var gamePattern = [];       // Game Pattern user needs to follow
var userClickPattern = [];      // Pattern of clicks by user
var buttonColors = ["red", "blue", "yellow", "green"];
var toggle = false;     // Detects if game has started once already
var level = 0;      // First Level

// Game Sequence
function nextSequence (){
    userClickPattern = [];      // Reset userClickPattern for next sequence
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    // Change title to level number
    level++;    // Increase level for each iteration
    $("#level-title").html("Level " + level);

    gamePattern.push (randomChosenColor);
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

// Detecting when buttons are pressed
$(".btn").click(function(){
    userChosenColor = this.id;
    userClickPattern.push(userChosenColor); // Adding user chosen color to the end of the pattern

    playSound (userChosenColor); // Play sound for button click
    animatePress (userChosenColor); // Adds animation to button clicked

    // Check if click is Correct based on game pattern
    checkAnswer(userClickPattern.length-1)
});

// Function that will play sound
// corresponding to name inputted
function playSound (name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function that adds an animation to the button clicked by user
function animatePress (currentColor){
    $('#' + currentColor).addClass("pressed");

    // Removes class .pressed after a delay of 100 milliseconds
    setTimeout(function() {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

// Function that will check the users clicks against
// the actual game pattern
function checkAnswer (currentLevel){
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
        // If userClickPattern length is the same as gamePattern length, then sequence is done
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    // If user click is wrong
    else {
        // Add wrong audio
        var wrong = new Audio ("sounds/wrong.mp3");
        wrong.play();

        // Change screen
        $("body").addClass("game-over");
        
        // Remove class after a delay
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").html("Game Over, Press Any Key to Restart")

        $(document).keydown(function(){
            startOver ();
        });

    }

}

// Function to reset game
function startOver () {
    // Reset variables
    userClickPattern = [];
    gamePattern = [];
    toggle = false;
    level = 0;
    nextSequence();
}
// Press any key to start game
$(document).keydown(function(){
    if (!toggle) {
        nextSequence ();
        toggle = true;
    }
});
