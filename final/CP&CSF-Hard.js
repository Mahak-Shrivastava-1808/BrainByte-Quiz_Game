//Question Bank

var questionBank = [
    {
        question: 'What is the time complexity of binary search algorithm?',
        option: ['O(n)', 'O(n^2)', 'O(log n)', 'O(n log n)'],
        answer: 'O(log n)'
    },
    {
        question: 'Which data structure is used in Depth First Search (DFS)?',
        option: ['Queue', 'Stack', 'Heap', 'Array'],
        answer: 'Stack'
    },
    {
        question: 'Which of the following is NOT a stable sorting algorithm?',
        option: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Insertion Sort'],
        answer: 'Quick Sort'
    },
    {
        question: 'Which of these languages uses garbage collection?',
        option: ['C', 'Assembly', 'Java', 'C++'],
        answer: 'Java'
    },
    {
        question: 'Which concept allows multiple methods to have the same name but different parameters?',
        option: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
        answer: 'Polymorphism'
    },
    {
        question: 'What is the worst-case time complexity of Merge Sort?',
        option: ['O(n^2)', 'O(n log n)', 'O(log n)', 'O(n)'],
        answer: 'O(n log n)'
    },
    {
        question: 'What is the maximum number of children a binary tree node can have?',
        option: ['1', '2', '3', '4'],
        answer: '2'
    },
    {
        question: 'Which of the following is used for memory management in C?',
        option: ['int', 'scanf', 'malloc', 'printf'],
        answer: 'malloc'
    },
    {
        question: 'Which data structure is used to implement recursion?',
        option: ['Queue', 'Stack', 'List', 'Heap'],
        answer: 'Stack'
    },
    {
        question: 'Which is NOT a feature of Object Oriented Programming?',
        option: ['Encapsulation', 'Abstraction', 'Compilation', 'Inheritance'],
        answer: 'Compilation'
    },
    {
        question: 'What is a segmentation fault?',
        option: ['Memory leak', 'Null pointer error', 'Accessing memory out of bounds', 'Invalid syntax'],
        answer: 'Accessing memory out of bounds'
    },
    {
        question: 'Which of the following is a divide and conquer algorithm?',
        option: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
        answer: 'Quick Sort'
    },
    {
        question: 'What is the purpose of a virtual function in C++?',
        option: ['Overriding base class method', 'Inheritance only', 'Abstraction only', 'None of these'],
        answer: 'Overriding base class method'
    },
    {
        question: 'Which of these is not a linear data structure?',
        option: ['Array', 'Stack', 'Queue', 'Tree'],
        answer: 'Tree'
    },
    {
        question: 'Which search algorithm is complete and optimal for unweighted graphs?',
        option: ['DFS', 'Greedy Search', 'BFS', 'Best First Search'],
        answer: 'BFS'
    },
    {
        question: 'Which of these best describes dynamic programming?',
        option: ['Divide and Conquer', 'Greedy Method', 'Recursion + Memoization', 'Brute Force'],
        answer: 'Recursion + Memoization'
    },
    {
        question: 'What is the output of 1 << 2 in C?',
        option: ['2', '4', '8', '16'],
        answer: '4'
    },
    {
        question: 'What is the space complexity of DFS?',
        option: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        answer: 'O(n)'
    },
    {
        question: 'Which notation describes the best-case performance of an algorithm?',
        option: ['Big O', 'Big Omega', 'Big Theta', 'Small o'],
        answer: 'Big Omega'
    },
    {
        question: 'What does the keyword "volatile" mean in C?',
        option: ['Read-only', 'Write-only', 'Value can be changed unexpectedly', 'Static variable'],
        answer: 'Value can be changed unexpectedly'
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
    window.location.href = "CP&CSF-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
