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
                { "type": "obstacle", "x": 500, "y": groundY },
                { "type": "reward", "x": 900, "y": groundY },
                { "type": "enemy", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "enemy", "x": 900, "y": groundY - 50 },
                { "type": "reward", "x": 900, "y": groundY },
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
            redSquare.x = -25;
            redSquare.y = -25;
            reward.addChild(redSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(enemy);

            reward.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(10);
                game.increaseScore(100);
                enemy.fadeOut();
            };
        }
        createEnemy (300, 300);
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}