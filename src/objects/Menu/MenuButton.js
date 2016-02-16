export default class MenuButton extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        this._game = game;
        this._game.add.existing(this);
        this.setup();
    }

    setup() {
        this.clicked = new Phaser.Signal();
        this.anchor.setTo(0.5);
        this.frame = 1;
        this.inputEnabled = true;
        this.events.onInputDown.add(function() {
            this.frame = 0;
        }, this);
        this.events.onInputUp.add(function() {
            this.frame = 1;
            // dispatch the custom event
            this.clicked.dispatch('hello');
        }, this);
    }
}