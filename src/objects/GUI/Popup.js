export default class Popup {

    constructor(game, state) {
        this._game = game;
        this._state = state;
    }

    blurBackground(world) {
        let blurX = this._game.add.filter('BlurX');
        let blurY = this._game.add.filter('BlurY');
        for (let i of world) {
            i.filters = [blurX, blurY];
        }
    }

    removeBlur(world) {
        let blurX = this._game.add.filter('BlurX');
        let blurY = this._game.add.filter('BlurY');
        for (let i of world) {
            i.filters = null;
        }
    }

    selectMode() {
        // create sign sprite
        let singleSign = this._game.add.image(-500, this._game.height, 'selectModeSign');
        singleSign.anchor.setTo(0.5, 1);
        singleSign.angle = -50;
        // create the hitbox over the computer
        let hitboxComputer = this._game.add.image(-260, -600, 'mediumHitBox');
        singleSign.addChild(hitboxComputer);
        hitboxComputer.inputEnabled = true;
        // on input down, play click sound fx, then delay and play woosh sound fx
        hitboxComputer.events.onInputDown.add(function() {
            this._game.fx.playFX('click');
            this._game.time.events.add(300, function() {
                this._game.fx.playFX('woosh');
            }, this);
            let tweenOut = this._game.add.tween(singleSign).to({
                y: 2000
            }, 500, Phaser.Easing.Exponential.In, true, );
            // on tween complete inform game that user has made a selection
            // and destroy this sprite and it's children
            tweenOut.onComplete.add(function() {
                this._state.modeSelected('computer');
                singleSign.destroy();
            }, this);
        }, this);

        // create the hitbox over the computer
        let hitboxPlayer = this._game.add.image(15, -600, 'mediumHitBox');
        singleSign.addChild(hitboxPlayer);
        hitboxPlayer.inputEnabled = true;
        hitboxPlayer.events.onInputDown.add(function() {
            // on input down, play click sound fx, then delay and play woosh sound fx
            this._game.fx.playFX('click');
            this._game.time.events.add(300, function() {
                this._game.fx.playFX('woosh');
            }, this);
            let tweenOut = this._game.add.tween(singleSign).to({
                y: 2000
            }, 500, Phaser.Easing.Exponential.In, true);
            // on tween complete inform game that user has made a selection
            // and destroy this sprite and it's children
            tweenOut.onComplete.add(function() {
                this._state.modeSelected('player');
                singleSign.destroy();
            }, this);
        }, this);

        // tween sign in
        this._game.add.tween(singleSign).to({
            x: this._game.width * 0.5
        }, 250, Phaser.Easing.Linear.In, true);
        this._game.add.tween(singleSign).to({
            angle: '+50'
        }, 600, Phaser.Easing.Bounce.Out, true, 150);
    }


}
