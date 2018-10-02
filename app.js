// =============================================================
// ============ STARTER FUNCTIONS, DECLARATIONS  ===============
// =============================================================

const buildGrid = (height, width) => {
    maxHeight = height - 1;
    maxWidth = width - 1;
    for(let i=0; i<height; i++){
        // building rows
        $(".grid").append(`<div id='row${i}'></tr`);
        for(let j=0; j<width; j++){
            // building columns in each row
            $(`#row${i}`).append(`<div class="cell" id='row${i}column${j}'></td>`);
            $(`#row${i}column${j}`).append("<div class='holder'></div>")
            // $(`#row${i}column${j} div`).text(`TEST`)
        }
    }
    // height = number of rows
    // width = number of columns per row
}

const imageFill = () => {
    $(".coin").append("<img src='img/coin.png'>");
    $(".enemy").append("<img class='skelly' src='img/skeleton'>");
    $(".wall").append("<img src='img/wall.png'>");
    $(".breakable-wall").append("<img src='img/broken-wall.png'>");
    $(".escape").append("<img src='img/door.png'>");
}

// ====================
// INITIAL DECLARATIONS
// ====================

let maxHeight;
let maxWidth;

let score = 0;
let level = 1;
let enemiesKilled = 0;
let escapePosition;
let newPosition;

// ============
// UNUSED TIMER
// ============

// $("body").append(`<div class='score'>${score}</div>`)
// let timer = 20;
// $(".timer h2").html(`${timer}`);


// =============================================================
// ====================== MAKE HERO  ===========================
// =============================================================


const hero = {
    x: 0,
    y: 0,
    direction: "right",
    attack(){
        let swordLocation = `#row${this.y}column${this.x} .holder`;
        // console.log($(`${swordLocation} .wall`).length);
        const emptyCheck = () => {
            if(($(`${swordLocation} .wall`).length > 0) || ($(`${swordLocation} .escape`).length > 0)){
                console.log("that's a wall");
                // uselessVar++;
            }
            else{
                $(`${swordLocation} .coin`).remove();
                if($(`${swordLocation} .breakable-wall`).length){
                    $("body").append("<audio autoplay><source src='sounds/cave-in-2.wav'></audio>")
                    $(`${swordLocation} .breakable-wall`).remove();
                }
                else if($(`${swordLocation} .enemy`).length){
                    $("body").append("<audio autoplay><source src='sounds/neck-snap.wav'></audio>")
                    $(`${swordLocation} .enemy`).remove();
                    enemiesKilled++;
                }
                else if($(`#row${hero.y}column${hero.x-1} .holder .breakable-wall`).length || $(`#row${hero.y}column${hero.x-1} .holder .wall`).length){
                    console.log("that's a wall");
                }
                // this if check exists so that if someone attacks twice really quickly,
                // the sword won't show up twice in the same block
                else if($(`${swordLocation} #sword`).length === 0){
                    // if direction is up
                    if(this.direction === "up"){
                        $("body").append("<audio autoplay><source src='sounds/swoosh.mp3'></audio>")
                        $(swordLocation).append("<img id='sword' src='img/sword-up.png'>");
                        // sword in front of you
                        setTimeout(function(){
                            // function to remove sword
                            $(`#sword`).remove();
                        }, 100);
                    }
                    // if direction is down
                    if(this.direction === "down"){
                        $("body").append("<audio autoplay><source src='sounds/swoosh.mp3'></audio>")
                        $(swordLocation).append("<img id='sword' src='img/sword-down.png'>");
                        // sword in front of you
                        setTimeout(function(){
                            // function to remove sword
                            $(`#sword`).remove();
                        }, 100);
                    }
                    // if direction is left
                    if(this.direction === "left"){
                        $("body").append("<audio autoplay><source src='sounds/swoosh.mp3'></audio>")
                        $(swordLocation).append("<img id='sword' src='img/sword-left.png'>");
                        // sword in front of you
                        setTimeout(function(){
                            // function to remove sword
                            $(`#sword`).remove();
                        }, 100);
                    }
                    // if direction is right
                    if(this.direction === "right"){
                        $("body").append("<audio autoplay><source src='sounds/swoosh.mp3'></audio>")
                        $(swordLocation).append("<img id='sword' src='img/sword-right.png'>");
                        // sword in front of you
                        setTimeout(function(){
                            // function to remove sword
                            $(`#sword`).remove();
                        }, 100);
                    }
                }
            }
        }
        // if direction is up
        if(this.direction === "up"){
            swordLocation = `#row${this.y-1}column${this.x} .holder`;
            emptyCheck();
        }
        // if direction is down
        if(this.direction === "down"){
            swordLocation = `#row${this.y+1}column${this.x} .holder`;
            emptyCheck();
            // if enemy is there, remove enemy
        }
        // if direction is left
        if(this.direction === "left"){
            swordLocation = `#row${this.y}column${this.x-1} .holder`;
            emptyCheck();
            // if enemy is there, remove enemy
        }
        // if direction is right
        if(this.direction === "right"){
            swordLocation = `#row${this.y}column${this.x+1} .holder`;
            emptyCheck();
            // if enemy is there, remove enemy
        }
    }
}

