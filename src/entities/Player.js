export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.speed = 230;
    this.target = new Phaser.Math.Vector2(x, y);
    this.moving = false;

    this.shadow = scene.add.ellipse(x, y + 17, 28, 11, 0x000000, 0.28).setDepth(9);
    this.body = scene.add.circle(x, y, 15, 0xf0c88a).setStrokeStyle(3, 0x4a2b1b).setDepth(11);
    this.cloth = scene.add.rectangle(x, y + 15, 24, 23, 0xefe3bd).setStrokeStyle(2, 0x7a5534).setDepth(10);
    this.sash = scene.add.rectangle(x, y + 12, 25, 5, 0x9e3f31).setDepth(12);
    this.hair = scene.add.arc(x, y - 5, 15, 15, 180, 360, false, 0x241812).setDepth(12);
    this.marker = scene.add.circle(x, y, 7).setStrokeStyle(2, 0xf6d66b, .9).setVisible(false).setDepth(8);

    scene.physics.add.existing(this.body);
    this.body.body.setCircle(15).setCollideWorldBounds(true);
    this.body.body.setDrag(1000,1000);
  }

  moveTo(x, y) {
    this.target.set(x, y);
    this.marker.setPosition(x, y).setVisible(true);
    this.moving = true;
  }

  stop() {
    this.moving = false;
    this.body.body.setVelocity(0,0);
    this.marker.setVisible(false);
  }

  update() {
    if (this.moving) {
      const d = Phaser.Math.Distance.Between(this.body.x, this.body.y, this.target.x, this.target.y);
      if (d < 8) this.stop();
      else this.scene.physics.moveTo(this.body, this.target.x, this.target.y, this.speed);
    }
    const x=this.body.x, y=this.body.y;
    this.shadow.setPosition(x,y+17); this.cloth.setPosition(x,y+15); this.sash.setPosition(x,y+12); this.hair.setPosition(x,y-5);
  }
}
