// Question Bank
var questionBank = [
    {
        question: 'Who is known as the father of the computer?',
        option: ['Steve Jobs', 'Charles Babbage', 'Alan Turing', 'Bill Gates'],
        answer: 'Charles Babbage'
    },
    {
        question: 'What company created the first iPhone?',
        option: ['Google', 'Microsoft', 'Apple', 'Nokia'],
        answer: 'Apple'
    },
    {
        question: 'Which company is famous for the Windows operating system?',
        option: ['Apple', 'Microsoft', 'IBM', 'Intel'],
        answer: 'Microsoft'
    },
    {
        question: 'What does CPU stand for?',
        option: ['Central Performance Unit', 'Central Processing Unit', 'Computer Power Unit', 'Core Processing Unit'],
        answer: 'Central Processing Unit'
    },
    {
        question: 'Which search engine is owned by Google?',
        option: ['Bing', 'Yahoo', 'DuckDuckGo', 'Google Search'],
        answer: 'Google Search'
    },
    {
        question: 'Who founded Microsoft?',
        option: ['Steve Jobs', 'Mark Zuckerberg', 'Bill Gates', 'Elon Musk'],
        answer: 'Bill Gates'
    },
    {
        question: 'What year was Google founded?',
        option: ['2000', '1998', '2001', '1995'],
        answer: '1998'
    },
    {
        question: 'Which app is mainly used for video meetings?',
        option: ['Instagram', 'Zoom', 'WhatsApp', 'Spotify'],
        answer: 'Zoom'
    },
    {
        question: 'What does \'www\' stand for in website URLs?',
        option: ['Web World Wave', 'World Wide Web', 'World Web Wide', 'Web Wireless Web'],
        answer: 'World Wide Web'
    },
    {
        question: 'What symbol is used in email addresses?',
        option: ['#', '%', '@', '$'],
        answer: '@'
    },
];

// DOM Elements
var question = document.getElementById('question');
var quizContainer = document.getElementById('quiz-container');
var scoreboard = document.getElementById('scoreboard');
var option0 = document.getElementById('option0');
var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');
var next = document.querySelector('.next');
var points = document.getElementById('score');
var span = document.querySelectorAll('span');
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
    question.innerHTML = 'Q.' + (i + 1) + ' ' + questionBank[i].question;
    option0.innerHTML = questionBank[i].option[0];
    option1.innerHTML = questionBank[i].option[1];
    option2.innerHTML = questionBank[i].option[2];
    option3.innerHTML = questionBank[i].option[3];
    document.getElementById("stat").innerHTML = "Question " + (i + 1) + " of " + questionBank.length;
    answered = false;
    startTimer(10);
}

// Reset Options for new question
function resetOptions() {
    options.forEach(opt => {
        opt.parentElement.style.background = 'lightblue';
        opt.style.background = 'transparent';
        opt.style.color = 'black';
        opt.style.pointerEvents = 'auto';
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
    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (selected === correct) {
        e.style.background = 'limegreen';
        score++;
    } else {
        e.style.background = 'tomato';
        // Show correct answer
        options.forEach(opt => {
            if (opt.innerHTML === correct) {
                opt.style.background = 'limegreen';
            }
        });
    }
}

// Start Timer
function startTimer(t) {
    clearInterval(counter);
    time = t;
    timeCount.textContent = t < 10 ? '0' + t : t;
    timeText.textContent = 'Time left :';

    counter = setInterval(() => {
        time--;
        timeCount.textContent = time < 10 ? '0' + time : time;

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
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt.innerHTML === questionBank[i].answer) {
            opt.style.background = 'limegreen';
        }
    });
}

// Show next question
function nextQuestion() {
    if (i < questionBank.length - 1) {
        i++;
        displayQuestion();
    } else {
        quizContainer.style.display = 'none';
        scoreboard.style.display = 'block';
        points.innerHTML = score + '/' + questionBank.length;
    }
}

// Check Answers button
function checkAnswer() {
    clearInterval(counter);
    var answerBank = document.getElementById('answerBank');
    var answers = document.getElementById('answers');
    answerBank.style.display = 'block';
    scoreboard.style.display = 'none';

    answers.innerHTML = "";
    questionBank.forEach(q => {
        var list = document.createElement('li');
        list.innerHTML = q.answer;
        answers.appendChild(list);
    });
}

// Back to quiz (reload)
function backToQuiz() {
    window.location.href = "TC&H-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
