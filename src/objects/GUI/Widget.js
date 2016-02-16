export default class Widget extends Phaser.Sprite {

    constructor(game, state) {
        super(game, 1500, 875, 'buttons', 0);
        this._game = game;
        this._state = state;
        this.initSetup();
    }

    initSetup() {
        this.anchor.setTo(0.5);
        this.scale.setTo(1.5);
        this.inputEnabled = true;
        this._active = false;
        if (this._state.key === 'Game') {
            this.createHomeButton(100);
            this.createReplayButton(200);
            this.createSoundButton(300);
            this.createMusicButton(400);
        } else {
            this.createHomeButton(100);
            this.createSoundButton(200);
            this.createMusicButton(300);
        }

        this.events.onInputDown.add(function() {
            this._game.fx.playFX('click');
            if (this._active === false) {
                this.moveUp();
                this._active = true;
            } else {
                this.moveDown();
                this._active = false;
            }
        }, this);



        this._game.add.existing(this);
    }

    moveUp() {
        let tween = this._game.add.tween(this).to({ y: 250 }, 750, Phaser.Easing.Exponential.InOut).start();
    }

    moveDown() {
        let tween = this._game.add.tween(this).to({ y: 875 }, 750, Phaser.Easing.Exponential.InOut).start();
    }

    createHomeButton(y) {
        this.homeButton = this._game.add.sprite(0, y, 'buttons', 1);
        this.homeButton.anchor.setTo(0.5);
        this.homeButton.scale.setTo(0.8);
        this.homeButton.inputEnabled = true;
        this.homeButton.input.priorityID = 1;
        this.homeButton.events.onInputDown.add(function() {
            this._game.fx.playFX('click');
            this.game.stateChange.darkenScreen('Menu', {});
        }, this);
        this.addChild(this.homeButton);
    }

    createReplayButton(y) {
        this.replayButton = this._game.add.sprite(0, y, 'buttons', 2);
        this.replayButton.anchor.setTo(0.5);
        this.replayButton.scale.setTo(0.8);
        this.replayButton.inputEnabled = true;
        this.replayButton.input.priorityID = 1;
        this.replayButton.events.onInputDown.add(function() {
            this._game.fx.playFX('click');
            this.game.stateChange.darkenScreen('Game', {});
        }, this);
        this.addChild(this.replayButton);
    }

    createSoundButton(y) {
        this.sfxButton = this._game.add.sprite(0, y, 'buttons', 3);
        if (this._game.sfxEnabled === true) {
            this.sfxButton.frame = 3;
        } else if (this._game.sfxEnabled === false) {
            this.sfxButton.frame = 5;
        }
        this.sfxButton.anchor.setTo(0.5);
        this.sfxButton.scale.setTo(0.8);
        this.sfxButton.inputEnabled = true;
        this.sfxButton.input.priorityID = 1;
        this.sfxButton.events.onInputDown.add(function() {
            this._game.fx.playFX('click');
            if (this._game.sfxEnabled === true) {
                this._game.sfxEnabled = false;
                this.sfxButton.frame = 5;
            } else if (this._game.sfxEnabled === false) {
                this._game.sfxEnabled = true;
                this.sfxButton.frame = 3;
            }
        }, this);
        this.addChild(this.sfxButton);
    }

    createMusicButton(y) {
        this.musicButton = this._game.add.sprite(0, y, 'buttons', 4);
        if (this._game.musicEnabled === true) {
            this.musicButton.frame = 4;
        } else if (this._game.musicEnabled === false) {
            this.musicButton.frame = 6;
        }
        this.musicButton.anchor.setTo(0.5);
        this.musicButton.scale.setTo(0.8);
        this.musicButton.inputEnabled = true;
        this.musicButton.input.priorityID = 1;
        this.musicButton.events.onInputDown.add(function() {
            this._game.fx.playFX('click');
            if (this._game.musicEnabled === true) {
                this._game.musicEnabled = false;
                this.musicButton.frame = 6;
                this._game.menuTrack.stopTrack();
                this._game.gameTrack.stopTrack();
            } else if (this._game.musicEnabled === false) {
                this._game.musicEnabled = true;
                this.musicButton.frame = 4;
                if (this._state.key === 'Game') {
                    this._game.gameTrack.playTrack();
                } else if (this._state.key === 'Menu') {
                    this._game.menuTrack.playTrack();
                }
            }
        }, this);
        this.addChild(this.musicButton);
    }
}