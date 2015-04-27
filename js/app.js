//multiplier to change speed of the enemies
var booster = 1;
//initial score. 1 is added when player reaches water; 
//1 is substracted when collide with an enemy
var score = 0;

// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.x = Math.random()*350 + 50;
    this.y = row*83 + 60;
    this.sprite = 'images/enemy-bug.png';
    //sets a bug speed. Booster is used to increase 
    //average speed of bugs at the next level 
    this.speed = (Math.random()*100 + 30)*booster;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed*dt;
    if (this.x > 505) {
        this.x = -80;
    } else if (this.x +50 > player.x && this.x < player.x+50 && this.y+30 > player.y && this.y < player.y+30){
        player.reset();
        score -= 1;
        scoreDraw();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(){
    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
    if (this.x < -2) {
        this.x = -2;
    } else if (this.x >402) {
        this.x = 402;
    } else if (this.y > 380) {
        this.y = 380;
    } else if (this.y < 20) {
        player.reset();
        score += 1;
        booster += 0.3;
        allEnemies = [];
        arrayFiller(allEnemies);
        scoreDraw();
    }

};

Player.prototype.reset = function(){
    this.x=200;
    this.y=380;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed){
    switch(keyPressed){
        case "left":
            this.x -=101;
            break;
        case "right":
            this.x +=101;
            break;
        case "up":
            this.y -= 83;
            break;
        case "down":
            this.y += 83;
            break;
        default:
            break;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0), new Enemy (1), new Enemy(2)];

var player = new Player();

//populate previously epmtied array with enemies.
var arrayFiller = function(arrayToFill){
    for (var i=0; i<3; i++){
        arrayToFill.push(new Enemy(i));
    }
};

//Function to draw the score.Variable score
//is declared in the beginning.
var scoreDraw = function(){
    ctx.clearRect(0,0, 200, 200);
    ctx.font="30pt Calibri";
    ctx.fillText("Score: " + score, 0, 30);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

