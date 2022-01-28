// Best Practices----Research Quiz---
// https://www.sitepoint.com/simple-javascript-quiz/

// Questions
var myQuestions = [
  {
    question: "Commonly used data types DO NOT include:_____.",

    answers: {
      1: "strings",
      2: "booleans",
      3: "alerts",
      4: "numbers",
    },
    correctAnswer: 3,
  },
  {
    question:
      "The condition in an IF else statement is enclosed within:_______.",
    answers: {
      1: "quotes",
      2: "curly brackets",
      3: "parenthesis",
      4: "square brackets",
    },
    correctAnswer: 3,
  },
  {
    question: "Arrays in Javascript can be used to store:_________.",
    answers: {
      1: "numbers and strings",
      2: "other arrays",
      3: "booleans",
      4: "all of the above",
    },
    correctAnswer: 4,
  },
  {
    question:
      "String values must be enclosed within:_________ when being assigned to variables.",
    answers: {
      1: "quotes",
      2: "camel case",
      3: "comma",
      4: "question marks",
    },
    correctAnswer: 1,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is :_________?",
    answers: {
      1: "javascript",
      2: "terminal/bash",
      3: "for loops",
      4: "console.log",
    },
    correctAnswer: 4,
  },
];

var startDiv = document.querySelector("#start");
var quizContainer = document.querySelector("#quiz");
var resultsContainer = document.querySelector("#results");
var finalScore = document.querySelector("#finalScore");
var scoreSummary = document.querySelector("#summary");
var submitButton;
var submitInitials = document.querySelector("#submitInitialBtn");
var initialsInput = document.querySelector("#initialInput");
var startButton = document.querySelector("#start-quiz-button");
var timeLeft = document.querySelector("#timeLeft");
var timer = document.querySelector("#timer");
var clearScoresbtn = document.querySelector("#clearHighScoreBtn");
var goBackBtn = document.querySelector("#goBackBtn");
var highscoreContainer = document.querySelector("#listOfHighScores");
var highscoreSection = document.querySelector("#highScoreSection");
var scoresListEl = document.querySelector(".score-list");
var scoresCleared = document.querySelector("#score-cleard");

var viewHighscore = document.querySelector("#viewHighScore");
var slides;
var currentSlide = 0;
var numCorrect = 0;
var calcScore;
var scoreIdCounter = 1;
var scores = [];
var counter;
var timeValue;

// Start the Quiz
function startQuiz() {
  startTimer(60);

  startDiv.style.display = "none";

  buildQuiz();

  slides = document.querySelectorAll(".slide");

  showSlide(currentSlide);

  submitButton = document.querySelectorAll(".submit");

  submitButton.forEach(function (elem) {
    elem.addEventListener("click", function (e) {
      var correct = checkAnswer(elem);
      showNextSlide();
      showResults(correct);
      dropTen(correct);
    });
  });
}

// Start Timer
function startTimer(time) {
  timeValue = time;
  counter = setInterval(clock, 1000);
  timer.style.display = "block";

  function clock() {
    timeLeft.textContent = timeValue; //changing the value of timeCount with time value
    timeValue--; //decrement the time value

    if (timeValue < 9) {
      //if timer is less than 9
      var addZero = timeLeft.textContent;
      timeLeft.textContent = "0" + addZero; //add a 0 before time value
    }
    if (timeValue <= 0) {
      //if timer is less than 0
      currentSlide = slides.length - 1;
      showSlide(currentSlide);
    }
  }
}

// Stop-Timer  
function stopTimer() {
  clearInterval(counter);
  timeLeft.textContent = "";
  timer.style.display = "none";
  timesUp.style.display = "block";
}

// Drop 10 sec for every incorrect answer
function dropTen(correct) {
  if (!correct) {
    timeValue = timeValue - 10;
  }
}

