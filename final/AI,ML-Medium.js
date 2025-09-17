//Question Bank

var questionBank = [
    {
        question: 'Which function is commonly used for loss in regression?',
        option: ['Cross Entropy', 'Binary Loss', 'Mean Squared Error', 'Hinge Loss'],
        answer: 'Mean Squared Error'
    },
    {
        question: 'Which is a feature selection technique?',
        option: ['SMOTE', 'Chi-Square Test', 'T-SNE', 'Adam Optimizer'],
        answer: 'Chi-Square Test'
    },
    {
        question: 'Which algorithm is used in recommendation systems?',
        option: ['Apriori', 'Collaborative Filtering', 'Naive Bayes', 'Gradient Boosting'],
        answer: 'Collaborative Filtering'
    },
    {
        question: 'Which is used to prevent overfitting in decision trees?',
        option: ['Boosting', 'Pruning', 'PCA', 'Epochs'],
        answer: 'Pruning'
    },
    {
        question: 'Which ML algorithm works on distance metric?',
        option: ['KNN', 'Random Forest', 'Naive Bayes', 'Logistic Regression'],
        answer: 'KNN'
    },
    {
        question: 'Which concept is used in NLP for word embeddings?',
        option: ['One-hot Encoding', 'Bag of Words', 'Word2Vec', 'SVM'],
        answer: 'Word2Vec'
    },
    {
        question: 'What is the vanishing gradient problem related to?',
        option: ['Overfitting', 'Training Slowdown', 'Deep Neural Networks', 'Clustering'],
        answer: 'Deep Neural Networks'
    },
    {
        question: 'Which is a boosting algorithm?',
        option: ['AdaBoost', 'K-Means', 'DBSCAN', 'PCA'],
        answer: 'AdaBoost'
    },
    {
        question: 'Which is not an activation function?',
        option: ['ReLU', 'Sigmoid', 'Tanh', 'RMSProp'],
        answer: 'RMSProp'
    },
    {
        question: 'Which ML method handles class imbalance?',
        option: ['SMOTE', 'SVM', 'PCA', 'T-SNE'],
        answer: 'SMOTE'
    },
    {
        question: 'Which one is a hyperparameter in ML models?',
        option: ['Weights', 'Bias', 'Learning Rate', 'Output'],
        answer: 'Learning Rate'
    },
    {
        question: 'What is bagging in ML?',
        option: ['Data Cleaning', 'Combining weak learners', 'Feature Engineering', 'Clustering technique'],
        answer: 'Combining weak learners'
    },
    {
        question: 'What is the output of a sigmoid function?',
        option: ['Any real number', '0 or 1', 'Between -1 and 1', 'Between 0 and 1'],
        answer: 'Between 0 and 1'
    },
    {
        question: 'Which of these is used in deep learning?',
        option: ['SVM', 'CNN', 'KNN', 'Naive Bayes'],
        answer: 'CNN'
    },
    {
        question: 'Which metric is used in regression?',
        option: ['F1 Score', 'Precision', 'Recall', 'R-squared'],
        answer: 'R-squared'
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
    window.location.href = "AI,ML-Level.html";
}

// Event Listener
next.addEventListener('click', nextQuestion);

// Initial load
displayQuestion();
