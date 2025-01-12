const popupInfo = document.querySelector('.popup-info');
const main = document.querySelector('.main');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const optionList = document.querySelector('.option-list');
const nextBtn = document.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');

document.querySelector('.tryAgain-btn').addEventListener('click',function(){
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);

    headerScore();
})
document.querySelector('.goHome-btn').addEventListener('click',function(){
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);

})
document.querySelector('.start-btn').addEventListener('click',function(){
    popupInfo.classList.add('active');
    main.classList.add('active');                
});
document.querySelector('.exit-btn').addEventListener('click',function(){
    popupInfo.classList.remove('active');
    main.classList.remove('active');
});
document.querySelector('.continue-btn').addEventListener('click',function(){
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
});

nextBtn.onclick = () =>{
    if(questionCount < questions.length - 1){
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
};

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

function showQuestions(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}.${questions[index].question}`;

    const optionTag = `
        <div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>
    `;
    optionList.innerHTML = optionTag;
    const option = document.querySelectorAll('.option');

    for(var i = 0; i < option.length; i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}

function optionSelected(answer){
    const userAnswer = answer.textContent;
    const correctAnswer  = questions[questionCount].answer;
    const allOptons = optionList.children.length;

    if(userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore += 1;
        headerScore()
    }
    else{
        answer.classList.add('incorrect'); 

        for(var i = 0; i < allOptons; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    for(var i = 0; i < allOptons; i++){
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}

function questionCounter(index){
    const questionsTotal = document.querySelector('.questions-total');
    questionsTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');

    let progressStartValue = -1;
    const progressEndValue = Math.round((userScore / questions.length) * 100); // Calculate percentage
    const speed = 20;

    const progress = setInterval(() => {
        progressStartValue++;

        // Update the text and circular progress dynamically
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg,
            rgba(255,255,255, 0.1) ${progressStartValue * 3.6}deg)`;

        if(progressStartValue === progressEndValue){
            clearInterval(progress);
        }
    }, speed);
}