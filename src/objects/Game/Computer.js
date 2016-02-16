export default class Computer {

    constructor(game, state, colour, classType) {
        this._game = game;
        this._state = state;
        this._colour = colour;
        this._classType = classType;
        this.initSetup();
    }

    initSetup() {
        this._turnActive = false;
    }

    ready() {
        this._turnActive = true;
        this.makeMove();
    }

    makeMove() {
        if (this._turnActive) {
            this._turnActive = false;
            let move = this.calculatePossibleMoves();
            if (this.isValidMove(move)) {
                this._state.grid.createDisc(move, this._colour);
            } else {
                this.ready();
            }
        }
    }

    isValidMove(row) {
        if (row >= 0 && this._state.grid.getDropTo(row) > -1) {
            return true;
        }
    }

    calculatePossibleMoves() {

        // -------------------------------- Heuristics Algorithm ------------------------------- //

        // copy current grid to test grid so changes don't take effect
        let gridBackup = Array.from(this._state.grid.grid);
        let move = null;

        let computerTurn1 = this.checkForWinningMove(this._colour, gridBackup);
        if (computerTurn1 === false) {
            // computer can't win in the next move
            let playerTurn1 = this.checkForWinningMove(this._state.player.colour, gridBackup);
            if (playerTurn1 === false) {
                // player can't win in the next move
                return this._game.rnd.integerInRange(0, 6);
            } else {
                // player can win in the next move
                return playerTurn1
            }
        } else {
            //computer can win in the next move
            return computerTurn1;
        }
    }

    checkForWinningMove(colour, array) {
        let move = null;
        for (let s = 0; s < array[0].length; s++) {
            let row = this._state.grid.getDropTo(array[0][s].posX);
            if (this.isValidMove(row)) {
                array[row][s].colour = colour;
                let result = this._state.grid.calculateMatch(colour, array);
                array[row][s].colour = null;
                if (result === true) {
                    return s;
                }
            }
        }
        if (move === null) {
            return false;
        }
    }

    move() {

    }

    get classType() {
        return this._classType;
    }
}
