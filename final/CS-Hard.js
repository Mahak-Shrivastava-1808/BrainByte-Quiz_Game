//Question Bank

var questionBank = [
    {
        question: 'What is the primary purpose of a buffer overflow attack?',
        option: ['Block websites', 'Crash browser', 'Execute arbitrary code', 'Scan ports'],
        answer: 'Execute arbitrary code'
    },
    {
        question: 'Which cybersecurity framework is developed by NIST?',
        option: ['ISO 27001', 'OWASP', 'COBIT', 'Cybersecurity Framework'],
        answer: 'Cybersecurity Framework'
    },
    {
        question: 'Which encryption algorithm is asymmetric?',
        option: ['AES', 'DES', 'RSA', '3DES'],
        answer: 'RSA'
    },
    {
        question: 'In PKI, what is the function of the private key?',
        option: ['Verify identity', 'Encrypt public data', 'Decrypt received data', 'Store backups'],
        answer: 'Decrypt received data'
    },
    {
        question: 'What is lateral movement in a cyber attack?',
        option: ['Moving physically', 'Switching ISPs', 'Moving between systems after access', 'Changing passwords'],
        answer: 'Moving between systems after access'
    },
    {
        question: 'Which attack is used to disrupt DNS resolution?',
        option: ['ARP spoofing', 'DNS poisoning', 'SQL Injection', 'SSL stripping'],
        answer: 'DNS poisoning'
    },
    {
        question: 'What is Kerberos used for?',
        option: ['Network routing', 'Email sending', 'Authentication in networks', 'Firewall configuration'],
        answer: 'Authentication in networks'
    },
    {
        question: 'What is an IDS?',
        option: ['Internet Detection Service', 'Intrusion Detection System', 'Internal Device Security', 'Instant DNS Scan'],
        answer: 'Intrusion Detection System'
    },
    {
        question: 'What is the purpose of salting passwords?',
        option: ['To slow down brute-force attacks', 'To hash faster', 'To encrypt email', 'To block ports'],
        answer: 'To slow down brute-force attacks'
    },
    {
        question: 'Which of these attacks can exploit IoT devices?',
        option: ['Phishing', 'Mirai botnet', 'SQL injection', 'XSS'],
        answer: 'Mirai botnet'
    },
    {
        question: 'Which command captures packets on a network in Linux?',
        option: ['top', 'netstat', 'tcpdump', 'ps'],
        answer: 'tcpdump'
    },
    {
        question: 'What is the function of the DMZ in a network?',
        option: ['Zone for public-facing services', 'Block all traffic', 'Encrypt data', 'Connect to ISP'],
        answer: 'Zone for public-facing services'
    },
    {
        question: 'Which port is used by SSH?',
        option: ['21', '443', '22', '80'],
        answer: '22'
    },
    {
        question: 'What is the primary goal of a red team in cybersecurity?',
        option: ['Defend systems', 'Test and exploit security', 'Scan files', 'Run updates'],
        answer: 'Test and exploit security'
    },
    {
        question: 'What is the OWASP Top 10?',
        option: ['Firewall software', 'List of top antivirus tools', 'Top 10 web vulnerabilities', 'Top 10 encryption tools'],
        answer: 'Top 10 web vulnerabilities'
    },
    {
        question: 'Which technique is used for advanced persistent threats?',
        option: ['Quick attack and exit', 'Long-term undetected infiltration', 'Mass phishing', 'Blocking antivirus'],
        answer: 'Long-term undetected infiltration'
    },
    {
        question: 'What is a rainbow table used for?',
        option: ['Encrypting passwords', 'Hash cracking using precomputed hashes', 'Storing logs', 'Scheduling tasks'],
        answer: 'Hash cracking using precomputed hashes'
    },
    {
        question: 'What kind of attack targets blockchain systems?',
        option: ['51% attack', 'Brute-force', 'Social engineering', 'XSS'],
        answer: '51% attack'
    },
    {
        question: 'What’s the role of a security information and event management (SIEM) system?',
        option: ['Store user credentials', 'Encrypt data', 'Aggregate and analyze security logs', 'Scan barcodes'],
        answer: 'Aggregate and analyze security logs'
    },
    {
        question: 'What is a sandbox in cybersecurity?',
        option: ['Encrypted vault', 'Fake network', 'Isolated test environment for suspicious files', 'Router setting'],
        answer: 'Isolated test environment for suspicious files'
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