// move a block from grid point to grid point
const moveRight = () => {
    if($(`#row${hero.y}column${hero.x+1} .holder .breakable-wall`).length || $(`#row${hero.y}column${hero.x+1} .holder .wall`).length){
        console.log("that's a wall");
    }
    else if(hero.x < maxWidth){    
        hero.x++;
    }
    $("#snake-head").remove();
    newPosition = "#row" + hero.y + "column" + hero.x;
    $(`${newPosition} .holder`).append("<div id='snake-head'><img src='img/arrow-right.jpg'></div>");
    hero.direction = "right";
    // code below removes the sword so that if you walk forward into it, 
    // it doesn't fuck up the whole grid
    if($(`${newPosition} #sword`).length > 0){
        $(`#sword`).remove();
    }
}

const moveLeft = () => {
    if($(`#row${hero.y}column${hero.x-1} .holder .breakable-wall`).length || $(`#row${hero.y}column${hero.x-1} .holder .wall`).length){
        console.log("that's a wall");
    }
    else if(hero.x > 0){
        hero.x--;
    }
    $("#snake-head").remove();
    newPosition = "#row" + hero.y + "column" + hero.x;
    $(`${newPosition} .holder`).append("<div id='snake-head'><img src='img/arrow-left.jpg'></div>");
    hero.direction = "left";
    // code below removes the sword so that if you walk forward into it, 
    // it doesn't fuck up the whole grid
    if($(`${newPosition} #sword`).length > 0){
        $(`#sword`).remove();
    }
}

const moveUp = () => {
    if($(`#row${hero.y-1}column${hero.x} .holder .breakable-wall`).length || $(`#row${hero.y-1}column${hero.x} .holder .wall`).length){
        console.log("that's a wall");
    }
    else if(hero.y > 0){
        hero.y--;
    }
    $("#snake-head").remove();
    newPosition = "#row" + hero.y + "column" + hero.x;
    $(`${newPosition} .holder`).append("<div id='snake-head'><img src='img/arrow-up.jpg'></div>");
    hero.direction = "up";
    // code below removes the sword so that if you walk forward into it, 
    // it doesn't fuck up the whole grid
    if($(`${newPosition} #sword`).length > 0){
        $(`#sword`).remove();
    }
}

const moveDown = () => {
    if($(`#row${hero.y+1}column${hero.x} .holder .breakable-wall`).length || $(`#row${hero.y+1}column${hero.x} .holder .wall`).length){
        console.log("that's a wall");
    }
    else if(hero.y < maxHeight){
        hero.y++;
    }
    $("#snake-head").remove();
    newPosition = "#row" + hero.y + "column" + hero.x;
    $(`${newPosition} .holder`).append("<div id='snake-head'><img src='img/arrow-down.jpg'></div>");
    hero.direction = "down";
    // code below removes the sword so that if you walk forward into it, 
    // it doesn't fuck up the whole grid
    if($(`${newPosition} #sword`).length > 0){
        $(`#sword`).remove();
    }
}

// controls must load after the above four functions
const controls = () => {
    document.addEventListener('keypress', (event) => {
        const keyName = event.key;
        if(keyName === "d" || keyName === "D"){
            moveRight();
        }
        else if(keyName === "a" || keyName === "A"){
            moveLeft();
        }
        else if(keyName === "w" || keyName === "W"){
            moveUp();
        }
        else if(keyName === "s" || keyName === "S"){
            moveDown();
        }
        else if(keyName === " "){
            hero.attack();
        }
        coinCheck();
        escapeCheck();
        enemyCheck();
    })
    document.onkeydown = function(event){
        switch (event.keyCode){
            case 37:
            moveLeft();
            break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
            break;
        }
        coinCheck();
        escapeCheck();
        enemyCheck();
    }
}

