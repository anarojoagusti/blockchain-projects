/// GLOBAL VARS
let player;
let cursors;
let stars;
let enemies;
let score = 0;
let scoreText;
let web3;
let userAddress;
let hasClaimedReward = false;

///----------------- CONNECT WALLET SCENE -------------------
class RegisterScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RegisterScene' });
    }

    preload() {
        this.load.image('sky', 'assets/background/sky1.png');
    }

    create() {
        // Background
        let sky = this.add.image(400, 300, 'sky');
        sky.setDisplaySize(800, 600);
        this.add.text(160, 150, 'Connect your wallet to proceed:', { fontSize: '24px', fill: '#ff69b4', stroke: '#424242', strokeThickness: 4 });
        // Connect wallet
        const connectButton = this.add.text(250, 210, 'Connect Wallet', { fontSize: '32px', fill: '#ffffff', backgroundColor: '#ff69b4', padding: { x: 10, y: 5 }})
            .setInteractive()
            .on('pointerdown', async () => {
                if (typeof window.ethereum !== 'undefined') {
                    try {
                        await window.ethereum.request({ method: 'eth_requestAccounts' });
                        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                        userAddress = accounts[0];
                        this.add.text(60, 500, 'Connected: ' + userAddress, { fontSize: '20px', fill: '#ffffff', stroke: '#424242', strokeThickness: 4});
                        this.add.text(220, 520, 'Press SPACE to continue', { fontSize: '24px', fill: '#ff69b4', stroke: '#424242', strokeThickness: 4});
                    } catch (error) {
                        console.error('User denied account access', error);
                    }
                } else {
                    console.error('MetaMask is not installed');
                    this.add.text(200, 350, 'MetaMask is not installed', { fontSize: '18px', fill: '#ff69b4', stroke: '#424242', strokeThickness: 4 });
                }
            });
        
        // Claim Rewards Button
        const claimButton = this.add.text(250, 400, 'Claim Rewards', { fontSize: '32px', fill: '#ffffff', backgroundColor: '#0000ff', padding: { x: 10, y: 5 }})
            .setInteractive()
            .on('pointerdown', () => {
                this.claimRewards();
            });

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (userAddress && cursors.space.isDown) {
            this.scene.start('GameScene');
        }
    }

    async claimRewards() {
        if (typeof window.ethereum !== 'undefined' && !hasClaimedReward && score > 0) {
            try {
                if (!window.web3) {
                    window.web3 = new Web3(window.ethereum);
                }
    
                const contract = new window.web3.eth.Contract(Play2EarnABI, '0x88a606BB7a8a54fA4Bf32B78DF3E6C8Ac2722d3E');
                await contract.methods.rewardPlayer(score).send({ from: userAddress });
                hasClaimedReward = true;
                alert('Reward claimed successfully!');
            } catch (error) {
                console.error('Failed to claim reward:', error);
            }
        } else {
            alert('You have already claimed your reward or no score available.');
        }
    }
}
///----------------- CONNECT WALLET SCENE -------------------

///---------------------- GAME SCENE ------------------------
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    // Load the image assets - 2D textures
    preload() {
        this.load.image('sky', 'assets/background/sky1.png');
        this.load.image('ground', 'assets/background/Rock.png');
        this.load.image('star', 'assets/items/star.png');
        this.load.image('player', 'assets/players/p3_stand.png');
        this.load.spritesheet('player_walk', 'assets/players/p3_walk/p3_walk.png', { frameWidth: 66, frameHeight: 93}); // Adjusted frame size for walk animation
        this.load.image('enemy', 'assets/items/mushroomRed.png'); // Enemies
        
    }

    create() {
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
        scoreText = this.add.text(16, 16, 'Level 1 - Score: 0', { fontSize: '32px', fill: '#ff69b4', stroke: '#424242', strokeThickness: 4 });
    }
    
    update() {
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
}
///---------------------- GAME SCENE ------------------------

///---------------------- GENERAL CONFIG --------------------
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
    scene: [RegisterScene,  GameScene]
};

const game = new Phaser.Game(config);
   
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
            stars.add(platforms.scene.physics.add.sprite(starX, starY, 'star'));
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
            enemies.add(platforms.scene.physics.add.sprite(enemyX, enemyY, 'enemy'));
        }
        platformIndex++;
    });
}
    
function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        endGame();
    }
}

function hitEnemy(player, enemy) {
    /*this.physics.pause();
    player.setTint(0xff0000);
    player.anims.stop();
    player.setPosition(50, 0);
    this.physics.resume();*/
}

function endGame() {
    scoreText.setText('Game Over - Score: ' + score);
    setTimeout(() => {
        game.scene.keys.GameScene.scene.start('RegisterScene');
    }, 3000);
}


    
    