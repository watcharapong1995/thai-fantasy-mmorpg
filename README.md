# Thai Fantasy MMORPG

ต้นแบบ MMORPG แฟนตาซีไทย / หิมพานต์ เริ่มต้นที่ **บ้านป่าหลวง**

## Milestone 1
- Phaser 3 browser prototype
- บ้านป่าหลวง starter map
- Novice player
- Mouse Click-to-Move
- Camera follow
- Collision กับบ้าน แม่น้ำ และขอบป่าบางส่วน
- HUD เริ่มต้น

## วิธีรัน
ES Modules ต้องเปิดผ่าน local web server (ไม่ควรดับเบิลคลิก `index.html` โดยตรง)

### Python
```bash
python -m http.server 8080
```
แล้วเปิด `http://localhost:8080`

### VS Code
ใช้ส่วนขยาย Live Server แล้วเปิด `index.html` ผ่าน Live Server

## Acceptance Test
1. เกมเปิดใน browser ได้
2. เห็นแผนที่บ้านป่าหลวง
3. เห็นตัวละคร Novice
4. คลิกพื้นแล้วตัวละครเดินไปยังตำแหน่งนั้น
5. กล้องติดตามตัวละคร
6. ตัวละครไม่สามารถเดินทะลุบ้านหรือแม่น้ำได้

## Next
หลัง Milestone 1 ผ่านการทดสอบ: เพิ่ม **สไลม์ป่า Lv.1**, targeting, auto-attack, HP/damage, death และ loot drop.
