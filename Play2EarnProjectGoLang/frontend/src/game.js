const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let stars;
let score = 0;
let scoreText;


    // Load the image assets - 2D textures
    function preload() {
        this.load.image('sky', 'assets/background/sky1.png');
        this.load.image('ground', 'assets/background/Rock.png');
        this.load.image('star', 'assets/items/star.png');
        this.load.image('player', 'assets/players/p3_stand.png');
        this.load.spritesheet('player_walk', 'assets/players/p3_walk/p3_walk.png', { frameWidth: 66, frameHeight: 93}); // Adjusted frame size for walk animation
        this.load.image('enemy', 'assets/items/mushroomRed.png'); // Enemies
        
    }

    function create() {
        // Background
        let sky = this.add.image(400, 300, 'sky');
        sky.setDisplaySize(800, 600);
    
        // Platforms
        const platforms = this.physics.add.staticGroup();
        createPlatforms(platforms);
    
        // Stars
        stars = this.physics.add.group();
        spawnStars(platforms);
    
        // Player
        player = this.physics.add.sprite(50, 0, 'player_walk');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setGravityY(100);
    
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
    
        // Input keyboard
        cursors = this.input.keyboard.createCursorKeys();
    
        // Enemies
        enemies = this.physics.add.group();
        spawnEnemies(platforms);
    
        // Colliders
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(enemies, platforms);
        this.physics.add.overlap(player, enemies, hitEnemy, null, this);
        this.physics.add.overlap(player, stars, collectStar, null, this);
    
        // Score
        scoreText = this.add.text(16, 16, 'Level 1 - Score: 0', { fontSize: '32px', fill: '#ff69b4', stroke: '#000', strokeThickness: 4 });
    }
    
    function update() {
        // Player input control
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('walk', true);
            player.flipX = true;
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('walk', true);
            player.flipX = false;
        } else {
            player.setVelocityX(0);
            player.anims.stop();
        }
    
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-600);
        }
    }
    
    function createPlatforms(platforms) {
        platforms.create(0, 568, 'ground').setDisplaySize(150, 250).refreshBody();
        platforms.create(200, 500, 'ground').setDisplaySize(200, 250).refreshBody();
        platforms.create(450, 450, 'ground').setDisplaySize(200, 300).refreshBody();
        platforms.create(650, 568, 'ground').setDisplaySize(200, 250).refreshBody();
        platforms.create(750, 250, 'ground').setDisplaySize(150, 200).refreshBody();
    }
    
    function spawnStars(platforms) {
        platforms.children.iterate((platform) => {
            if (platform.body) {
                let starX = Phaser.Math.Between(platform.body.position.x, platform.body.position.x + platform.displayWidth);
                let starY = platform.body.position.y - 200;
                stars.add(game.scene.scenes[0].physics.add.sprite(starX, starY, 'star'));
            }
        });
    
        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
        });
    }
    
    function spawnEnemies(platforms) {
        let platformIndex = 0;
        platforms.children.iterate((platform) => {
            if (platform.body && platformIndex % 2 !== 0) {
                let enemyX = Phaser.Math.Between(platform.body.position.x, platform.body.position.x + platform.displayWidth);
                let enemyY = platform.body.position.y - 200;
                enemies.add(game.scene.scenes[0].physics.add.sprite(enemyX, enemyY, 'enemy'));
            }
            platformIndex++;
        });
    }
    
    function collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);
    }
    
    function hitEnemy(player, enemy) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.stop();
        player.setPosition(50, 0);
        this.physics.resume();
    }