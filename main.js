let decision;
let info = [];
let score;
let firstclick = true;
let color;

/**
 * info contains all information from the form
 * info[0] (Number): the time spent in started
 * info[1] (Int): the task number the contributor was on
 * info[2] (String): reason for reporting the problem (NB: from a drop down - is string best way?)
 *      values: long/confusing/interrupted/taski/techi/other
 * info[3] (String): yes/no if explanation give (NB: boolean? also from drop down)
 * info[4] (Number): average time for others to complete test
 * info[5] (Number): average time for others to start next task
 * info[6] (String): yes/no/unrelated if other problem reports exist
 * info[7] (String): many/few/none for number of restarts of the session
 */

function getInfo(){
    info.push(document.getElementById('time').value);
    info.push(document.getElementById('tasknum').value);
    info.push(document.getElementById('reason').value);
    info.push(document.getElementById('explanation').value);
    info.push(document.getElementById('avgtime').value);
    info.push(document.getElementById('avgtasktime').value);
    info.push(document.getElementById('otherPR').value);
    info.push(document.getElementById('restarts').value);
}

// Shows circle in decision colour
submitb.onclick = function(){
    if (!firstclick){
        console.log(1);
        document.getElementById('finalScore').textContent = "Score: ";
        info = [];
    }
    getInfo();
    score = 100;
    calculateScore();
    color = makeDecision();
    console.log(score);
    // add class with color 
    document.getElementById('circ').classList.add(color);
    document.querySelectorAll('.displayDec').forEach(element => {
        element.style.visibility = 'visible';
        });
    document.getElementById('finalScore').textContent += score;
    firstclick = false;
}

// Auto rejects if not in test long enough or still on task 0
function quickCheck(){
    if ((info[0] < 2 && info[0] !== "") || info[1] == 0){
        score = 0;
    }
}

/**
 * Score will be out of 100: chance it is legitimate
 * PRs will start at 100 but have certain values with decrease it
 */
// calculates the score based on values
function calculateScore(){
    
    quickCheck()
    if (score == 0){
        return;
    }
    
    else {
        // time in started
        if (info[0] < 10){
            score -= 10;
        }

        // task number - NB not doing a check for?

        // explanation given
        if (info[3] == "no"){
            score -= 10;
        }

        // average test time for other partcipants
        if (info[4] < info[0]){
            score -= 50;
        }
        
        // average time to task
        if (info[5] < info[1] + 5){
            score -=20;
        }
        else if (info[5] < info[1] + 4){
            score -=10;
        } 

        // other problem reports
        if (info[6] == "unrelated"){
            score -= 10;
        }
        else if (info[6] == "no"){
            score -= 20;
        }

        // other restarts of the test
        if (info[7] == "few"){
            score -= 10;
        }
        else if (info[7] == "none"){
            score -= 20;
        }
    }
}

// fills colour based on score
function makeDecision(){
    switch (true){
        case score > 66:
            return "green";
        case score > 33:
            return "yellow";
        default:
            return "red";
    }
}

