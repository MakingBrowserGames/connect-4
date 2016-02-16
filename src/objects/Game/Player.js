export default class Player {
	constructor(game, state, colour, classType) {
		this._game = game;
		this._state = state;
		this._colour = colour;
		this._classType = classType;
		this.initSetup();
	}

	initSetup() {
		this._turnActive = false;
		this._classType = this._classType;
	}

	move(x, y) {
		// player input called back from grid background - this is to 
		// alleviate checking if the player clicked on a grid before passinng
		// it to the grid class to process the move
		if (this._turnActive) {
			this._turnActive = false;
			let col = this.calculateColumn(x, y);
			if (col === false) {
				this._turnActive = true;
			} else {
				this._state.grid.createDisc(col, this._colour);
			}
		}	
	}

	ready() {
		this._turnActive = true;
	}

	calculateColumn(x, y) {
        x -= this._state.grid.offsetX;
        y -= this._state.grid.offsetY;

        // itterate through the grid and get the column reference
        for (let i = 0; i < this._state.grid.grid[0].length; i++) {
            if (x >= this._state.grid.grid[0][i].colMin && x <= this._state.grid.grid[0][i].colMin + this._state.grid.individualSize) {
                return i;
            }
        }
        return false
    }

	get turnActive() {
		return this._turnActive;
	}

	get colour() {
		return this._colour;
	}

	get classType() {
        return this._classType;
    }
}