export class Slime {
  constructor(scene, x, y, id) {
    this.scene = scene;
    this.id = id;
    this.level = 1;
    this.maxHp = 45;
    this.hp = 45;
    this.exp = 12;
    this.dead = false;

    this.shadow = scene.add.ellipse(x, y + 15, 42, 13, 0x000000, .2).setDepth(7);
    this.body = scene.add.ellipse(x, y, 42, 34, 0x79bd62).setStrokeStyle(3, 0x315c35).setDepth(8).setInteractive({ useHandCursor:true });
    this.eyeL = scene.add.circle(x-8, y-4, 3, 0x172018).setDepth(9);
    this.eyeR = scene.add.circle(x+8, y-4, 3, 0x172018).setDepth(9);
    this.name = scene.add.text(x, y-35, 'สไลม์ป่า Lv.1', {fontFamily:'Tahoma',fontSize:'13px',color:'#ffffff',stroke:'#18351d',strokeThickness:3}).setOrigin(.5).setDepth(9);
    this.hpBg = scene.add.rectangle(x, y-22, 44, 5, 0x382c2c).setDepth(9);
    this.hpBar = scene.add.rectangle(x-22, y-22, 44, 5, 0x63bd57).setOrigin(0,.5).setDepth(10);
    scene.physics.add.existing(this.body, true);

    this.body.on('pointerdown', (pointer) => {
      pointer.event.stopPropagation();
      if (!this.dead) scene.selectMonster(this);
    });
  }

  setSelected(value){ this.body.setStrokeStyle(value ? 4 : 3, value ? 0xf5d15d : 0x315c35); }

  takeDamage(amount){
    if(this.dead) return false;
    this.hp = Math.max(0, this.hp - amount);
    this.hpBar.width = 44 * (this.hp / this.maxHp);
    const t=this.scene.add.text(this.body.x, this.body.y-48, `-${amount}`, {fontFamily:'Tahoma',fontSize:'20px',fontStyle:'bold',color:'#fff2a6',stroke:'#5b211b',strokeThickness:4}).setOrigin(.5).setDepth(30);
    this.scene.tweens.add({targets:t,y:t.y-30,alpha:0,duration:650,onComplete:()=>t.destroy()});
    if(this.hp<=0){ this.die(); return true; }
    this.scene.tweens.add({targets:[this.body,this.eyeL,this.eyeR],scaleX:1.15,scaleY:.82,yoyo:true,duration:80});
    return false;
  }

  die(){
    this.dead=true; this.setSelected(false); this.body.disableInteractive();
    this.scene.tweens.add({targets:[this.body,this.eyeL,this.eyeR,this.shadow,this.name,this.hpBg,this.hpBar],alpha:0,scaleY:.4,duration:300,onComplete:()=>this.destroyVisuals()});
  }

  destroyVisuals(){ [this.body,this.eyeL,this.eyeR,this.shadow,this.name,this.hpBg,this.hpBar].forEach(o=>o?.destroy()); }
}
