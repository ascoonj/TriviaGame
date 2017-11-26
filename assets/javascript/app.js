//-----------------------Jeopardy-like Trivia Game --------------------------------
$(document).ready(function() {

// --------------------Global array to hold question objects----------------------- 
var trivia = [{

        question: "Shinto is the indigenous religious belief and practice of this country",
        answers: ["What is Butan?", "What is Japan?", "What is Pakistan?", "What is Malaysia?"],
        rightAnswer: "What is Japan?",
        quesExtra: "93% of Japanese practice Shintoism, though some also practice Buddhism.",
        container: $("<div>")
    },

    {
        question: "This name is given to the Japanese art of paper folding",
        answers: ["What is Bonsai?", "What is Haiku?", "What is Ikebana?", "What is Origami?"],
        rightAnswer: "What is Origami?",
        quesExtra: "Ikebana is flower arranging; haiku is a poem of seventeen syllables",
        container: $("<div>")
    },

    {
        question: "If a dish is described as Florentine, it contains this vegetable.",
        answers: ["What is Beans?", "What is Leeks?", "What is Peas?", "What is Spinach?"],
        rightAnswer: "What is Spinach?",
        quesExtra: "nothing yet.",
        container: $("<div>")
    },

    {
        question: "This numerical system only uses the characters 0 and 1.",
        answers: ["What is Basic?", "What is Binary?", "What is Cardinal?", "What is Hexadecimal?"],
        rightAnswer: "What is Binary?",
        quesExtra: "Binary is the basis of the simple computer; 0 or 1 = On or Off = Yes or No.",
        container: $("<div>")
    },

    {
        question: "This piece of computer hardware was invented by Douglas Engelbart in the USA in 1964",
        answers: ["What is the floppy disk?", "What is the hard disk?", "What is the mouse?", "What is the modem?"],
        rightAnswer: "What is the mouse?",
        quesExtra: "He originally called it an 'X-Y Position Indicator.",
        container: $("<div>")
    }
];

//-------Declaring and initialising other global variables---------------------------------------------------

var currentQuesNum = 0;
var wrongAnswers = 0;
var rightAnswers = 0;
var unanswered = 0;
var rightAnsMsgs = ["You're a genius!", "Awesome job!", "You got it!", "Well done!", "Brilliant!", "Way to go!"];
var randomMsg = rightAnsMsgs[Math.floor(Math.random()*rightAnsMsgs.length)];
var gameMsgDiv = $("<div class = 'msgDiv'></div");
var x = document.getElementById("quesAudio"); 
var timeLeft = 30;
var questionTimer;

//-------Creating function to display a question on the screen-----------------------------------------------
var displayQuestion = function () {
    questionTimer = setInterval(timerCountdown, 1000);

    var quesHolder = trivia[currentQuesNum].container;
    var quesHeader = $("<div class = 'eachQues'></div>").text(trivia[currentQuesNum].question);
    quesHolder.empty().append(quesHeader);

    for (var i = 0; i < trivia[currentQuesNum].answers.length; i++) {
        var ansBtn = $("<button class = 'ansOption'>" + trivia[currentQuesNum].answers[i] + "</button>").attr("data-ans", trivia[currentQuesNum].answers[i]);
        quesHolder.append(ansBtn);
    }
    $("#gameArea").append(quesHolder);
    
   };

var timerCountdown = function () {
    
    $("#timerArea").html("<h2> You have " + timeLeft + " seconds left </h2>");
    x.play();
    timeLeft--;

    if (timeLeft === -1) {
        clearInterval(questionTimer);
        console.log('TIME UP');
        //timeUp();
    };
  };

  displayQuestion();

//-------Function to evaluate user selection------------------------------------------------------------------

var evaluateGuess = function (userGuess) {
    if (userGuess.attr("data-ans") === trivia[currentQuesNum].rightAnswer) { //why is this not true??
        console.log("You chose the right Answer");
        rightAnswers++;
        gameMsgDiv.empty().append("<h1>" + randomMsg + "</h1>");
        displayRightAnsMsg();

        //display right answer message
    } else {
        console.log("You chose the wrong Answer");
        wrongAnswers++;
        gameMsgDiv.empty().append("<h1> Sorry... that's the wrong answer :-(</h1>");
        displayRightAnsMsg();

        //display wrong answer message
    }
    //currentQuesNum++; --- Still to determine the best place to execute this--- a nextQuestion fuction???
};

//-------When the user selects an answer, run the EvaluateGuess function------------------------------------------

$("#gameArea").on("click", ".ansOption", function () {
    clearInterval(questionTimer);
    x.pause();
    console.log("user choice: " + $(this).attr("data-ans"));
    console.log("correct answer: " + trivia[currentQuesNum].rightAnswer);
    evaluateGuess($(this));
});

//--------Function to advance the game to the next question-------------------------------------------------------
var nextQuestion = function() {
    currentQuesNum++;
    displayQuestion();
};

//--------Function to display message when user selects the right answer-------------------------------------------
var displayRightAnsMsg = function() {
    gameMsgDiv.append("<h2> The correct answer is: " + trivia[currentQuesNum].rightAnswer + "</h2>");
    gameMsgDiv.append("<h2>" + trivia[currentQuesNum].quesExtra + "</h2>");
    // $("#gameArea").empty().append(gameMsgDiv);
    $("#gameArea").empty().append(gameMsgDiv);
    
};

});

