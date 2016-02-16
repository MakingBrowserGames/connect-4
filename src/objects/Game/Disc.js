export default class Disc extends Phaser.Sprite {

    constructor(game, x, y, frame, dropY) {
        super(game, x, y, 'dicsSprite', frame);
        this._game = game;
        this._dropY = dropY
        this.initSetup();
    }

    initSetup() {
        this._game.fx.playFX('chipSelect');
        this.events.onDropComplete = new Phaser.Signal();
        this.anchor.setTo(0.5);
        this.scale.setTo(0);
        this.grow();
    }

    grow() {
        let tween = this._game.add.tween(this.scale).to({ x: 1, y: 1 }, 75, Phaser.Easing.Linear.In).start();
        tween.onComplete.add(this.dropTo, this);
    }

    dropTo() {
        let tween = this._game.add.tween(this).to({ y: this._dropY }, 550, Phaser.Easing.Bounce.Out).start();
        tween.onComplete.add(function() {
            this.events.onDropComplete.dispatch(true);
        }, this);
    }

    drop() {
    	this._game.fx.playFX('chipSelect');
        let tween = this._game.add.tween(this).to({ y: 1500 }, 550, Phaser.Easing.Exponential.InOut).start();
    }
}
