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
    $(".enemy").append("<img src='img/skeleton'>");
}

// ====================
// INITIAL DECLARATIONS
// ====================

let maxHeight;
let maxWidth;

let score = 0;
let level = 1;
let enemiesKilled = 0;
let newEnemyPosition;
let escapePosition;

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
                    $("body").append("<audio autoplay><source src='sounds/swoosh.mp3'></audio>")
                    $(swordLocation).append("<img id='sword' src='img/sword.png'>");
                    // sword in front of you
                    setTimeout(function(){
                        // function to remove sword
                        $(`#sword`).remove();
                    }, 250);
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
        if(keyName === "d"){
            moveRight();
        }
        if(keyName === "a"){
            moveLeft();
        }
        if(keyName === "w"){
            moveUp();
        }
        if(keyName === "s"){
            moveDown();
        }
        if(keyName === " "){
            hero.attack();
        }
        coinCheck();
        escapeCheck();
        enemyCheck();
    })
}
      
controls();

const gameOver = () => {
    $(".grid").empty();
    $(".grid").append("<br />")
    $(".grid").append("<h1>GAME OVER</h1>");
    $(".grid").append("<br />")
    $(".grid").append(`<h3>You got to level ${level}.</h3>`);
    $(".grid").append(`<h3>You killed ${enemiesKilled} enemies.</h3>`);
    $(".grid").append(`<h3>You got a score of ${score}.</h3>`);
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
        $("body").append("<audio autoplay><source src='sounds/ta-da.wav'></audio>")
        level++;
        $(".escape").remove();
        if(level === 2){
            clearStage();
            stage2();
        }
        if(level === 3){
            clearStage();
            stage3();
        }
    }
};

// =============================================================
// ==================== USER INSTRUCTIONS ======================
// =============================================================


$("body").prepend("<h2>Use W, A, S, and D to move. <br/> Press space to attack. <br /> <br/> Collect coins, avoid (or fight) enemies, <br/> and escape through the purple door!</h2>")


// =============================================================
// ======================== ENEMY CLASS ========================
// =============================================================


