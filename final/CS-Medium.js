//Question Bank

var questionBank = [
    {
        question: 'What is a brute-force attack?',
        option: ['Phishing method', 'Trying many passwords until one works', 'Malware installation', 'Firewall testing'],
        answer: 'Trying many passwords until one works'
    },
    {
        question: 'Which of the following is an example of multifactor authentication?',
        option: ['Password only', 'Fingerprint only', 'Password + OTP', 'Username only'],
        answer: 'Password + OTP'
    },
    {
        question: 'Which protocol is used to securely send emails?',
        option: ['SMTP', 'POP3', 'IMAP', 'SMTPS'],
        answer: 'SMTPS'
    },
    {
        question: 'What does "ransomware" do?',
        option: ['Deletes your files', 'Locks your data and demands payment', 'Sends spam', 'Increases speed'],
        answer: 'Locks your data and demands payment'
    },
    {
        question: 'What is the use of hashing in cybersecurity?',
        option: ['Encrypt data', 'Store files', 'Verify data integrity', 'Compress data'],
        answer: 'Verify data integrity'
    },
    {
        question: 'Which tool is commonly used for penetration testing?',
        option: ['Photoshop', 'Nmap', 'Excel', 'VLC'],
        answer: 'Nmap'
    },
    {
        question: 'What does SQL Injection target?',
        option: ['Databases', 'Emails', 'Browsers', 'Networks'],
        answer: 'Databases'
    },
    {
        question: 'What does the CIA triad stand for?',
        option: ['Cybersecurity, Internet, Access', 'Confidentiality, Integrity, Availability', 'Connection, Identity, Authentication', 'Cookies, IP, Antivirus'],
        answer: 'Confidentiality, Integrity, Availability'
    },
    {
        question: 'Which of the following is a man-in-the-middle attack?',
        option: ['Attacker intercepts communication', 'Attacker sends emails', 'Attacker creates malware', 'Attacker shuts down server'],
        answer: 'Attacker intercepts communication'
    },
    {
        question: 'Which port does HTTPS use?',
        option: ['80', '22', '443', '21'],
        answer: '443'
    },
    {
        question: 'Which command in Linux shows active network connections?',
        option: ['ls', 'ping', 'netstat', 'cd'],
        answer: 'netstat'
    },
    {
        question: 'What is social engineering in cybersecurity?',
        option: ['Coding virus', 'Manipulating people to reveal info', 'Server hacking', 'Testing firewalls'],
        answer: 'Manipulating people to reveal info'
    },
    {
        question: 'What is the function of a digital certificate?',
        option: ['Track location', 'Encrypt data', 'Verify website identity', 'Scan viruses'],
        answer: 'Verify website identity'
    },
    {
        question: 'What is the term for hiding data inside another file?',
        option: ['Hashing', 'Encryption', 'Steganography', 'Tokenization'],
        answer: 'Steganography'
    },
    {
        question: 'Which tool is used for wireless network cracking?',
        option: ['Burp Suite', 'Wireshark', 'Aircrack-ng', 'Metasploit'],
        answer: 'Aircrack-ng'
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
