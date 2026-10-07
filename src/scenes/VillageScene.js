import { Player } from '../entities/Player.js';

export class VillageScene extends Phaser.Scene {
  constructor(){ super('VillageScene'); }

  create(){
    this.worldW=2400; this.worldH=1600;
    this.physics.world.setBounds(0,0,this.worldW,this.worldH);
    this.cameras.main.setBounds(0,0,this.worldW,this.worldH);

    this.drawWorld();
    this.blockers=this.physics.add.staticGroup();
    this.createCollisionZones();

    this.player=new Player(this,1150,850);
    this.physics.add.collider(this.player.body,this.blockers,()=>this.player.stop());

    this.cameras.main.startFollow(this.player.body,true,.08,.08);
    this.cameras.main.setZoom(1.12);

    this.input.on('pointerdown',(p)=>{
      if(p.leftButtonDown()) this.player.moveTo(p.worldX,p.worldY);
    });

    this.createHUD();
  }

  drawWorld(){
    const g=this.add.graphics();
    g.fillStyle(0x739552).fillRect(0,0,this.worldW,this.worldH);
    // winding dirt roads
    g.lineStyle(150,0xc7aa72,1);
    g.beginPath(); g.moveTo(0,900); g.lineTo(650,850); g.lineTo(1180,900); g.lineTo(1700,760); g.lineTo(2400,810); g.strokePath();
    g.lineStyle(105,0xd1b982,1); g.beginPath(); g.moveTo(1170,0); g.lineTo(1160,520); g.lineTo(1180,900); g.lineTo(1230,1600); g.strokePath();
    // river
    g.fillStyle(0x438da0).fillRoundedRect(1750,0,360,1600,120);
    g.lineStyle(10,0x78b8b3,.7); for(let y=70;y<1550;y+=100){g.lineBetween(1785,y,2050,y+25)}
    // rice/field patches
    for(let x=160;x<700;x+=55) for(let y=180;y<650;y+=45){g.lineStyle(4,0x526f38,.8).lineBetween(x,y,x+18,y-18)}
    // houses
    [[820,590],[1040,540],[1320,570],[1450,930],[850,1040]].forEach(([x,y])=>this.house(x,y));
    // trees
    for(let i=0;i<90;i++){
      const x=Phaser.Math.Between(60,2340), y=Phaser.Math.Between(60,1540);
      if(Math.abs(x-1180)<250 || (x>1700&&x<2140)) continue;
      this.tree(x,y);
    }
    this.add.text(1120,370,'บ้านป่าหลวง',{fontFamily:'Tahoma',fontSize:'34px',color:'#fff4c7',stroke:'#352418',strokeThickness:6}).setOrigin(.5).setDepth(5);
    this.add.text(1120,410,'หมู่บ้านชายป่า • ดินแดนเริ่มต้น',{fontFamily:'Tahoma',fontSize:'16px',color:'#fff'}).setOrigin(.5).setDepth(5);
  }

  house(x,y){
    const g=this.add.graphics().setDepth(3);
    g.fillStyle(0x69482f).fillRect(x-65,y-10,130,80);
    g.fillStyle(0x9b4d35).fillTriangle(x-85,y,x,y-70,x+85,y);
    g.fillStyle(0x35251d).fillRect(x-14,y+28,28,42);
    g.fillStyle(0xc9a467).fillRect(x-50,y+15,26,25); g.fillRect(x+25,y+15,26,25);
  }

  tree(x,y){
    this.add.ellipse(x,y+18,50,18,0x000000,.13).setDepth(1);
    this.add.rectangle(x,y,12,38,0x65442d).setDepth(2);
    this.add.circle(x,y-22,30,0x355f39).setDepth(3);
    this.add.circle(x-18,y-15,22,0x447748).setDepth(3);
    this.add.circle(x+18,y-14,23,0x4e804a).setDepth(3);
  }

  createCollisionZones(){
    const add=(x,y,w,h)=>{const z=this.add.rectangle(x,y,w,h,0xff0000,0); this.physics.add.existing(z,true); this.blockers.add(z);};
    [[820,610,155,120],[1040,560,155,120],[1320,590,155,120],[1450,950,155,120],[850,1060,155,120]].forEach(v=>add(...v));
    add(1930,800,350,1600); // river
    // outer forest obstacles, leaving village roads open
    [[250,800,420,150],[500,1350,700,130],[2200,350,300,500],[2220,1280,300,450]].forEach(v=>add(...v));
  }

  createHUD(){
    const cam=this.cameras.main;
    const panel=this.add.rectangle(18,18,315,92,0x172018,.88).setOrigin(0).setScrollFactor(0).setDepth(100).setStrokeStyle(2,0xc6a766,.8);
    this.add.text(34,30,'นักผจญภัยฝึกหัด  •  Lv.1',{fontFamily:'Tahoma',fontSize:'18px',color:'#f8e8b8'}).setScrollFactor(0).setDepth(101);
    this.add.text(34,59,'HP 125 / 125',{fontFamily:'Tahoma',fontSize:'14px',color:'#fff'}).setScrollFactor(0).setDepth(101);
    this.add.rectangle(34,82,270,12,0x3a332d).setOrigin(0).setScrollFactor(0).setDepth(101);
    this.add.rectangle(34,82,270,12,0xb84c45).setOrigin(0).setScrollFactor(0).setDepth(102);
    this.add.text(20,680,'คลิกพื้นเพื่อเดิน  •  Milestone 1: บ้านป่าหลวง',{fontFamily:'Tahoma',fontSize:'16px',color:'#fff',backgroundColor:'#172018cc',padding:{x:10,y:6}}).setScrollFactor(0).setDepth(101);
    this.add.text(1050,22,'ต้นแบบ v0.1',{fontFamily:'Tahoma',fontSize:'15px',color:'#ffe9a6',backgroundColor:'#172018cc',padding:{x:10,y:6}}).setScrollFactor(0).setDepth(101);
  }

  update(){ if(this.player) this.player.update(); }
}
