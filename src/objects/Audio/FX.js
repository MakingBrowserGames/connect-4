export default class AudioFX extends Phaser.Sound {

    constructor(game) {
        super(game, 'fx');
        this._game = game;
        this.addMarkers();
    }

    addMarkers() {
        // name, start time, duration, volume, loop
        this.addMarker('gameWin', 1, 3, 1, false);
        this.addMarker('gameLose', 4, 3, 1, false);
        this.addMarker('click', 8, 1, 1, false);
        this.addMarker('clickBlock', 9, 1, 1, false);
        this.addMarker('chipSelect', 10, 1, 1, false);
        this.addMarker('chipLand', 11, 1, 1, false);
        this.addMarker('woosh', 12, 1, 1, false);
    }

    playFX(key) {
    	if (this._game.sfxEnabled) {
			this.play(key);
        }
    }
}