const gameOver = () => {
    $(".grid").empty();
    $(".grid").append("<br />")
    $(".grid").append("<h1>GAME OVER</h1>");
    $(".grid").append("<br />")
    $(".grid").append(`<h3>You got to level ${level}.</h3>`);
    $(".grid").append(`<h3>You killed ${enemiesKilled} enemies.</h3>`);
    $(".grid").append(`<h3>You got a score of ${score}.</h3>`);
    $(".grid").append(`<br/><br/><button class="start-game">Play again?</button>`);
    $(".start-game").on("click", function(){
        hero.x = 0;
        hero.y = 0;
        level = 1;
        enemiesKilled = 0;
        score = 0;
        $(".grid").empty();
        stage1();  
    })
}

const coinCheck = () => {
    if($("#snake-head").siblings().is(".coin")){
        $("body").append("<audio autoplay><source src='sounds/ting.wav'></audio>")
        score++;
        $(`${newPosition} .coin`).remove();
    }
}

const enemyCheck = () => {
    if($("#snake-head").siblings().is(".enemy")){
        $("body").append("<audio autoplay><source src='sounds/error.wav'></audio>")   
        gameOver();
    }
};

const escapeCheck = () => {
    if(escapePosition === newPosition + " .holder"){
        // $("body").append("<audio autoplay><source src='sounds/ta-da.wav'></audio>")
        level++;
        $(".escape").remove();
        if(level === 2){
            clearStage();
            stage2();
        }
        else if(level === 3){
            clearStage();
            stage3();
        }
        else if(level === 4){
            clearStage();
            stage4();
        }
    }
};

// =============================================================
// ==================== USER INSTRUCTIONS ======================
// =============================================================


$(".instructions").append("<h2>Use the arrow keys (or W, A, S, and D) to move. <br/> Press space to attack. <br /> <br/> Collect coins, avoid (or fight) enemies, <br/> and escape through the door.</h2>")


// =============================================================
// ======================== ENEMY CLASS ========================
// =============================================================


class Enemy {
    constructor(x, y){
        this.x = x;
        this.y = y;
        const self = this;
        // this.movingInterval = moving;
        $(`#row${y}column${x} .holder`).append("<div class='enemy'></div>");
        this.move = setInterval(function(){
            // this first check makes sure the enemy exists/hasn't been killed yet
            if($(`#row${self.y}column${self.x} .enemy`).length > 0){
            // find a random direction
            const randomDirectionNum = Math.floor(Math.random() * 4);
            if(randomDirectionNum === 3){
                self.direction = "up"
            }
            if(randomDirectionNum === 2){
                self.direction = "down"
            }
            if(randomDirectionNum === 1){
                self.direction = "left"
            }
            if(randomDirectionNum === 0){
                self.direction = "right"
            }
            // move the skeleton based on the random direction
                $(".skelly").remove();
                $(`#row${self.y}column${self.x} .enemy`).remove();
                // these checks make sure the enemies don't walk through a wall, coin, escape portal, or off the map
                if(self.direction === "left"){
                    self.y--;
                    if($(`#row${self.y}column${self.x} .holder .breakable-wall`).length || $(`#row${self.y}column${self.x} .holder .wall`).length || $(`#row${self.y}column${self.x} .holder .enemy`).length || $(`#row${self.y}column${self.x} .holder .escape`).length || $(`#row${self.y}column${self.x} .holder .coin`).length || self.y < 0 || self.x === (maxWidth+1)) {
                        self.y++;
                    }
                }
                if(self.direction === "right"){
                    self.y++;
                    if($(`#row${self.y}column${self.x} .holder .breakable-wall`).length || $(`#row${self.y}column${self.x} .holder .wall`).length || $(`#row${self.y}column${self.x} .holder .enemy`).length || $(`#row${self.y}column${self.x} .holder .escape`).length || $(`#row${self.y}column${self.x} .holder .coin`).length || self.y === (maxHeight+1) || self.x === (maxWidth+1)) {
                        self.y--;
                    }
                }
                if(self.direction === "up"){
                    self.x--;
                    if($(`#row${self.y}column${self.x} .holder .breakable-wall`).length || $(`#row${self.y}column${self.x} .holder .wall`).length || $(`#row${self.y}column${self.x} .holder .enemy`).length || $(`#row${self.y}column${self.x} .holder .escape`).length || $(`#row${self.y}column${self.x} .holder .coin`).length || self.y === (maxHeight+1) || self.x < 0 ) {
                        self.x++;
                    }
                }
                if(self.direction === "down"){
                    self.x++;
                    if($(`#row${self.y}column${self.x} .holder .breakable-wall`).length || $(`#row${self.y}column${self.x} .holder .wall`).length || $(`#row${self.y}column${self.x} .holder .enemy`).length || $(`#row${self.y}column${self.x} .holder .escape`).length || $(`#row${self.y}column${self.x} .holder .coin`).length || self.y === (maxHeight+1) || self.x === (maxWidth+1)) {
                        self.x--;
                    }
                }
                // new position
                let newEnemyPosition = "#row" + self.y + "column" + self.x;
                $(`${newEnemyPosition} .holder`).append(`<div class='enemy' id='baddo${self.y}${self.x}'></div>`);
                if($("#sword").siblings().is(`.enemy`)){
                    console.log("SIBS");
                    $("#sword").remove();
                }
                $(".enemy").append("<img class='skelly' src='img/skeleton'>");
                if(newEnemyPosition === "#" + $("#snake-head").parent().parent().attr("id")){
                    console.log("samesies");
                    gameOver();
                }
                if($(`#row${self.y}column${self.x} .enemy`).length > 0){
                    self.move;
                }
            }
        }, 1500);
    }
};

