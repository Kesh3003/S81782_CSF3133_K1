const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        answer: "Tokyo"
    },
    {
        question: "Which language is used to structure a web page?",
        options: ["HTML", "Python", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "How many sides does a triangle have?",
        options: ["Two", "Three", "Four", "Five"],
        answer: "Three"
    },
    {
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    },
    {
        question: "What is the chemical formula for water?",
        options: ["CO2", "O2", "H2O", "NaCl"],
        answer: "H2O"
    },
    {
        question: "Which device is used to input text into a computer?",
        options: ["Monitor", "Keyboard", "Speaker", "Printer"],
        answer: "Keyboard"
    }
];

const QUESTION_TIME = 15;

let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = QUESTION_TIME;
let timerInterval = null;
let selectedAnswer = null;
let answerSubmitted = false;

const questionNumber = document.getElementById("question-number");
const timerDisplay = document.getElementById("timer");
const questionElement = document.getElementById("question");
const answerOptions = document.getElementById("answer-options");
const feedback = document.getElementById("feedback");
const startButton = document.getElementById("start-button");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");
const result = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");


function shuffleQuestions(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] =
            [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}


function startQuiz() {
    clearInterval(timerInterval);

    quizQuestions = shuffleQuestions(questions);
    currentQuestionIndex = 0;
    score = 0;

    startButton.disabled = true;
    startButton.textContent = "Quiz Started";

    result.textContent =
        "Good luck! Your score will appear here when you finish.";

    displayQuestion();
    startTimer();
}


function displayQuestion() {
    clearInterval(timerInterval);

    selectedAnswer = null;
    answerSubmitted = false;

    const currentQuestion =
        quizQuestions[currentQuestionIndex];

    questionNumber.textContent =
        `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

    questionElement.textContent = currentQuestion.question;

    answerOptions.innerHTML = "";

    feedback.textContent = "";
    feedback.className = "";

    progressBar.style.width =
        `${(currentQuestionIndex / quizQuestions.length) * 100}%`;

    const shuffledOptions =
        shuffleQuestions(currentQuestion.options);

    shuffledOptions.forEach(option => {

        const optionButton =
            document.createElement("button");

        optionButton.type = "button";
        optionButton.className = "answer-option";
        optionButton.textContent = option;

        optionButton.addEventListener("click", () => {

            if (answerSubmitted) return;

            selectedAnswer = option;

            document.querySelectorAll(".answer-option")
                .forEach(button => {
                    button.classList.remove("selected");
                });

            optionButton.classList.add("selected");

            submitButton.disabled = false;
        });

        answerOptions.appendChild(optionButton);
    });

    submitButton.disabled = true;
    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestionIndex === quizQuestions.length - 1
            ? "Finish Quiz"
            : "Next Question";

    timeLeft = QUESTION_TIME;
    updateTimerDisplay();
}


function startTimer() {
    clearInterval(timerInterval);

    timeLeft = QUESTION_TIME;
    updateTimerDisplay();

    timerInterval = setInterval(() => {

        timeLeft--;

        updateTimerDisplay();

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            if (!answerSubmitted) {
                checkAnswer(true);
            }
        }

    }, 1000);
}


function updateTimerDisplay() {
    timerDisplay.textContent = `Time: ${timeLeft}s`;
}


function checkAnswer(timeExpired = false) {

    if (answerSubmitted) return;

    answerSubmitted = true;

    clearInterval(timerInterval);

    const currentQuestion =
        quizQuestions[currentQuestionIndex];

    const isCorrect =
        selectedAnswer === currentQuestion.answer;

    if (isCorrect) {

        score++;

        feedback.textContent = "Correct! Well done.";
        feedback.className = "feedback-correct";

    } else if (timeExpired) {

        feedback.textContent =
            `Time is up! Correct answer: ${currentQuestion.answer}`;

        feedback.className = "feedback-incorrect";

    } else {

        feedback.textContent =
            `Incorrect. Correct answer: ${currentQuestion.answer}`;

        feedback.className = "feedback-incorrect";
    }

    document.querySelectorAll(".answer-option")
        .forEach(button => {

            button.disabled = true;

            if (button.textContent === currentQuestion.answer) {
                button.classList.add("correct");

            } else if (button.textContent === selectedAnswer) {
                button.classList.add("incorrect");
            }
        });

    submitButton.disabled = true;
    nextButton.disabled = false;
}

function nextQuestion() {

    if (!answerSubmitted) return;

    if (currentQuestionIndex < quizQuestions.length - 1) {

        currentQuestionIndex++;

        displayQuestion();
        startTimer();

    } else {

        finishQuiz();
    }
}

function finishQuiz() {

    clearInterval(timerInterval);

    questionElement.textContent = "Quiz Completed!";

    answerOptions.innerHTML = "";

    feedback.textContent = "";

    questionNumber.textContent = "Final Result";

    timerDisplay.textContent = "Finished";

    progressBar.style.width = "100%";

    result.textContent =
        `Your final score is ${score} out of ${quizQuestions.length}.`;

    submitButton.disabled = true;
    nextButton.disabled = true;

    startButton.disabled = false;
    startButton.textContent = "Play Again";
}

startButton.addEventListener("click", startQuiz);

submitButton.addEventListener("click", () => {
    checkAnswer(false);
});

nextButton.addEventListener("click", nextQuestion);
