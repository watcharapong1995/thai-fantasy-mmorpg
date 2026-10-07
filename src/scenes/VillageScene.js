import { Player } from '../entities/Player.js';
import { Slime } from '../entities/Slime.js';

export class VillageScene extends Phaser.Scene {
 constructor(){super('VillageScene');}
 create(){
  this.worldW=2400;this.worldH=1600;this.physics.world.setBounds(0,0,this.worldW,this.worldH);this.cameras.main.setBounds(0,0,this.worldW,this.worldH);
  this.drawWorld();this.blockers=this.physics.add.staticGroup();this.createCollisionZones();
  this.player=new Player(this,1150,850);this.physics.add.collider(this.player.body,this.blockers,()=>this.player.stop());
  this.slimes=[];[[650,780],[530,980],[1550,720],[1510,1120],[720,1180]].forEach((p,i)=>this.slimes.push(new Slime(this,p[0],p[1],i)));
  this.selectedMonster=null;this.cameras.main.startFollow(this.player.body,true,.08,.08);this.cameras.main.setZoom(.92);
  this.input.on('pointerdown',(p,objects)=>{if(!p.leftButtonDown()||objects.length)return;if(this.selectedMonster)this.selectedMonster.setSelected(false);this.selectedMonster=null;this.player.moveTo(p.worldX,p.worldY);});
  this.createHUD();this.refreshHUD();
 }
 selectMonster(m){if(this.selectedMonster&&this.selectedMonster!==m)this.selectedMonster.setSelected(false);this.selectedMonster=m;m.setSelected(true);this.player.attackTarget(m);}
 playAttackFx(player,target){
  const x1=player.body.x,y1=player.body.y,x2=target.x,y2=target.y;const slash=this.add.graphics().setDepth(40);slash.lineStyle(5,0xffe6a3,.95);slash.beginPath();slash.moveTo(x1,y1-10);slash.lineTo((x1+x2)/2+8,(y1+y2)/2-16);slash.lineTo(x2,y2);slash.strokePath();this.tweens.add({targets:slash,alpha:0,duration:170,onComplete:()=>slash.destroy()});
  this.cameras.main.shake(70,.0025);
 }
 playerAttack(m,dmg){const x=m.body.x,y=m.body.y;const killed=m.takeDamage(dmg);if(killed){this.player.gainExp(m.exp);const money=Phaser.Math.Between(3,6);this.player.addMoney(money);this.showToast(`+${m.exp} EXP   +${money} เบี้ย`);this.spawnLoot(x,y);this.selectedMonster=null;}}
 spawnLoot(x,y){if(Math.random()>.65)return;const glow=this.add.circle(x,y,15,0xe4e36b,.25).setDepth(14),item=this.add.ellipse(x,y,15,9,0x86c95e).setStrokeStyle(2,0xe9f0b2).setDepth(15).setInteractive({useHandCursor:true}),label=this.add.text(x,y-20,'ใบฟื้นพลัง',{fontFamily:'Tahoma',fontSize:'12px',color:'#fff',stroke:'#21351f',strokeThickness:3}).setOrigin(.5).setDepth(15);item.on('pointerdown',(p)=>{p.event.stopPropagation();const d=Phaser.Math.Distance.Between(this.player.body.x,this.player.body.y,x,y);if(d<85){glow.destroy();item.destroy();label.destroy();this.showToast('เก็บ ใบฟื้นพลัง ×1');}else this.showToast('เข้าใกล้ไอเทมอีกนิด');});this.tweens.add({targets:glow,alpha:.55,scale:1.25,yoyo:true,repeat:-1,duration:700});}
 showToast(msg){const t=this.add.text(640,100,msg,{fontFamily:'Tahoma',fontSize:'21px',color:'#fff5bd',backgroundColor:'#172018dd',padding:{x:16,y:8},stroke:'#4b321e',strokeThickness:2}).setOrigin(.5).setScrollFactor(0).setDepth(200);this.tweens.add({targets:t,y:78,alpha:0,delay:850,duration:450,onComplete:()=>t.destroy()});}
 drawWorld(){const g=this.add.graphics();g.fillStyle(0x739552).fillRect(0,0,this.worldW,this.worldH);g.lineStyle(150,0xc7aa72,1);g.beginPath();g.moveTo(0,900);g.lineTo(650,850);g.lineTo(1180,900);g.lineTo(1700,760);g.lineTo(2400,810);g.strokePath();g.lineStyle(105,0xd1b982,1);g.beginPath();g.moveTo(1170,0);g.lineTo(1160,520);g.lineTo(1180,900);g.lineTo(1230,1600);g.strokePath();g.fillStyle(0x438da0).fillRoundedRect(1750,0,360,1600,120);g.lineStyle(10,0x78b8b3,.7);for(let y=70;y<1550;y+=100)g.lineBetween(1785,y,2050,y+25);for(let x=160;x<700;x+=55)for(let y=180;y<650;y+=45)g.lineStyle(4,0x526f38,.8).lineBetween(x,y,x+18,y-18);[[820,590],[1040,540],[1320,570],[1450,930],[850,1040]].forEach(([x,y])=>this.house(x,y));for(let i=0;i<90;i++){const x=Phaser.Math.Between(60,2340),y=Phaser.Math.Between(60,1540);if(Math.abs(x-1180)<250||(x>1700&&x<2140))continue;this.tree(x,y);}this.add.text(1120,370,'บ้านป่าหลวง',{fontFamily:'Tahoma',fontSize:'34px',color:'#fff4c7',stroke:'#352418',strokeThickness:6}).setOrigin(.5).setDepth(5);}
 house(x,y){const g=this.add.graphics().setDepth(3);g.fillStyle(0x69482f).fillRect(x-65,y-10,130,80);g.fillStyle(0x9b4d35).fillTriangle(x-85,y,x,y-70,x+85,y);g.fillStyle(0x35251d).fillRect(x-14,y+28,28,42);g.fillStyle(0xc9a467).fillRect(x-50,y+15,26,25);g.fillRect(x+25,y+15,26,25);}
 tree(x,y){this.add.ellipse(x,y+18,50,18,0x000000,.13).setDepth(1);this.add.rectangle(x,y,12,38,0x65442d).setDepth(2);this.add.circle(x,y-22,30,0x355f39).setDepth(3);this.add.circle(x-18,y-15,22,0x447748).setDepth(3);this.add.circle(x+18,y-14,23,0x4e804a).setDepth(3);}
 createCollisionZones(){const add=(x,y,w,h)=>{const z=this.add.rectangle(x,y,w,h,0xff0000,0);this.physics.add.existing(z,true);this.blockers.add(z);};[[820,610,155,120],[1040,560,155,120],[1320,590,155,120],[1450,950,155,120],[850,1060,155,120]].forEach(v=>add(...v));add(1930,800,350,1600);[[250,800,420,150],[500,1350,700,130],[2200,350,300,500],[2220,1280,300,450]].forEach(v=>add(...v));}
 createHUD(){
  this.add.rectangle(14,14,330,108,0x172018,.92).setOrigin(0).setScrollFactor(0).setDepth(100).setStrokeStyle(2,0xc6a766,.8);this.hudName=this.add.text(28,25,'',{fontFamily:'Tahoma',fontSize:'17px',color:'#f8e8b8'}).setScrollFactor(0).setDepth(101);this.hudHp=this.add.text(28,51,'HP 125 / 125',{fontFamily:'Tahoma',fontSize:'13px',color:'#fff'}).setScrollFactor(0).setDepth(101);this.add.rectangle(28,72,285,9,0x3a332d).setOrigin(0).setScrollFactor(0).setDepth(101);this.add.rectangle(28,72,285,9,0xb84c45).setOrigin(0).setScrollFactor(0).setDepth(102);this.hudExp=this.add.text(28,91,'',{fontFamily:'Tahoma',fontSize:'13px',color:'#d8e9b0'}).setScrollFactor(0).setDepth(101);this.hudMoney=this.add.text(220,91,'',{fontFamily:'Tahoma',fontSize:'13px',color:'#ffe18a'}).setScrollFactor(0).setDepth(101);
  this.add.rectangle(640,692,1240,42,0x101812,.9).setScrollFactor(0).setDepth(99);this.add.text(640,692,'คลิกพื้น = เดิน     •     คลิกสไลม์ = เข้าหา + โจมตีอัตโนมัติ     •     คลิกของตก = เก็บ',{fontFamily:'Tahoma',fontSize:'14px',color:'#fff'}).setOrigin(.5).setScrollFactor(0).setDepth(101);this.add.text(1260,18,'v0.2.1',{fontFamily:'Tahoma',fontSize:'13px',color:'#ffe9a6',backgroundColor:'#172018dd',padding:{x:7,y:4}}).setOrigin(1,0).setScrollFactor(0).setDepth(101);
 }
 refreshHUD(){if(!this.hudName)return;this.hudName.setText(`นักผจญภัยฝึกหัด  •  Lv.${this.player.level}`);this.hudExp.setText(`EXP ${this.player.exp} / ${this.player.expToNext}`);this.hudMoney.setText(`${this.player.money} เบี้ย`);}
 update(time){if(this.player)this.player.update(time);}
}
