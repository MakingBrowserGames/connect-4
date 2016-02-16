import WhiteBoard from 'objects/GUI/WhiteBoard';
import Widget from 'objects/GUI/Widget';
import ChipEmitter from 'objects/GUI/ChipEmitter';


export default class Gameover extends Phaser.State {

    init(params) {
    	this.winner = params.winner;
        this.player1 = params.player1;
        this.player2 = params.player2;
        this.score1 = params.score1;
        this.score2 = params.score2;
    }

    create() {
        this.background = this.game.add.image(0, 0, 'gameOverBackground');

        this.chips = new ChipEmitter(this.game, this.game.width * 0.5, -500, 250, 'dicsSprite');
        // uncomment line below for emitter. Works great, I just don't like the look.
        //this.chips.startEmitter();

        this.widget = new Widget(this.game, this);
        // create winner text and tween it in
        this.winnerText = this.game.add.bitmapText(this.game.width * 0.5, 150, '3d', this.winner.toUpperCase(), 150);
        this.winnerText.anchor.setTo(0.5);
        this.winnerText.scale.setTo(0);
        this.popIn(this.winnerText, 300);

        // create the wins text and tween it in
        this.winsText = this.game.add.bitmapText(this.game.width * 0.5, 300, '3d', 'WINS!', 150);
        this.winsText.anchor.setTo(0.5);
        this.winsText.scale.setTo(0);
        this.popIn(this.winsText, 650);

        // create home button
        this.homeButton = this.game.add.sprite(180, 500, 'buttons', 1);
        this.homeButton.anchor.setTo(0.5);
        this.homeButton.scale.setTo(2);
        this.homeButton.inputEnabled = true;
        this.homeButton.events.onInputDown.add(function() {
            this.game.fx.playFX('click');
            this.game.stateChange.darkenScreen('Menu', {});
        }, this);

        // create go retry button
        // create home button
        this.retryButton = this.game.add.sprite(1450, 500, 'buttons', 2);
        this.retryButton.anchor.setTo(0.5);
        this.retryButton.scale.setTo(2);
        this.retryButton.inputEnabled = true;
        this.retryButton.events.onInputDown.add(function() {
            this.game.fx.playFX('click');
            this.game.stateChange.darkenScreen('Game', {});
        }, this);

        // create whitebaord
        this.whiteBoard = new WhiteBoard(this.game, this, this.player1, this.player2, this.score1.toString(), this.score2.toString());

        this.game.stateChange.fadeIn(this);
        this.game.fx.playFX('gameWin');
    }

    popIn(object, delay) {
    	this.game.add.tween(object.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Bounce.Out, true, delay);
    }
}