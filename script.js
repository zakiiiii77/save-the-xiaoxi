// Manage team progress in localStorage
function getTeamProgress(){
    let cp = localStorage.getItem('currentCheckpoint');
    if(!cp) cp = 1;
    return parseInt(cp);
}

function advanceCheckpoint(){
    let cp = getTeamProgress();
    localStorage.setItem('currentCheckpoint', cp + 1);
}

let totalSeconds = 5 * 60; // 5 minutes per checkpoint
const timerEl = document.getElementById('timer');

const timerInterval = setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    totalSeconds--;
    if(totalSeconds < 0){
        clearInterval(timerInterval);
        alert("Time's up! You failed this checkpoint.");
        // Optional: reset checkpoint or allow retry
        totalSeconds = 5 * 60; 
    }
}, 1000);

const sabotages = [
    "Overdue Essay: wait 30 seconds before next clue.",
    "Lost WiFi: walk silently to next checkpoint.",
    "Pop Quiz Panic: answer a random trivia to continue.",
    "Coffee Spill: swap positions with another team member.",
];

function triggerSabotage() {
    if(Math.random() < 0.3){ // 30% chance per checkpoint
        const s = sabotages[Math.floor(Math.random()*sabotages.length)];
        document.getElementById('sabotage').textContent = `⚠️ Sabotage: ${s}`;
        if(s.includes("wait")){
            setTimeout(()=>{document.getElementById('sabotage').textContent = ''}, 30000);
        }
    } else {
        document.getElementById('sabotage').textContent = '';
    }
}

triggerSabotage();

const correctOrder = [
    "images/piece1.png",
    "images/piece2.png",
    "images/piece3.png",
    "images/piece4.png"
];

document.getElementById('checkPuzzle').addEventListener('click', () => {
    const placedPieces = Array.from(document.querySelectorAll('#puzzle-board .piece')).map(p => p.style.backgroundImage.replace('url("','').replace('")',''));
    let correct = true;
    for(let i=0; i<correctOrder.length; i++){
        if(placedPieces[i] !== correctOrder[i]){
            correct = false;
            break;
        }
    }
    if(correct){
        document.getElementById('message').textContent = "🎉 Congratulations! Xiaoshi is saved!";
    } else {
        document.getElementById('message').textContent = "❌ Puzzle is incorrect. Try again!";
    }
});
