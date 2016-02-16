export default class MenuTrack extends Phaser.Sound {

    constructor(game) {
        super(game, 'menu', 1, true);
        this._game = game;
    }

    stopTrack() {
        this.fadeOut(250);
        this.game.time.events.add(250, function() {
            this.stop();
        }, this);
    }

    playTrack() {
        if (this._game.musicEnabled) {
            this.volume = 1;
            this.play();
        }
    }
}
