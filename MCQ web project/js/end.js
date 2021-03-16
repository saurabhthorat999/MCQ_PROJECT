const username = document.getElementById('username');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalscore= document.getElementById('finalscore');
finalscore.innerText = mostRecentScore;

const saveScorebtn = document.getElementById('saveScorebtn')

username.addEventListener('keyup', () => {
    console.log('saved')
    saveScorebtn.disabled = !username.value;
    
})

const highScores =JSON.parse(localStorage.getItem("highScores")) || [] ;
console.log(highScores);
saveHighScore = (e) =>{
    console.log("Submitted!");
    
    const score = {
        score:mostRecentScore,
        name:username.value
    }
    console.log(score);
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores',JSON.stringify(highScores));
    
    const ok=alert("Submitted Succesfully !!");
   

}



