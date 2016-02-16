export default class GridBackground extends Phaser.Sprite {

	constructor(game, x, y, key) {
		super(game, x, y, key);
		this._game = game;
		this.initSetup();
	}

	initSetup() {
        this.clicked = new Phaser.Signal();
        this.inputEnabled = true;
        this.events.onInputDown.add(function() {
            this.clicked.dispatch(this._game.input);
        }, this);
	}
}