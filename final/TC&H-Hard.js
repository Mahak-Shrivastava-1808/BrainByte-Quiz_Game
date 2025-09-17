//Question Bank

var questionBank = [
    {
        question: 'What was the name of the first computer programmer?',
        option: ['Charles Babbage', 'Ada Lovelace', 'Grace Hopper', 'Alan Turing'],
        answer: 'Ada Lovelace'
    },
    {
        question: 'What was ENIAC primarily used for?',
        option: ['Word processing', 'Nuclear calculations', 'Emailing', 'Video editing'],
        answer: 'Nuclear calculations'
    },
    {
        question: 'Which programming language was named after a comedy group?',
        option: ['Python', 'Ruby', 'Perl', 'Go'],
        answer: 'Python'
    },
    {
        question: 'Who invented the C programming language?',
        option: ['Brian Kernighan', 'Bjarne Stroustrup', 'Dennis Ritchie', 'Ken Thompson'],
        answer: 'Dennis Ritchie'
    },
    {
        question: 'What is the full form of CAPTCHA?',
        option: [
            'Completely Automated Public Turing test to Tell Computers and Humans Apart',
            'Common Application Protocol for Turing Checks and Human Assessment',
            'Computer Automated Pattern for Text Checking',
            'Certified Algorithm for Pattern Testing'
        ],
        answer: 'Completely Automated Public Turing test to Tell Computers and Humans Apart'
    },
    {
        question: 'What was the name of the first email system?',
        option: ['Mailbox', 'SNDMSG', 'MailApp', 'EPost'],
        answer: 'SNDMSG'
    },
    {
        question: 'What is the name of the first website ever made?',
        option: ['www.google.com', 'info.cern.ch', 'web1.com', 'www.firstweb.org'],
        answer: 'info.cern.ch'
    },
    {
        question: 'What is Moore’s Law related to?',
        option: ['Speed of light', 'CPU cost', 'Doubling of transistors', 'Internet speed'],
        answer: 'Doubling of transistors'
    },
    {
        question: 'Which country invented the first programmable computer?',
        option: ['USA', 'UK', 'Germany', 'Japan'],
        answer: 'Germany'
    },
    {
        question: 'What was the code name for the first version of Windows?',
        option: ['Interface Manager', 'Vision', 'GraphiOS', 'WinCore'],
        answer: 'Interface Manager'
    },
    {
        question: 'What technology is used in Bitcoin?',
        option: ['Cloud Computing', 'Artificial Intelligence', 'Blockchain', 'IoT'],
        answer: 'Blockchain'
    },
    {
        question: 'What was the first smartphone?',
        option: ['iPhone', 'IBM Simon', 'Nokia 3310', 'BlackBerry'],
        answer: 'IBM Simon'
    },
    {
        question: 'Who created the first compiler?',
        option: ['Ada Lovelace', 'Linus Torvalds', 'Grace Hopper', 'Tim Berners-Lee'],
        answer: 'Grace Hopper'
    },
    {
        question: 'Which company made the first microprocessor?',
        option: ['Intel', 'AMD', 'IBM', 'HP'],
        answer: 'Intel'
    },
    {
        question: 'What does DNS stand for?',
        option: ['Direct Network Setup', 'Domain Name System', 'Data Network Switch', 'Dynamic Network Server'],
        answer: 'Domain Name System'
    },
    {
        question: 'What year was Stack Overflow launched?',
        option: ['2005', '2008', '2010', '2006'],
        answer: '2008'
    },
    {
        question: 'What type of language is LISP?',
        option: ['Functional', 'Object-Oriented', 'Procedural', 'Logic'],
        answer: 'Functional'
    },
    {
        question: 'Which Unix command is used to list directory contents?',
        option: ['show', 'dir', 'ls', 'open'],
        answer: 'ls'
    },
    {
        question: 'Which was the first browser with a GUI?',
        option: ['Mosaic', 'Netscape', 'Opera', 'Internet Explorer'],
        answer: 'Mosaic'
    },
    {
        question: 'Which game is considered the first computer game ever made?',
        option: ['Pong', 'Tetris', 'Spacewar!', 'Pac-Man'],
        answer: 'Spacewar!'
    }
]

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
