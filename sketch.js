let points = [[-1,9],[-4,6], [-5, 6],[-6,5],[-6,4],[-5,3],[-4,3],[-4,1],[-6,1],[-6,-1],[-5,-1],[-5,0],[-4,0],[-4,-4],[-6,-4], [-6,-3], [-7, -3],[-7,-5],[6,-5],[6,-6],[7,-6], [7,-4],[4,-4],[4,0],[6,0],[6,2],[5,2],[5,1],[4,1],[4,3],[5,3],[6,4],[6,5],[5,6],[4,6],[1,9],[1,7],[-1,7],[-1,9]];
let points2 = [[-1,9],[-3,9],[-3,7],[-4,6],[-5, 6],[-6,5],[-6,4],[-5,3],[-4,3],[-4,1],[-6,1],[-6,-1],[-5,-1],[-5,0],[-4,0],[-4,-4],[-6,-4], [-6,-3], [-7, -3],[-7,-5],[6,-5],[6,-6],[7,-6], [7,-4],[4,-4],[4,0],[6,0],[6,2],[5,2],[5,1],[4,1],[4,3],[5,3],[6,4],[6,5],[5,6],[4,6],[3,7],[3,9],[1,9],[1,7],[-1,7],[-1,9]];

var line_colors = "ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff".split("-").map(a=>"#"+a)
var fill_colors = "ffe5ec-ffc2d1-ffb3c6-ff8fab-fb6f92".split("-").map(a=>"#"+a)

var line_colors2 = "07beb8-3dccc7-68d8d6-9ceaef-c4fff9".split("-").map(a=>"#"+a)
var fill_colors2 = "0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8".split("-").map(a=>"#"+a)



var ball
var balls =[]

var monster
var monsters=[]

var bullet 
var bullets =[]

var shipP//砲台

var score =0

function preload(){ 
	cat_sound=loadSound("sound/cat.mp3")
  bullet_sound=loadSound("sound/bullet.mp3")
  coin_sound=loadSound("sound/coin.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP=createVector(width/2,height/2)//預設砲台位置(width/2,height/2)
  for(var i=0;i<5;i=i+1){
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball)//把ball的物件放入balls的陣列內
  }
  for(var i=0;i<10;i=i+1){
    monster= new Monster({})
    monsters.push(monster)
  }
}

function draw() {
  background("#ccd5ae");
  // for(var j=0;j<balls.length;j=j+1){
  //   ball= balls[j]
  //   ball.draw()
  //   ball.update()
  //}
  
  if(keyIsPressed){
    if(key==" "){//空白鍵，發射飛彈
      bullet = new Bullet({})
      bullets.push(bullet)
      bullet_sound.play()
    }
    if(key=="ArrowLeft"){
      shipP.x=shipP.x-5
    }
    if(key=="ArrowRight"){
      shipP.x=shipP.x+5
    }
    if(key=="ArrowUp"){
      shipP.y=shipP.y-5
    }
    if(key=="ArrowDown"){
      shipP.y=shipP.y+5
    }
  }
  for(let ball of balls)
  {
    ball.draw()
    ball.update()
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
        score =score-1
        cat_sound.play()
       }
     }
     
   }

  for(let bullet of bullets)
  {
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters)
  {
    if(monster.dead==true && monster.timenum>4){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){
        //monsters.splice(monsters.indexOf(monster),1)
        bullets.splice(bullets.indexOf(bullet),1)
        score =score+1
        monster.dead=true
        coin_sound.play()
       }
     }
  }

  textSize(50)
  text(score,50,50)
  push()
    let dx = mouseX - width/2
    let dy = mouseY - height/2
    let angle = atan2(dy,dx)
    translate(shipP.x,shipP.y)
    noStroke()
    rotate(angle)
    //triangle(-25,25,-25,-25,50,0)
    
    fill("#edede9")//蘑菇身體
    ellipse(15,0,30,20)

    fill('#f28482')//蘑菇頭
    ellipse(0,0,30,55)

    fill("#edede9")//蘑菇點點
    ellipse(-2,0,6)
    ellipse(-10,10,6)
    ellipse(3,20,6)
    ellipse(5,-15,6)
    ellipse(-7,-18,6)

    

  pop()

  //分數計算
  if(monsters.length==0){
    monsters.splice(0,monsters.length)
    rectMode(CENTER)
    background("#9bf6ff")
    fill("#ffb4a2")
    noStroke()
    rect(width/2,height/2,width-200,height-200)

    push()
      fill(0)
      textSize(100)
      text("總得分:"+score+"分",width/2-300,height/2)
    pop()
  }
}


function mousePressed(){
  // ball = new Obj({
  //   p:{x:mouseX,y:mouseY}}) //產生一個Obj class元件
  // balls.push(ball)//把ball的物件放入balls的陣列內
  //-----------------------------------
  // for(let ball of balls){
  //   if(ball.isBallInRanger(mouseX,mouseY)){
  //     balls.splice(balls.indexOf(ball),1)
  //     score =score+1
  //   }
  // }
  //-------------------------------------------

  bullet = new Bullet({
    //r:10
  })
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){//空白鍵，發射飛彈
    bullet = new Bullet({})
    bullets.push(bullet)
    bullet_sound.play()
  }
  if(key=="ArrowLeft"|| key=="a"){
    shipP.x=shipP.x-5
  }
  if(key=="ArrowRight"){
    shipP.x=shipP.x+5
  }
  if(key=="ArrowUp"){
    shipP.y=shipP.y-5
  }
  if(key=="ArrowDown"){
    shipP.y=shipP.y+5
  }
}