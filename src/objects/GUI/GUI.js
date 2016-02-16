import GridBackground from 'objects/GUI/GridBackground';

export default class GUI {

    constructor(game, state) {
        this._game = game;
        this._state = state;
        this.group = this._game.add.group();
        this.createGrid();
    }

    createGrid() {
        this.gridBackground = new GridBackground(this._game, 0, 0, 'gridBackground');
        this.group.add(this.gridBackground);
        // listen for custom signal on grid background clicked
        this.gridBackground.clicked.add(function(input) {
            // put check to see if it's player's turn
            if (this._state.players !== undefined) {
                this._state.players[this._state.currentPlayer].move(input.x, input.y);
            }
        }, this);
    }
}