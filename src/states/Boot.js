import StateChange from 'objects/GUI/StateChange';

export default class Boot extends Phaser.State {

    init() {
        // forces a logic update regardless of the delta timer
        this.game.forceSingleUpdate = true;
        this.game.scale.trackParentInterval = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        let that = this;
        window.addEventListener('resize', function() {
            that.game.scale.refresh();
        }, that);
        this.game.scale.refresh();
        this.game.stage.disableVisibilityChange = true;
    }

    preload() {
        this.load.image('loadingScreenBackground', 'assets/Gui/screenBackground.png');
    }

    create() {
        this.game.stateChange = new StateChange(this.game);
        this.game.state.start('Preload');
    }
}
