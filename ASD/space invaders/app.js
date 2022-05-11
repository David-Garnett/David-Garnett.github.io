const grid = document.querySelector('.grid');// sets grid document query selector to look for gird class
const resultsDisplay = document.querySelector('.results');
let currentShooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let aliensRemoved = [];
let results = 0

for (let i = 0; i < 225; i++) {// for each time it loops
    const square = document.createElement('div');// creates new div element
    grid.appendChild(square);// putting square created into grid
};

const squares = Array.from(document.querySelectorAll('.grid div'));// gets every square in array

const alienInvaders = [ //where each alien is
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

function draw() {// draw alien invaders
    for (let i = 0; i < alienInvaders.length; i++) {// loop sover length of invaders, then add on
        if(!aliensRemoved.includes(i)) {// draws aliensRmoved
            squares[alienInvaders[i]].classList.add('invader');//draws alien invaders
        };
    };
};

draw()

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {// loop sover length of invaders, then add on
        squares[alienInvaders[i]].classList.remove('invader');// removes alien invaders
    };
};

squares[currentShooterIndex].classList.add('shooter')// draws shooter


function moveShooter(e) { //moves the shooter
    squares[currentShooterIndex].classList.remove('shooter')//removes shooter
    switch (e.key) {// switches the key you're pressing
        case 'ArrowLeft':// first case
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1// if current shooter index modulus with width not equal to zero, move current shooter to the left one
            break// breaks function
        case 'ArrowRight':// second case
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;// if current shooter index modulus with width less than width minus one, move current shooter to the right one
            break;// breaks function
    };
    squares[currentShooterIndex].classList.add('shooter');// adds shooter
};
document.addEventListener('keydown', moveShooter);// eveytime the key is pressed down

function moveInvaders() {// moves the invaders
    const leftEdge = alienInvaders[0] % width === 0;// invaders 1st of array modulus width equals 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1;// invaders last of array modulus width equals width minus 1
    remove();// removes invaders

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width +1;// for each alien invader add a width plus 1
            direction = -1// change direction
            goingRight = false; // goes right after goind on down
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width -1;// for each alien invader add a width minus 1
            direction = 1// change direction
            goingRight = true; // goes right after goind on down
        }
    }
    
    for (let i = 0; i < alienInvaders.length; i++) {// for eveytime i = 0, loop over alien invaders length and add on
        alienInvaders[i] += direction;// adds invaders speed by direction
    };

    draw();// draws invader

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) { // If shooter hits invader
        resultsDisplay.innerHTML = 'GAME OVER'; // game is not over
        clearInterval(invadersId); //invader disappears
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > (squares.length)) { // if invaders I is greater than squares length plus the width
            resultsDisplay.innerHTML = 'GAME OVER'; //game is not over
            clearInterval(invadersId); //invader disappears
        }
    }
    if (aliensRemoved.length === alienInvaders.length) { // if length of aliensRemoved === lenght of alien Invaders
        resultsDisplay.innerHTML = 'YOU WIN'; // you win the game
        clearInterval(invadersId); //invader disappears
    }
};
invadersId = setInterval(moveInvaders, 500);// // execute moveInvaders every 500 miliseconds

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser'); // removes laser
        currentLaserIndex -= width; // move up a width
        squares[currentLaserIndex].classList.add('laser'); // adds laser

        if (squares[currentLaserIndex].classList.contains('invader')) { // if laser collides with invader
            squares[currentLaserIndex].classList.remove('laser'); // removes laser
            squares[currentLaserIndex].classList.remove('invaer'); // removes invader
            squares[currentLaserIndex].classList.add('boom'); // add boom

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300) // removes boom after 300 miliseconds
            clearInterval(laserId); // clear interval of laserid
            
            const alienRemoved = alienInvaders.indexOf(currentLaserIndex); // removes invader from alien array
            aliensRemoved.push(alienRemoved); // pushes aliens to be removed
            results++; // results add
            resultsDisplay.innerHTML = results; // displays results
            console.log(aliensRemoved);

        }

    }
    switch(e.key) {
        case 'ArrowUp': // first case
            laserId = setInterval(moveLaser, 100); //move laser by 100 miliseconds
    }
}

document.addEventListener('keydown', shoot);