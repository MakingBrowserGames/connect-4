export default class WhiteBoard extends Phaser.Sprite {

	constructor(game, state, name1, name2, score1, score2) {
		super(game, game.width * 0.5, 450, 'whiteBoard')
		this._game = game;
		this._state = state;
		this._name1 = name1;
		this._name2 = name2;
		this._score1 = score1;
		this._score2 = score2;
		this.initSetup();
	}

	initSetup() {
		this.addScorer1();
		this.addScorer2();
		this.addScore1();
		this.addScore2();
		this.anchor.setTo(0.5, 0);
		this.swing();
		this._game.add.existing(this);
	}

	addScorer1() {
		this.scorer1Text = this._game.add.bitmapText(-170, 155, '3d', this._name1, 60);
        this.scorer1Text.anchor.setTo(0.5);
        this.scorer1Text.angle = -2;
        this.addChild(this.scorer1Text);
	}

	addScorer2() {
		this.scorer2Text = this._game.add.bitmapText(180, 150, '3d', this._name2, 60);
        this.scorer2Text.anchor.setTo(0.5);
        this.scorer2Text.angle = 1;
        this.addChild(this.scorer2Text);
	}

	addScore1() {
		this.score1 = this._game.add.bitmapText(-170, 305, '3d', this._score1 , 85);
		this.score1.anchor.setTo(0.5);
		this.score1.scale.setTo(0);
        this.score1.angle = 1;
        this.addChild(this.score1);
        this.popIn(this.score1, 250);
	}

	addScore2() {
		this.score2 = this._game.add.bitmapText(160, 297, '3d', this._score2 , 85);
		this.score2.anchor.setTo(0.5);
		this.score2.scale.setTo(0);
        this.score2.angle = 1;
        this.addChild(this.score2);
        this.popIn(this.score2, 500);
	}

	swing() {
		this._game.add.tween(this).to({ angle:1 }, 2200, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
	}

	popIn(object, delay) {
    	this.game.add.tween(object.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Bounce.Out, true, delay);
    }
}