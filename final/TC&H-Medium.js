//Question Bank

var questionBank = [
  {
    question: "What year did Facebook launch?",
    option: ["2006", "2004", "2008", "2003"],
    answer: "2004",
  },
  {
    question: "Which computer language was developed first?",
    option: ["C++", "Java", "Fortran", "Python"],
    answer: "Fortran",
  },
  {
    question: "What was the name of the first computer virus?",
    option: ["Creeper", "MyDoom", "Melissa", "Blaster"],
    answer: "Creeper",
  },
  {
    question: "Which company developed the Java programming language?",
    option: ["Oracle", "Microsoft", "Sun Microsystems", "IBM"],
    answer: "Sun Microsystems",
  },
  {
    question: "Which of the following is a markup language?",
    option: ["CSS", "HTML", "Java", "Python"],
    answer: "HTML",
  },
  {
    question: "In what year was the World Wide Web invented?",
    option: ["1989", "1992", "1995", "1985"],
    answer: "1989",
  },
  {
    question: "Who invented the World Wide Web?",
    option: [
      "Bill Gates",
      "Tim Berners-Lee",
      "Steve Wozniak",
      "Linus Torvalds",
    ],
    answer: "Tim Berners-Lee",
  },
  {
    question: "What does HTTP stand for?",
    option: [
      "High Tech Transfer Protocol",
      "HyperText Transfer Protocol",
      "Hyper Transfer Text Path",
      "Host To Text Protocol",
    ],
    answer: "HyperText Transfer Protocol",
  },
  {
    question: "Who developed the Linux operating system?",
    option: [
      "Steve Jobs",
      "Dennis Ritchie",
      "Linus Torvalds",
      "Mark Shuttleworth",
    ],
    answer: "Linus Torvalds",
  },
  {
    question: "Which company created the first graphical web browser?",
    option: ["Microsoft", "Google", "Netscape", "Apple"],
    answer: "Netscape",
  },
  {
    question: "What is the name of Apple's operating system for computers?",
    option: ["iOS", "macOS", "Windows", "Ubuntu"],
    answer: "macOS",
  },
  {
    question: "Which of these is a cloud computing service by Amazon?",
    option: ["Azure", "iCloud", "AWS", "Firebase"],
    answer: "AWS",
  },
  {
    question: "Which of these is NOT a programming paradigm?",
    option: ["Object-Oriented", "Functional", "Procedural", "Modular"],
    answer: "Modular",
  },
  {
    question: "What does 'open-source' mean in software?",
    option: [
      "Paid software",
      "Software without UI",
      "Source code available to public",
      "Software that never updates",
    ],
    answer: "Source code available to public",
  },
  {
    question: "What is Git primarily used for?",
    option: [
      "Project management",
      "Database storage",
      "Version control",
      "Encryption",
    ],
    answer: "Version control",
  },
];

// DOM Elements
var question = document.getElementById("question");
var quizContainer = document.getElementById("quiz-container");
var scoreboard = document.getElementById("scoreboard");
var option0 = document.getElementById("option0");
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var next = document.querySelector(".next");
var points = document.getElementById("score");
var span = document.querySelectorAll("span");
var timeCount = document.querySelector(".timer .time_sec");
var timeText = document.querySelector(".timer .time_left");

var i = 0;
var score = 0;
var counter;
var time = 10;
var options = [option0, option1, option2, option3];
var answered = false;

// Display Question
function displayQuestion() {
  resetOptions();
  question.innerHTML = "Q." + (i + 1) + " " + questionBank[i].question;
  option0.innerHTML = questionBank[i].option[0];
  option1.innerHTML = questionBank[i].option[1];
  option2.innerHTML = questionBank[i].option[2];
  option3.innerHTML = questionBank[i].option[3];
  document.getElementById("stat").innerHTML =
    "Question " + (i + 1) + " of " + questionBank.length;
  answered = false;
  startTimer(10);
}

// Reset Options for new question
function resetOptions() {
  options.forEach((opt) => {
    opt.parentElement.style.background = "lightblue";
    opt.style.background = "transparent";
    opt.style.color = "black";
    opt.style.pointerEvents = "auto";
  });
}

// Answer clicked
function calcScore(e) {
  if (answered) return; // prevent multiple clicks
  answered = true;
  clearInterval(counter);

  let selected = e.innerHTML;
  let correct = questionBank[i].answer;

  // Disable clicking after one attempt
  options.forEach((opt) => (opt.style.pointerEvents = "none"));

  if (selected === correct) {
    e.style.background = "limegreen";
    score++;
  } else {
    e.style.background = "tomato";
    // Show correct answer
    options.forEach((opt) => {
      if (opt.innerHTML === correct) {
        opt.style.background = "limegreen";
      }
    });
  }
}

// Start Timer
function startTimer(t) {
  clearInterval(counter);
  time = t;
  timeCount.textContent = t < 10 ? "0" + t : t;
  timeText.textContent = "Time left :";

  counter = setInterval(() => {
    time--;
    timeCount.textContent = time < 10 ? "0" + time : time;

    if (time <= 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off :";
      autoShowAnswer();
    }
  }, 1000);
}

// Time ends - auto show correct answer
function autoShowAnswer() {
  answered = true;
  options.forEach((opt) => {
    opt.style.pointerEvents = "none";
    if (opt.innerHTML === questionBank[i].answer) {
      opt.style.background = "limegreen";
    }
  });
}

// Show next question
function nextQuestion() {
  if (i < questionBank.length - 1) {
    i++;
    displayQuestion();
  } else {
    quizContainer.style.display = "none";
    scoreboard.style.display = "block";
    points.innerHTML = score + "/" + questionBank.length;
  }
}

// Check Answers button
function checkAnswer() {
  clearInterval(counter);
  var answerBank = document.getElementById("answerBank");
  var answers = document.getElementById("answers");
  answerBank.style.display = "block";
  scoreboard.style.display = "none";

  answers.innerHTML = "";
  questionBank.forEach((q) => {
    var list = document.createElement("li");
    list.innerHTML = q.answer;
    answers.appendChild(list);
  });
}

// Back to quiz (reload)
function backToQuiz() {
  window.location.href = "TC&H-Level.html";
}

// Event Listener
next.addEventListener("click", nextQuestion);

// Initial load
displayQuestion();