class Enemy {
    constructor(x, y){
        this.x = x;
        this.y = y;
        $(`#row${y}column${x} .holder`).append("<div class='enemy'></div>")
    }
    move(){
        // function findRandomDirection (){
        const randomDirectionNum = Math.floor(Math.random() * 4);
        if(randomDirectionNum === 3){
            this.direction = "up"
        }
        if(randomDirectionNum === 2){
            this.direction = "down"
        }
        if(randomDirectionNum === 1){
            this.direction = "left"
        }
        if(randomDirectionNum === 0){
            this.direction = "right"
        }
        // function setOrientation(){
        if($(`#row${this.y}column${this.x} .enemy`).length > 0){
            $(".skelly").remove();
            $(`#row${this.y}column${this.x} .enemy`).remove();
            // these checks make sure the enemies don't walk through a wall, coin, escape portal, or off the map
            if(this.direction === "left"){
                this.y--;
                if($(`#row${this.y}column${this.x} .holder .breakable-wall`).length || $(`#row${this.y}column${this.x} .holder .wall`).length || $(`#row${this.y}column${this.x} .holder .enemy`).length || $(`#row${this.y}column${this.x} .holder .escape`).length || $(`#row${this.y}column${this.x} .holder .coin`).length || this.y === (maxHeight+1) || this.x === (maxWidth+1)) {
                    this.y++;
                }
            }
            if(this.direction === "right"){
                this.y++;
                if($(`#row${this.y}column${this.x} .holder .breakable-wall`).length || $(`#row${this.y}column${this.x} .holder .wall`).length || $(`#row${this.y}column${this.x} .holder .enemy`).length || $(`#row${this.y}column${this.x} .holder .escape`).length || $(`#row${this.y}column${this.x} .holder .coin`).length || this.y === (maxHeight+1) || this.x === (maxWidth+1)) {
                    this.y--;
                }
            }
            if(this.direction === "up"){
                this.x--;
                if($(`#row${this.y}column${this.x} .holder .breakable-wall`).length || $(`#row${this.y}column${this.x} .holder .wall`).length || $(`#row${this.y}column${this.x} .holder .enemy`).length || $(`#row${this.y}column${this.x} .holder .escape`).length || $(`#row${this.y}column${this.x} .holder .coin`).length || this.y === (maxHeight+1) || this.x === (maxWidth+1)) {
                    this.x++;
                }
            }
            if(this.direction === "down"){
                this.x++;
                if($(`#row${this.y}column${this.x} .holder .breakable-wall`).length || $(`#row${this.y}column${this.x} .holder .wall`).length || $(`#row${this.y}column${this.x} .holder .enemy`).length || $(`#row${this.y}column${this.x} .holder .escape`).length || $(`#row${this.y}column${this.x} .holder .coin`).length || this.y === (maxHeight+1) || this.x === (maxWidth+1)) {
                    this.x--;
                }
            }
            // new position
            let newEnemyPosition = "#row" + this.y + "column" + this.x;
            $(`${newEnemyPosition} .holder`).append(`<div class='enemy' id='baddo${this.y}${this.x}'></div>`);
            $(".enemy").append("<img class='skelly' src='img/skeleton'>");
            if(newEnemyPosition === "#" + $("#snake-head").parent().parent().attr("id")){
                console.log("samesies");
                gameOver();
            }
        }
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
    // building grid
    buildGrid(20,20);

    // establish hero
    let newPosition = "#row0column0";
    $(`${newPosition} .holder`).append("<div id='snake-head'><img src='img/arrow-right.jpg'></div>");


    // making enemies
    const stage1enemies = () => {
        const baddo1 = new Enemy(9,8);
        baddo1move = setInterval(function(){
            baddo1.move();
            if($(`#row${baddo1.y}column${baddo1.x} .enemy`).length > 0){
                baddo1move;
            }
        }, 1500);
    
        const baddo2 = new Enemy(9,10);
        baddo2move = setInterval(function(){
            baddo2.move();
            if($(`#row${baddo2.y}column${baddo2.x} .enemy`).length > 0){
                baddo2move;
            }
        }, 1500);
    
        const baddo3 = new Enemy(12,10);
        baddo3move = setInterval(function(){
            baddo3.move();
            if($(`#row${baddo3.y}column${baddo3.x} .enemy`).length > 0){
                baddo3move;
            }
        }, 1500);
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
    for(let i=16; i<21; i++){
        $(`#row16column${i} .holder`).append("<div class='breakable-wall'></div>")
    }
    // walled-in escape - side wall
    for(let i=17; i<21; i++){
        $(`#row${i}column16 .holder`).append("<div class='breakable-wall'></div>")
    }
    // escape door
    escapePosition = "#row18column18 .holder";
    $(escapePosition).append("<div class='escape'></div>")
    imageFill();
};

stage1();

const stage2 = ()=>{
    // top row
    // for(let i=0; i<17; i++){
    //     $(`#row${i}column3 .holder`).append("<div class='wall'></div>")
    // };
    // // next row 
    // for(let i=maxWidth; i>2; i--){
    //     $(`#row${i}column6 .holder`).append("<div class='wall'></div>")
    // };
    // // wall along left
    // for(let i=7; i<17; i++){
    //     $(`#row3column${i} .holder`).append("<div class='wall'></div>")
    // };
    // // breakable walls
    // for(let i=0; i<3; i++){
    //     $(`#row${i}column10 .holder`).append("<div class='breakable-wall'></div>")
    // }
    // // walls
    // for(let i=19; i>8; i--){
    //     $(`#row6column${i} .holder`).append("<div class='wall'></div>")
    // }
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
        $("#row3column8 .holder").append("<div class='coin'></div>")
        $("#row3column9 .holder").append("<div class='coin'></div>")
        $("#row3column10 .holder").append("<div class='coin'></div>")
        $("#row4column8 .holder").append("<div class='coin'></div>")
        $("#row4column10 .holder").append("<div class='coin'></div>")
        $("#row5column8 .holder").append("<div class='coin'></div>")
        $("#row5column9 .holder").append("<div class='coin'></div>")
        $("#row5column10 .holder").append("<div class='coin'></div>")
    // walled-in escape - top wall
    for(let i=16; i<21; i++){
        $(`#row16column${i} .holder`).append("<div class='breakable-wall'></div>")
    }
    // walled-in escape - side wall
    for(let i=17; i<21; i++){
        $(`#row${i}column16 .holder`).append("<div class='breakable-wall'></div>")
    }

    // make enemies

    // caged enemy
    const baddo4 = new Enemy(9,4);
    baddo4move = setInterval(function(){
    baddo4.move();
    if($(`#row${baddo4.y}column${baddo4.x} .enemy`).length > 0){
        console.log("baddo4 alive")
        baddo4move;
    }
    }, 1500);

    const baddo5 = new Enemy(maxHeight,maxWidth);
    baddo5move = setInterval(function(){
    baddo5.move();
    if($(`#row${baddo5.y}column${baddo5.x} .enemy`).length > 0){
        console.log("baddo4 alive")
        baddo5move;
    }
    }, 1500);

    // escape door
    escapePosition = "#row18column18 .holder";
    $(escapePosition).append("<div class='escape'></div>")
    imageFill();
};