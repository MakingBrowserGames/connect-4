import MenuButton from 'objects/Menu/MenuButton';
import Widget from 'objects/GUI/Widget';

export default class Menu extends Phaser.State {

    create() {
        this.map = this.game.add.group();
        this.background = this.game.add.image(0, 0, 'menuBackground');
        this.cloudLayer1 = this.game.add.tileSprite(0, 0, 1600, 960, 'menuBackgroundCloud1');
        this.cloudLayer2 = this.game.add.tileSprite(0, 0, 1600, 960, 'menuBackgroundCloud2');

        // create game logo
        this.menuLogo = this.game.add.image(this.game.width * 0.5, -150, 'gameLogo');
        this.menuLogo.anchor.setTo(0.5);

        // instantiate widget class
        this.widget = new Widget(this.game, this);

        // creating the play game button
        this.playButton = new MenuButton(this.game, this.game.width * 0.5 + 2000, 750, 'playButton');
        this.playButton.clicked.add(function() {
            this.game.fx.playFX('click');
            this.playGame();
        }, this);

        this.game.stateChange.fadeIn(this);
    }

    fadeInComplete() {
        // tween logo in
        let tweenLogoIn = this.game.add.tween(this.menuLogo).to({
            y: 150
        }, 750, Phaser.Easing.Bounce.Out).start();
        tweenLogoIn.onComplete.add(function() {
            // on tween complete, start hover tween
            this.hover(this.menuLogo, 200);
        }, this);
        this.moveButtonLeft(this.playButton, 500, 150);
        // play menu background music
        this.game.menuTrack.playTrack();
    }

    update() {
        this.cloudLayer1.tilePosition.x += 0.5;
        this.cloudLayer2.tilePosition.x += 0.2;
    }

    playGame() {
        // move the first three menu buttons left, then the mode select in from the right
        this.moveButtonLeft(this.playButton, 500, 50);
        this.shrink(this.menuLogo);
        this.game.time.events.add(Phaser.Timer.SECOND * 0.4, function() {
            this.game.menuTrack.stopTrack();
            this.game.stateChange.darkenScreen('Game', {});
        }, this);
    }

    moveButtonLeft(object, time, delay) {
        // easing tween to move button objects left
        this.game.time.events.add(delay, function() {
            this.game.add.tween(object).to({
                x: object.x - 2000
            }, time, Phaser.Easing.Exponential.InOut).start();
        }, this);
    }

    hover(object, value) {
        this.game.add.tween(object).to({ y: value }, 2200, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
    }

    shrink(object) {
        this.game.add.tween(object.scale).to({ x: 0, y: 0 }, 250, Phaser.Easing.Quadratic.InOut, true);
    }
}
