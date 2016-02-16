export default class StateChange {

    constructor(game) {
        this._game = game;
    }

    darkenScreen(stateTo, params) {
        let crossFadeBitmap = this._game.make.bitmapData(this._game.width, this._game.height);
        crossFadeBitmap.rect(0, 0, this._game.width, this._game.height, 'rgb(0,0,0)');
        let overlay = this._game.add.sprite(0, 0, crossFadeBitmap);
        overlay.alpha = 0
        let fadeTween = this._game.add.tween(overlay);
        fadeTween.to({ alpha: 1 }, 350);
        fadeTween.onComplete.add(function() {
            this.changeState(stateTo, params);
        }, this);
        fadeTween.start();
    }

    changeState(stateTo, params) {
            this._game.state.start(stateTo, true, false, params);
    }

    fadeIn(state) {
    	let crossFadeBitmap = this._game.make.bitmapData(this._game.width, this._game.height);
        crossFadeBitmap.rect(0, 0, this._game.width, this._game.height, 'rgb(0,0,0)');
        let overlay = this._game.add.sprite(0, 0, crossFadeBitmap);
        overlay.alpha = 1
        let fadeTween = this._game.add.tween(overlay);
        fadeTween.to({ alpha: 0 }, 500);
        fadeTween.onComplete.add(function() {
        	if (typeof(state.fadeInComplete) === 'function' && state.faceInComplete !== null) {
        		state.fadeInComplete();
        	}
        }, this);
        fadeTween.start();
    }
}