function buildQuiz() {

  quizContainer.style.display = "block";

  // variable to store the HTML output
  var output = [];

  myQuestions.forEach((currentQuestion) => {
    // variable to store the list of possible answers
    var answers = [];

    // and for each available answer...
    for (number in currentQuestion.answers) {
      answers.push(
        `<p>
          <button name="question${number}" value="${number}" class="submit btn btn-quiz">
            ${number} .
            ${currentQuestion.answers[number]}            
          </button>
        </p>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="slide">
        <p class="questionTitle fw-bold pl-4 pt-4 justify-content-center">${currentQuestion.question
      }</p>
        <div class="answers pl-5 pt-2 pb-3 m-2 justify-content-center"> ${answers.join(
        ""
      )} </div>
      </div>`
    );
  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
}

// Show the next question
function showSlide(n) {
  if (currentSlide === slides.length - 1) {
    quizContainer.style.display = "none";

    calcScore = numCorrect * 20;

    finalScore.textContent = calcScore;

    scoreSummary.style.display = "block";

    stopTimer();
  } else {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
  }
}

// On to the next one
function showNextSlide() {
  showSlide(currentSlide + 1);
}

// Check every answer(Is the answer correct)
function checkAnswer(elem) {
  var correct;
  // gather answer containers from our quiz
  var currentQuestion = myQuestions[currentSlide];
  // find selected answer
  var userAnswer = parseInt(elem.value);

  // if answer is correct
  if (userAnswer === currentQuestion.correctAnswer) {
    // add to the number of correct answers
    numCorrect++;
    correct = true;
  } else {
    correct = false;
  }
  return correct;
}

function showResults(correct) {
  var results;

  resultsContainer.style.display = "block";

  if (correct) {
    results = `<hr />
    <p class="text-muted">
      <i>Correct!</i>
    </p>`;
  } else {
    results = `<hr />
    <p class="text-muted">
      <i>Wrong!</i>
    </p>`;
  }

  resultsContainer.innerHTML = results;
}


// New Quiz Generate
function newQuiz() {
  timer.style.display = "block";
  timesUp.style.display = "none";
  highscoreSection.style.display = "none";
  scoresCleared.style.display = "none";
  startDiv.style.display = "block";
  currentSlide = 0;
  numCorrect = 0;
  calcScore = 0;
}

// Load empty Array or Get Scores
function loadScores() {
  scores = JSON.parse(localStorage.getItem("scores"));
  if (!scores) {
    scores = []
  }
}

// Stores Highscores in local storage
function storeHighscore() {
  var initials = initialsInput.value;

  // Check if inputs are empty (validate)
  if (!initials) {
    alert("You need to add your initials");
    return false;
  }

  initialsInput.value = "";

  var scoreDataObj = {
    initials: initials,
    score: calcScore,
  };

  // Save score and push it to scores array
  scoreDataObj.id = scores.length + 1;

  scores.push(scoreDataObj);
  // save scores to localStorage
  localStorage.setItem("scores", JSON.stringify(scores));

  showHighscores();
}

// Create Scores 
function createScoreElement(scoreDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "score-item";

  listItemEl.innerHTML =
    "<p>" +
    scoreDataObj.id +
    ". " +
    scoreDataObj.initials +
    " - " +
    scoreDataObj.score +
    "</p>";

  scoresListEl.append(listItemEl);
}


// Show Highscores 
function showHighscores() {
  var savedScores = localStorage.getItem("scores");

  if (!savedScores) {
    alert("There are no scores available yet!");
    return false;
  }

  //displays
  resultsContainer.style.display = "none";
  scoreSummary.style.display = "none";
  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  highscoreSection.style.display = "block";

  scoresListEl.innerHTML = "";

  savedScores = JSON.parse(savedScores);
  // loop through savedScores array
  for (var i = 0; i < savedScores.length; i++) {
    // pass each task object into the `createScoresEl()` function
    createScoreElement(savedScores[i]);
  }
}

// Clear Highscores from Storage
clearHighScoreBtn.addEventListener("click", function () {
  localStorage.removeItem("scores");
  scores = [];
  scoresListEl.innerHTML = "";
  scoresCleared.style.display = "block";
});

loadScores();

viewHighscore.addEventListener("click", showHighscores);
submitInitials.addEventListener("click", storeHighscore);
startButton.addEventListener("click", startQuiz);
goBackBtn.addEventListener("click", newQuiz);