// the block of code for calling a new enemy, 
// and the function to let him move (if he's still alive)





// =========================================================
// =================== MAKING STAGES =======================
// =========================================================

const clearStage = () => {
    $(".grid").empty();
    buildGrid(20,20);
    hero.x = 0;
    hero.y = 0;
    newPosition = "#row0column0";
    $(`${newPosition} .holder`).append("<div id='snake-head'><img src='img/arrow-right.jpg'></div>");
};

const stage1 = () => {
    controls();
    // building grid
    buildGrid(20,20);

    // establish hero
    newPosition = "#row0column0";
    $(`${newPosition} .holder`).append("<div id='snake-head'><img src='img/arrow-right.jpg'></div>");


    // making enemies
    const stage1enemies = () => {
        const baddo1 = new Enemy(9,8);
        const baddo2 = new Enemy(9,10);
        const baddo3 = new Enemy(12,10);
    }
    
    stage1enemies();


    // placing coins on the map

    $("#row1column9 .holder").append("<div class='coin'></div>")
    $("#row1column11 .holder").append("<div class='coin'></div>")
    $("#row1column13 .holder").append("<div class='coin'></div>")

    $("#row8column6 .holder").append("<div class='coin'></div>")
    $("#row8column12 .holder").append("<div class='coin'></div>")
    $("#row8column18 .holder").append("<div class='coin'></div>")

    $(`#row${maxHeight}column${maxWidth} .holder`).append("<div class='coin'></div>")

    // top row
    for(let i=0; i<17; i++){
        $(`#row3column${i} .holder`).append("<div class='wall'></div>")
    };
    // next row 
    for(let i=maxWidth; i>2; i--){
        $(`#row6column${i} .holder`).append("<div class='wall'></div>")
    };
    // wall along left
    for(let i=7; i<17; i++){
        $(`#row${i}column3 .holder`).append("<div class='wall'></div>")
    };
    // breakable walls
    for(let i=0; i<3; i++){
        $(`#row10column${i} .holder`).append("<div class='breakable-wall'></div>")
    }
    // walled-in escape - top wall
    for(let i=17; i<21; i++){
        $(`#row16column${i} .holder`).append("<div class='breakable-wall'></div>")
    }
    // walled-in escape - side wall
    for(let i=16; i<21; i++){
        $(`#row${i}column16 .holder`).append("<div class='wall'></div>")
    }
    // escape door - normally at row18col18
    escapePosition = "#row18column18 .holder";
    $(escapePosition).append("<div class='escape'></div>")
    imageFill();
    // $("body").append("<audio autoplay><source src='sounds/music.mp3'></audio>")
};

