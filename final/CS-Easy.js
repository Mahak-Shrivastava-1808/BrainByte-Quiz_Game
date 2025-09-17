//Question Bank

var questionBank = [
    {
        question: 'What does "HTTPS" stand for?',
        option: ['HyperText Transfer Protocol Secure', 'High Transfer Text Protocol System', 'Hyperlink Transfer Protocol Service', 'High Tech Transfer Protocol Secure'],
        answer: 'HyperText Transfer Protocol Secure'
    },
    {
        question: 'Which of these is a strong password?',
        option: ['password123', 'qwerty', 'MyDog$2024!', '123456'],
        answer: 'MyDog$2024!'
    },
    {
        question: 'What is the purpose of a firewall?',
        option: ['Boost internet speed', 'Filter incoming and outgoing network traffic', 'Scan for viruses', 'Store data'],
        answer: 'Filter incoming and outgoing network traffic'
    },
    {
        question: 'Which one is a type of malware?',
        option: ['Trojan', 'Firewall', 'Router', 'VPN'],
        answer: 'Trojan'
    },
    {
        question: 'What is phishing?',
        option: ['A method to catch viruses', 'A hacking tool', 'A fake attempt to steal personal info', 'A backup technique'],
        answer: 'A fake attempt to steal personal info'
    },
    {
        question: 'Which of these is NOT a good cybersecurity practice?',
        option: ['Clicking unknown links', 'Using strong passwords', 'Enabling 2FA', 'Keeping software updated'],
        answer: 'Clicking unknown links'
    },
    {
        question: 'What does a VPN do?',
        option: ['Connects to Wi-Fi', 'Encrypts internet traffic', 'Deletes cookies', 'Scans for malware'],
        answer: 'Encrypts internet traffic'
    },
    {
        question: 'Which one is used to scan for viruses?',
        option: ['Word Processor', 'Antivirus Software', 'Firewall', 'VPN'],
        answer: 'Antivirus Software'
    },
    {
        question: 'What is 2FA?',
        option: ['Second Fast Access', 'Two-Factor Authentication', 'Two-Frequency Alarm', 'Triple File Access'],
        answer: 'Two-Factor Authentication'
    },
    {
        question: 'Which of these is a safe browsing practice?',
        option: ['Using incognito for banking', 'Clicking on ads', 'Avoiding suspicious websites', 'Disabling firewall'],
        answer: 'Avoiding suspicious websites'
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
    window.location.href = "CS-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
