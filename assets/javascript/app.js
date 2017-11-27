//-----------------------Jeopardy-like Trivia Game -------------------------------------------------------------------
$(document).ready(function () {

    var y = document.getElementById("introAudio");
    y.play();


    // --------------------Global array to hold question objects--------------------------------------------------------
    var trivia = [{

            question: "Shinto is the indigenous religious belief and practice of this country",
            answers: ["What is Butan?", "What is Japan?", "What is Pakistan?", "What is Malaysia?"],
            rightAnswer: "What is Japan?",
            quesExtra: "93% of Japanese practice Shintoism, though some also practice Buddhism.",
            container: $("<div>")
        },

        {
            question: "If a dish is described as Florentine, it contains this vegetable",
            answers: ["What is Beans?", "What is Leeks?", "What is Peas?", "What is Spinach?"],
            rightAnswer: "What is Spinach?",
            quesExtra: "Cathering de Medici introduced spinach to the Court of France, and called any dish containing it 'Florentine' to honor her Italian heritage.",
            container: $("<div>")
        },

        {
            question: "This numerical system only uses the characters 0 and 1",
            answers: ["What is Basic?", "What is Binary?", "What is Cardinal?", "What is Hexadecimal?"],
            rightAnswer: "What is Binary?",
            quesExtra: "Binary is the basis of the simple computer; 0 or 1 = On or Off = Yes or No.",
            container: $("<div>")
        },

        {
            question: "This piece of computer hardware was invented by Douglas Engelbart in the USA in 1964",
            answers: ["What is the floppy disk?", "What is the hard disk?", "What is the mouse?", "What is the modem?"],
            rightAnswer: "What is the mouse?",
            quesExtra: "He originally called it an 'X-Y' Position Indicator for a Display System.",
            container: $("<div>")
        },

        {
            question: "This name is given to the Japanese art of paper folding",
            answers: ["What is Bonsai?", "What is Haiku?", "What is Ikebana?", "What is Origami?"],
            rightAnswer: "What is Origami?",
            quesExtra: "Ikebana is flower arranging; haiku is a poem of seventeen syllables.",
            container: $("<div>")
        },

        {
            question: "This new technology was introduced at the Wimbledon Tennis Championships in 1986",
            answers: ["What is Electronic scoreboards?", "What is Hawk-Eye?", "What is Titanium pigment?", "What is Yellow balls?"],
            rightAnswer: "What is Yellow balls?",
            quesExtra: "The idea was to make them more visible for TV cameras.",
            container: $("<div>")
        },

        {
            question: "Blue Mountain Coffee comes from this country",
            answers: ["What is Colombia?", "What is Costa Rica?", "What is Jamaica?", "What is Kenya?"],
            rightAnswer: "What is Jamaica?",
            quesExtra: "Over 80 percent of all Jamaican Blue Mountain Coffee is exported to Japan.",
            container: $("<div>")
        },

        {
            question: "Lines which always have the same distance between them are called this",
            answers: ["What is Convergent?", "What is Equilateral?", "What is Infinite?", "What is Parallel?"],
            rightAnswer: "What is Parallel?",
            quesExtra: "Parallel lines only meet at infinity.",
            container: $("<div>")
        },

        {
            question: "This is the only Portuguese speaking country in the Americas",
            answers: ["What is Argentina?", "What is Brazil?", "What is Guyana?", "What is Peru?"],
            rightAnswer: "What is Brazil?",
            quesExtra: "It is the world's fifth largest country by both geographical area and population.",
            container: $("<div>")
        },

        {
            question: "If cats are feline and dogs are canine, cattle are this",
            answers: ["What is Bovine?", "What is Caprine?", "What is Corvine?", "What is Ovine?"],
            rightAnswer: "What is Bovine?",
            quesExtra: "Goats are caprine, crows are corvine, and sheep are ovine.",
            container: $("<div>")
        },

        {
            question: "Machu Picchu translates to this in English",
            answers: ["What is Hidden Temple?", "What is High Settlement?", "What is Old Peak?", "What is Stone Village?"],
            rightAnswer: "What is Hidden Temple?",
            quesExtra: "Machu Picchu was constructed around 1450, at the height of the Inca Empire.",
            container: $("<div>")
        },

        {
            question: "This gas is the most prevalent in the atmosphere",
            answers: ["What is Oxygen?", "What is Nitrogen?", "What is Carbon Dioxide?", "What is Hydrogen?"],
            rightAnswer: "What is Nitrogen?",
            quesExtra: "About 78% of the air is Nitrogen, 21% Oxygen and 1% other gases.",
            container: $("<div>")
        }

    ];

    //-------Declaring and initialising other global variables---------------------------------------------------

    var currentQuesNum = 0;
    var wrongAnswers = 0;
    var rightAnswers = 0;
    var unanswered = 0;
    var timeLeft = 30;
    var rightAnsMsgs = ["You're a genius!", "Awesome job!", "You got it!", "Well done!", "Brilliant!", "Way to go!"];
    var randomMsg;
    var gameMsgDiv = $("<div class = 'msgDiv'></div");

    var x = document.getElementById("quesAudio");
    var questionTimer;
    //var restartBtn = $("<div class = 'msgDiv'></div");

    //-------Creating function to display a question on the screen-----------------------------------------------
    var displayQuestion = function () {
        y.pause();
        if (currentQuesNum === trivia.length) {
            console.log("Out of questions - Game over");
            // $("#gameArea").empty().append("Game Over");
            finalTally();

        } else {
            questionTimer = setInterval(timerCountdown, 1000);

            var quesHolder = trivia[currentQuesNum].container;
            var quesHeader = $("<div class = 'eachQues'></div>").text(trivia[currentQuesNum].question);
            quesHolder.empty().append(quesHeader);

            for (var i = 0; i < trivia[currentQuesNum].answers.length; i++) {
                var ansBtn = $("<button class = 'ansOption'>" + trivia[currentQuesNum].answers[i] + "</button>").attr("data-ans", trivia[currentQuesNum].answers[i]);
                quesHolder.append(ansBtn);
            }
            $("#gameArea").empty().append(quesHolder);
        }

    };

    var timerCountdown = function () {
        $("#timerArea").html("<h2> You have " + timeLeft + " seconds left </h2>");
        x.play();
        timeLeft--;

        if (timeLeft === -1) {
            clearInterval(questionTimer);
            console.log('TIME UP');
            timeUp();
        };
    };

    // displayQuestion();

    //-------Function to evaluate user selection----------------------------------------------------------------

    var evaluateGuess = function (userGuess) {
        clearInterval(questionTimer);
        $("#timerArea").html("");
        x.pause();

        if (userGuess.attr("data-ans") === trivia[currentQuesNum].rightAnswer) {
            console.log("You chose the right Answer");
            rightAnswers++;
            randomMsg = rightAnsMsgs[Math.floor(Math.random() * rightAnsMsgs.length)];
            gameMsgDiv.empty().append("<h1>" + randomMsg + "</h1>");
            displayRightAnsMsg();
            setTimeout(nextQuestion, 1000 * 5);

        } else {
            console.log("You chose the wrong Answer");
            wrongAnswers++;
            gameMsgDiv.empty().append("<h1> Sorry... that's the wrong answer :-(</h1>");
            displayRightAnsMsg();
            setTimeout(nextQuestion, 1000 * 5);
        }

    };

    //--------Function to advance the game to the next question without user input----------------------------
    var nextQuestion = function () {
        currentQuesNum++;
        timeLeft = 30;
        x.currentTime = 0;
        displayQuestion();
    };

    //--------Function to display right answer after user makes a selection-----------------------------------
    var displayRightAnsMsg = function () {
        gameMsgDiv.append("<h2> The correct answer is: " + trivia[currentQuesNum].rightAnswer + "</h2>");
        gameMsgDiv.append("<h2>" + trivia[currentQuesNum].quesExtra + "</h2>");
        // $("#gameArea").empty().append(gameMsgDiv);
        $("#gameArea").empty().append(gameMsgDiv);

    };

    //--------Function to display msg to user when they run out of time----------------------------------------
    //------- and advance the game to the next question without user input-------------------------------------
    var timeUp = function () {
        gameMsgDiv.empty().append("<h1> You ran out of time! </h1>");
        displayRightAnsMsg();
        setTimeout(nextQuestion, 1000 * 5);
    };

    //--------Function to display tally of user's scores-------------------------------------------------------
    var finalTally = function () {
        gameMsgDiv.empty().append("<h2> All out of questions! </h2>")
        gameMsgDiv.append("<h2> Here's your final tally: </h2>");
        gameMsgDiv.append("<h2> Right answers: " + rightAnswers + "</h2>");
        gameMsgDiv.append("<h2> Wrong answers: " + wrongAnswers + "</h2>");
        gameMsgDiv.append("<h2> Unanswered: " + (trivia.length - rightAnswers - wrongAnswers) + "</h2>");

        $("#gameArea").empty().append(gameMsgDiv);

        setTimeout(showRestartBtn, 1000 * 3);

    };

    //--------Function to display the restart button----------------------------------------------------------
    var showRestartBtn = function () {
        $("#restartBtn").show();
    };


    //--------Function to rest the game from scratch-----------------------------------------------------------
    var reset = function () {
        $("#gameArea").empty();
        currentQuesNum = 0;
        wrongAnswers = 0;
        rightAnswers = 0;
        unanswered = 0;
        timeLeft = 30;
        //setTimeout(displayQuestion, 1000 * 1);
        // displayQuestion();
        $("#restartBtn").hide();
    };

    //==================================GAME CODE==================================================================

    $("#gameArea").on("click", "#startBtn", function () {
        console.log("begin game");
        $(".mainHeader").show();
        displayQuestion();
    });


    $("#gameArea").on("click", ".ansOption", function () {
        console.log("user choice: " + $(this).attr("data-ans"));
        console.log("correct answer: " + trivia[currentQuesNum].rightAnswer);
        evaluateGuess($(this));
    });


    $(".mainContent").on("click", "#restartBtn", function () {
        console.log("time to reset");
        reset();
        setTimeout(displayQuestion, 1000 * 1);
    });


});