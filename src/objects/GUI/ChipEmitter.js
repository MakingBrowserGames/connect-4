export default class ChipEmitter extends Phaser.Particles.Arcade.Emitter {

	constructor(game, x, y, maxParticles, key) {
		super(game, x, y, maxParticles);
		this.makeParticles(key, [0,1,2,3]);
	}

	startEmitter() {
		this.start(false, 7500, 20);
	}

	stopEmitter() {

	}
}