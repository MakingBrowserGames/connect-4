import AudioFX from 'objects/Audio/FX';
import MenuTrack from 'objects/Audio/Menu';
import GameTrack from 'objects/Audio/Game';


export default class Preload extends Phaser.State {

    create() {
        let background = this.game.add.image(0, 0, 'loadingScreenBackground');

        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        this.start();
    }

    start() {
        // load game buttons
        this.game.load.spritesheet('playButton', 'assets/Menu/playButton.png', 300, 102, 2);

        // load gui artwork
        this.game.load.image('selectModeSign', 'assets/Gui/selectMode.png');
        this.game.load.image('mediumHitBox', 'assets/Misc/mediumHitBox.png');
        this.game.load.image('gameLogo', 'assets/Menu/gameLogo.png');
        this.game.load.image('whiteBoard', 'assets/Gameover/whiteBoard.png');
        this.game.load.spritesheet('buttons', 'assets/Gui/buttons.png', 83, 93, 7);

        // load background images
        this.game.load.image('menuBackground', 'assets/Menu/menuBackground1.jpg');
        this.game.load.image('menuBackgroundCloud1', 'assets/Menu/menuBackground2.png');
        this.game.load.image('menuBackgroundCloud2', 'assets/Menu/menuBackground3.png');
        this.game.load.image('gameOverBackground', 'assets/Gameover/background.jpg');
        this.game.load.image('gameBackground', 'assets/Game/gameBackground.png');

        // load game images
        this.game.load.spritesheet('dicsSprite', 'assets/Game/discSprite.png', 110, 110, 4);
        this.game.load.image('gridBackground', 'assets/Game/gridBackground.png');
        this.game.load.image('gridOverlay', 'assets/Game/gridOverlay.png');

        // load scripts
        this.load.script('filterX', 'assets/scripts/BlurX.js');
        this.load.script('filterY', 'assets/scripts/BlurY.js');

        // load fonts
        this.game.load.bitmapFont('3d', 'assets/Fonts/Bitmap/3d.png', 'assets/Fonts/Bitmap/3d.fnt');

        // load audio
        this.game.load.audio('fx', ['assets/Audio/Gui/fx.wav', 'assets/Audio/GUI/fx.mp3', 'assets/Audio/GUI/fx.ogg']);
        this.game.load.audio('menu', ['assets/Audio/Tracks/menu.mp3', 'assets/Audio/Tracks/menu.ogg']);
        this.game.load.audio('game', ['assets/Audio/Tracks/game.mp3', 'assets/Audio/Tracks/game.ogg']);

        // Start loading
        this.game.load.start();
    }

    loadStart() {

    }

    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        //console.log("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles)
    }

    loadComplete() {
        //this.game.state.start('Menu');
        this.game.fx = new AudioFX(this.game);
        this.game.menuTrack = new MenuTrack(this.game);
        this.game.gameTrack = new GameTrack(this.game);
        this.game.sfxEnabled = true;
        this.game.musicEnabled = true;

        // -- A callback on sound decoded is more suitable however audio sprites do not always work on mobile
        // Above issue was fixed by providing a wav, as well as mp3 and ogg.. though I down sampled it to 16bit @ 8000hz 
        // because of space issues and to keep the proj light weight.
        this.game.sound.setDecodedCallback([this.game.fx, this.game.menuTrack, this.game.gameTrack], function() {
            this.game.time.events.add(2000, function() {
                this.game.stateChange.darkenScreen('Menu', {});
            }, this);
        }, this);
    }
}
