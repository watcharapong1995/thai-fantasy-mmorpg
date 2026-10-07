import { VillageScene } from './scenes/VillageScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1280,
  height: 720,
  backgroundColor: '#15261c',
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [VillageScene]
};

new Phaser.Game(config);