const stage2 = ()=>{
    // middle row
    for(let i=(maxWidth-1); i>9; i--){
        $(`#row${i}column1 .holder`).append("<div class='wall'></div>")
    };
    for(let i=2; i<12; i++){
        $(`#row18column${i} .holder`).append("<div class='wall'></div>")
    };
    // walls
    for(let i=0; i<8; i++){
        $(`#row8column${i} .holder`).append("<div class='wall'></div>")
    }
    for(let i=11; i<21; i++){
        $(`#row8column${i} .holder`).append("<div class='wall'></div>")
    }
    // breakable cage
    for(let i=7; i<11; i++){
        $(`#row2column${i} .holder`).append("<div class='breakable-wall'></div>")
    }
    for(let i=2; i<6; i++){
        $(`#row${i}column11 .holder`).append("<div class='breakable-wall'></div>")
    }
    for(let i=3; i<6; i++){
        $(`#row${i}column7 .holder`).append("<div class='breakable-wall'></div>")
    }
    for(let i=7; i<12; i++){
        $(`#row6column${i} .holder`).append("<div class='breakable-wall'></div>")
    }
    // cage coins
    for(let i=3; i<=5; i++){
        $(`#row${i}column8 .holder`).append("<div class='coin'></div>");
        $(`#row${i}column10 .holder`).append("<div class='coin'></div>");
    }
    $(`#row3column9 .holder`).append("<div class='coin'></div>");
    $(`#row5column9 .holder`).append("<div class='coin'></div>");
    // wall coins
    for(let i=(maxWidth-1); i>9; i--){
        $(`#row${i}column0 .holder`).append("<div class='coin'></div>")
    };
    for(let i=1; i<12; i++){
        $(`#row19column${i} .holder`).append("<div class='coin'></div>")
    };
    // walled-in escape - top wall
    for(let i=16; i<21; i++){
        $(`#row16column${i} .holder`).append("<div class='breakable-wall'></div>")
    }
    // walled-in escape - side wall
    for(let i=17; i<21; i++){
        $(`#row${i}column16 .holder`).append("<div class='breakable-wall'></div>")
    }

    // caged enemy
    const baddo4 = new Enemy(9,4);

    // enemy next to escape
    const baddo5 = new Enemy(17,17);

    // enemy in bottom left corner
    const baddo6 = new Enemy(0,maxHeight);

    // enemy in top right corner, penned in by coins
    const baddo7 = new Enemy(maxWidth,0);
    $("#row0column18 .holder").append("<div class='coin'></div>")
    $("#row1column18 .holder").append("<div class='coin'></div>")
    $("#row1column19 .holder").append("<div class='coin'></div>")

    // enemies in center
    const baddo8 = new Enemy(5,13);
    const baddo9 = new Enemy(9,13);
    const baddo10 = new Enemy(13,13);

    // escape door
    escapePosition = "#row18column18 .holder";
    $(escapePosition).append("<div class='escape'></div>")

    imageFill();
};

const stage3 = () => {

    // create and fill out enemy array
    const enemyArray = [];
    for(let i=11; i<=65; i++){
        enemyArray.push(`baddo${i}`);
    }
    
    // populate map with enemies
    for(let i = 1; i<=10; i++){
        enemyArray[i] = new Enemy(i+3, i+2)
    }

    for(let i = 11; i<=21; i++){
        enemyArray[i] = new Enemy(i+2, i+3)
    }

    for(let i = 22; i<=31; i++){
        enemyArray[i] = new Enemy(i-15, 0)
    }

    for(let i = 32; i<=45; i++){
        enemyArray[i] = new Enemy(0, i-25)
    }

    for(let i = 46; i<=55; i++){
        enemyArray[i] = new Enemy(i-40, maxHeight)
    }

    for(let i = 56; i<=65; i++){
        enemyArray[i] = new Enemy(maxWidth, i-50)
    }

    // escape door
    escapePosition = "#row18column18 .holder";
    $(escapePosition).append("<div class='escape'></div>")

    imageFill();
}

const stage4 = () => {
    gameOver();

    $(".grid").prepend("<br/><h1>YOU WIN</h1><br/>")
}

// =========================================================
// ==================== START BUTTON =======================
// =========================================================

$(".grid").append(`<br/><button class="start-game">Start</button>`);
    $(".start-game").on("click", function(){
        $(".grid").empty();
        stage1();  
    })