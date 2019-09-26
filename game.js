// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var loss = false;
var currentScore = 0;
var winningScore = 80;
var life=3;
var veneno;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  veneno= game.add.physicsGroup();
  createItem(220, 500, 'coin');//moneda plataforma 1
  createItem(620, 500, 'coin');//moneda plataforma 2
  createItem(400, 380, 'coin');//moneda plataforma 3
  createItem(560, 280, 'coin');//moneda plataforma 4
  createItem(50, 200, 'coin'); //moneda plataforma 5
  createItem(750, 200, 'coin');//moneda plataforma 6
  createItem(160, 130, 'coin');//moneda plataforma 7
  createItem(500, 100, 'coin');//moneda plataforma 8
  createItem(190, 50, 'coin'); //moneda plataforma 9
  createPoison(400,500,'poison'); //veneno 1
  createPoison(450,500,'poison'); //veneno 2
  createPoison(500,500,'poison'); //veneno 3
  
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  
  platforms.create(500, 550, 'platform');//plataforma 1
  platforms.create(100, 550, 'platform2');//plataforma 2
  platforms.create(330, 430, 'platform');//plataforma 3
  platforms.create(440, 320, 'platform');//plataforma 4
  platforms.create(20, 250, 'platform'); //plataforma 5
  platforms.create(700, 250, 'platform');//plataforma 6
  platforms.create(100, 180, 'platform2');//plataforma 7
  platforms.create(500, 150, 'platform');//plataforma 8
  platforms.create(170, 90, 'platform2'); //plataforma 9
  
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
  
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

function createPoison(left, top, image) {
  var item = veneno.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
  
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  currentScore = currentScore + 10;
    
  if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

function poisonHandler(player, veneno) {
  veneno.kill();
  currentScore = currentScore - 10;
  life--;
    if(life<=0){
        loss=true;
        
    }
    
  
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    
    //Load images
    game.load.image('platform', 'platform_1.png');
    game.load.image('platform2', 'platform_2.png');
    
    
    //Load spritesheets
    game.load.spritesheet('player', 'mikethefrog.png', 32, 32);
    game.load.spritesheet('coin', 'coin.png', 36, 44);
    game.load.spritesheet('badge', 'badge.png', 42, 54);
    game.load.spritesheet('poison', 'poison.png', 32, 32);

    
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    text2 = game.add.text(650, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    text2.text= "VIDAS: " + life;
    
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    game.physics.arcade.overlap(player, veneno, poisonHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "YOU GIT GUD!!!";
    }
      
      if (loss) {
      winningMessage.text = "YOU DIED";
      player.kill();
    }
  }

  function render() {

  }

};
