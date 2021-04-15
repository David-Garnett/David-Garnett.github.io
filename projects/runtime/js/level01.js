var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY -20 },
                { "type": "sawblade", "x": 600, "y": groundY - 20 },
                { "type": "sawblade", "x": 500, "y": groundY - 20 },
                { "type": "obstacle", "x": 500, "y": groundY - 35},
                { "type": "reward", "x": 800, "y": groundY - 10},
                { "type": "enemy", "x": 900, "y": groundY - 40},
                { "type": "sawblade", "x": 450, "y": groundY - 30},
                { "type": "sawblade", "x": 550, "y": groundY - 25},
                { "type": "enemy", "x": 750, "y": groundY - 50},
                { "type": "reward", "x": 850, "y": groundY - 15},
                { "type": "zombie", "x": 700, "y": groundY - 35},
                { "type": "healer", "x": 650, "y": groundY - 45},
                { "type": "zombie", "x": 725, "y": groundY - 35},
                { "type": "healer", "x": 675, "y": groundY - 45},
                { "type": "zombie", "x": 775, "y": groundY - 35},
                { "type": "healer", "x": 625, "y": groundY - 45},
            ]
        };
        for ( var i = 0; i < levelData.gameItems.length; i++){
            var obj = levelData.gameItems[i];
            var objX = obj.x;
            var objY = obj.y;
            var objType = obj.type;
            if (objType === "sawblade"){
                createSawBlade(objX, objY);
            } else if (objType === "enemy"){
                createEnemy(objX, objY);
            } else {
                createObstacle(objX, objY);
            } 
        }
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
         function createSawBlade (x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }


        function createObstacle (x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            obstacleHitZone.x = x;
            obstacleHitZone.y = y;
            game.addGameItem(obstacleHitZone);
            var obstacleImage = draw.bitmap('img/branchlarge.png');
            obstacleHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            obstacleHitZone.rotationalVelocity = 15;
        }

        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.flyTo
            };
            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }

        function createReward(x, y){
            var reward = game.createGameItem('reward',25);
            var powerUp = draw.rect(50,50,'yellow');
            yellowSquare.x = -25;
            yellowSquare.y = -25;
            reward.addChild(yellowSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);

            reward.onPlayerCollision = function() {
                console.log('1 life up');
                game.changeIntegrity(10);
                game.increaseScore(100);
                enemy.fadeOut();
            }
        }
        function createZombie(x, y){
            var zombie = game.createGameItem('zombie',25);
            var redSquare = draw.bitmap('img/zombie.png');
            zombie.x = -25;
            zombie.y = -25;
            zombie.addChild(redSquare);
            zombie.x = x;
            zombie.y = y;
            game.addGameItem(zombie);
        }
        function createHealer(x, y){
            var reward = game.createGameItem('healer',25);
            var powerUp = draw.rect(50,50,'green');
            greenSquare.x = -25;
            greenSquare.y = -25;
            healer.addChild(greenSquare);
            healer.x = x;
            healer.y = y;
            game.addGameItem(healer);

            reward.onPlayerCollision = function() {
                console.log('5 lifes up');
                game.changeIntegrity(50);
                healer.fadeOut();
            }
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}