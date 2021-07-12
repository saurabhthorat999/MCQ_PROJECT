profile.addEventListener('mouseenter',()=>{
    
    profile.textContent = "Saurabh Thorat";

})

profile.addEventListener("mouseleave",()=>{
    profile.textContent ='ST'
})

const question=document.getElementById("question")
const choices=Array.from( document.getElementsByClassName("choice-text"));

const questionCounterText=document.getElementById("questionCounter");
const scoreText=document.getElementById("score");

const nextQue=document.getElementById('nextQue');

const mcqChoice=document.getElementById('mcqChoice');

const nextbtn = document.getElementById('nextbtn');
let questionCounter=0;
let currentQuestion={};
let score=0;
let acceptingAnswers=false;
let availableQuestions=[];

const BONUS_SCORE=10;
const MAX_QUESTIONS=5;

let questions=[
   /*  {
        question:"what are the front-end technogies?",
        choice1:"HTML",
        choice2:"CSS",
        choice3:"JAVASCRIPT",
        choice4:"ALL",
        answer:"4"

    },
    {
        
        question:"what are the front-end frameworks?",
        choice1:"React",
        choice2:"Angular",
        choice3:"both a and b",
        choice4:"none",
        answer:"3"

 

    },
    {

        question:"which tage is used to include javascript file in HTML document?",
        choice1:"<script></script>",
        choice2:"<link></link>",
        choice3:"<import>",
        choice4:"<js></js>",
        answer:"1"
 
    }
 */
];

fetch("questions.json")
    .then( res =>{
    return res.json(); 
 })
    .then(loadedQuestions =>{
    questions = loadedQuestions;
    startgame();
})
.catch( err =>{
    console.log(err);
})

startgame = ()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    console.log(availableQuestions)
    getNewQuestion();
}
getNewQuestion=()=>{

    if(questionCounter===5){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign("end.html");

    }
    questionCounter++;
    questionCounterText.innerText=`${questionCounter}/${MAX_QUESTIONS}`;

    let questionIndex=Math.floor(Math.random(1)*availableQuestions.length)
    currentQuestion=availableQuestions[questionIndex]
    console.log(currentQuestion)
    question.innerText=currentQuestion.question;

    choices.forEach(choice =>{
        const number=choice.dataset["number"];
        choice.innerText=currentQuestion["choice"+number]
    });

    availableQuestions.splice(questionIndex,1);
 
    acceptingAnswers=true;
    mcqChoice.innerText=null;
};

choices.forEach(choice =>{
    choice.addEventListener('click',e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice=e.target;
        const selectedAnswer=selectedChoice.dataset["number"];
        console.log(selectedAnswer)

        const checkAnswer= (selectedAnswer==currentQuestion.answer) ? "correct" : "incorrect";

        if(checkAnswer==="correct"){
            incrementScore(BONUS_SCORE);
            
        }
        
        mcqChoice.innerText = selectedAnswer;
        if(!selectedChoice){
            nextbtn.parentElement.classList.add("animate");
        }
        selectedChoice.parentElement.classList.add(checkAnswer);

        

        
      /*   selectedChoice.parentElement.classList.remove(checkAnswer);
         */
         
       // getNewQuestion();     
    });

    
});

function incrementScore(num){
    score+=num;
    scoreText.innerText=score;
}


/* startgame(); */
