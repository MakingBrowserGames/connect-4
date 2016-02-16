import Disc from 'objects/Game/Disc';

export default class Grid {

    constructor(game, state) {
        this._game = game;
        this._state = state;
        this.initSetup();
    }

    initSetup() {
        this._discs = this._game.add.group();
        this._grid = [];
        // offset of grid x and y in relation to world x and y
        this._offsetX = 260;
        this._offsetY = 120;
        // size of each slot
        this._individualSize = 120;
        // gap between slots
        this._margin = 40;
        // create a grid of 5 columns and 7 rows
        this.createGrid(5, 7);
    }

    createGrid(rows, columns) {
        for (let y = 0; y < rows; y++) {
            this._grid.push([])
            for (let x = 0; x < columns; x++) {
                // add ther cell details to the grid array
                this._grid[y].push({
                    x: this._offsetX + (x * (this._individualSize + this._margin)),
                    y: this._offsetY + (y * (this._individualSize + this._margin)),
                    colMin: x * (this._individualSize + this._margin),
                    posX: x,
                    posY: y,
                    colour: null,
                    contents: null
                });
            }
        }
    }

    createDisc(col, colour) {
        // if(col) won't work as 0 counts as negative
        if (col !== null || col !== undefined) {
            // get the row inside the column that's empty
            let row = this.getDropTo(col);
            // get the cell object from col and row positions
            let cell = this.getCell(col, row);
            // cell won't exist if there isn't an empty space to drop
            if (cell) {
                cell.colour = colour;
                cell.contents = this._discs.add(new Disc(this._game, cell.x + this._individualSize * 0.5, 0 + this._offsetY + this._individualSize * 0.5, colour, cell.y + this._individualSize * 0.5), colour);
                // wait for callback, then check the board
                cell.contents.events.onDropComplete.add(function() {
                    if (this.calculateMatch(colour, this._grid)) {
                        // a player won the game
                        this._state.gameWon();
                    } else {
                        if (this.gridFull()) {
                             this._game.stateChange.darkenScreen('Game', {});
                        } else {
                            this._state.nextPlayer();
                        }

                    }
                }, this);
            }
        }
    }

    getCell(col, row) {
        // return the cell by position values
        for (let y = 0; y < this._grid.length; y++) {
            for (let x = 0; x < this._grid[y].length; x++) {
                if (this._grid[y][x].posY === row && this._grid[y][x].posX === col) {
                    return this._grid[y][x];
                }
            }
        }
    }

    calculateMatch(checkingColour, grid) {

        // setup checking pattern. There is no point checking downwards: if each cell
        // is checked from bottom up, the checker would have already run over this 
        let pattern = {
            0: {
                x: 1,
                y: 0
            },
            1: {
                x: 1,
                y: -1
            },
            2: {
                x: 0,
                y: -1
            },
            3: {
                x: -1,
                y: -1
            },
            4: {
                x: -1,
                y: 0
            }
        }

        // check grid array in reverse - most games are won in the first few rows
        // so checking from top down is a waste on performance

        let won = false;
        for (let y = this._grid.length - 1; y >= 0; y--) {
            for (let x = this._grid[0].length - 1; x >= 0; x--) {
                let initCell = this.getCell(x, y);
                // check that starting cell is valid
                if (initCell) {
                    for (let i in pattern) {
                        let counter = 0;
                        // while loop could be used here, and would save some itterations that were not necessary
                        // but would require more bubble wrapping as it presents a higher chance of causing browser crash
                        for (let s = 0; s < 4; s++) {
                            let nextCell = this.getCell(initCell.posX + pattern[i].x * s, initCell.posY + pattern[i].y * s);
                            if (this.match(initCell, nextCell)) {
                                counter++;
                            }
                        }
                        if (counter === 4) {
                            won = true;
                        }
                    }
                }
            }
        }
        if (won) {
            return true;
        } else {
            return false;
        }
    }

    getDropTo(col) {
        let dropCounter = 0;
        for (let y = 0; y < this._grid.length; y++) {
            for (let x = 0; x < this._grid[0].length; x++) {
                if (this._grid[y][x].posX === col) {
                    if (this.isEmpty(this._grid[y][x])) {
                        dropCounter++;
                    }
                }
            }
        }
        return dropCounter - 1;
    }

    isEmpty(cell) {
        // chgeck if the cell is empty
        if (cell.contents === null) {
            return true;
        }
    }

    match(cell1, cell2) {
        if (cell1 && cell2) {
            if (cell1.colour !== null && cell2.colour !== null && cell1.colour === cell2.colour) {
                return true;
            } else {
                return false;
            }
        }
    }

    gridFull() {
        let counter = 0;
        for (let y = 0; y < this._grid.length; y++) {
            for (let x = 0; x < this._grid[0].length; x++) {
                if (this.isEmpty(this._grid[y][x])) {
                    counter++;
                }
            }
        }
        // could use a ternary operator - code will be minefied 
        // so standard if else block makes for easier reading
        if (counter === 0) {
            return true;
        } else {
            return false
        }
    }

    empty() {
        let counter = 1;
        for (let y = this._grid.length - 1; y >= 0; y--) {
            for (let x = this._grid[0].length - 1; x >= 0; x--) {
                if (!this.isEmpty(this._grid[y][x])) {
                    this._game.time.events.add(counter * 25, function() {
                        this._grid[y][x].contents.drop();
                    }, this);
                }
                counter++;
            }
        }
    }

    get grid() {
        return this._grid;
    }

    get individualSize() {
        return this._individualSize;
    }

    get offsetX() {
        return this._offsetX;
    }

    get offsetY() {
        return this._offsetY;
    }
}
