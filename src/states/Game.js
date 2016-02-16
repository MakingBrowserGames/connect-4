import Player from 'objects/Game/Player';
import Computer from 'objects/Game/Computer';
import Grid from 'objects/Game/Grid';
import GUI from 'objects/GUI/GUI';
import Popup from 'objects/GUI/Popup';
import Widget from 'objects/GUI/Widget';

export default class Game extends Phaser.State {

    create() {
        this.backgroundImage = this.game.add.image(0, 0, 'gameBackground');
        // create the gui interface
        this.GUI = new GUI(this.game, this);
        // create the grid
        this.grid = new Grid(this.game, this)
        this.gridOverlay = this.game.add.image(0, 0, 'gridOverlay');
        // instantiate widget class
        this.widget = new Widget(this.game, this);
        // setup total number of moves
        this.moves = 0;
        // current player
        this.currentPlayer = 0;
        // instantiate popup class
        this.popup = new Popup(this.game, this);
        this.popup.blurBackground(this.world.children);
        this.game.stateChange.fadeIn(this);
        this.game.gameTrack.playTrack();
    }

    fadeInComplete() {
        this.popup.selectMode();
    }

    modeSelected(mode) {
        this.popup.removeBlur(this.world.children);
        // if mode is vs computer, setup player and computer and add they to players array
        if (mode === 'computer') {
            this.player = new Player(this.game, this, 3, 'player1');
            this.computer = new Computer(this.game, this, 2, 'computer');
            this.players = [this.player, this.computer];
            this.firstMove();
        } else {
            // else setup two players and add them to the array, player 1 always goes first
            this.player1 = new Player(this.game, this, 3, 'player1');
            this.player2 = new Player(this.game, this, 2, 'player2');
            this.players = [this.player1, this.player2];
            this.firstMove();
        }
    }

    firstMove() {
        this.players[this.currentPlayer].ready();
    }

    nextPlayer() {
        if (this.currentPlayer >= this.players.length - 1) {
            this.currentPlayer = 0;
        } else {
            this.currentPlayer++;
        }
        this.players[this.currentPlayer].ready();
    }

    gameWon() {
        // if score exists, increase by one, else start at 1
        if (localStorage.getItem(this.players[this.currentPlayer].classType) !== null) {
            let currentScore = localStorage.getItem(this.players[this.currentPlayer].classType);
            currentScore++;
            localStorage.setItem(this.players[this.currentPlayer].classType, currentScore);
        } else {
            localStorage.setItem(this.players[this.currentPlayer].classType, 1);
        }

        // get play names
        let winner = this.players[this.currentPlayer].classType;
        let player1 = this.players[0].classType;
        let player2 = this.players[1].classType;

        // if they have score stored, fetch else it's 0;
        if (localStorage.getItem(this.players[0].classType) !== null) {
            var score1 = localStorage.getItem(this.players[0].classType);
        } else {
            var score1 = 0;
        }

        if (localStorage.getItem(this.players[1].classType) !== null) {
            var score2 = localStorage.getItem(this.players[1].classType);
        } else {
            var score2 = 0;
        }

        // empty the grid, stop the music and fade out to the game over state
        this.grid.empty();
        this.game.time.events.add(1200, function() {
            this.game.gameTrack.stopTrack();
            this.gameOver(winner, player1, player2, score1, score2);
        }, this);
    }

    gameOver(winner, player1, player2, score1, score2) {
        this.game.stateChange.darkenScreen('GameOver', {
            winner: winner,
            player1: player1,
            player2: player2,
            score1: score1,
            score2: score2
        });
    }
}
