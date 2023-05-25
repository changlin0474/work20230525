class Monster{
  constructor(args){//預設值
    this.p = args.p||createVector(random(width),random(height))
    this.v = createVector(random(-1,1),random(-1,1))
    this.size = random(5,10) //放大倍率
    this.color = random(fill_colors2)//充滿顏色
    this.stroke = random(line_colors2)//外框線條
    this.dead = false
    this.timenum = 0//延長時間，顯示死亡畫面
  }
  draw(){
    if(this.dead==false){
    push()
      translate(this.p.x,this.p.y)
      scale(this.v.x<0?1:-1,-1)
      fill(this.color)
      stroke(this.stroke)
      strokeWeight(4)
      beginShape()
       for(var k=0; k<points2.length; k=k+1){
        vertex(points2[k][0]*this.size,points2[k][1]*this.size)//只要設定一點，會把所有點串接在一起
      }
      endShape()
    pop()
    }
    else{//怪物死亡畫面
      this.timenum=this.timenum+1
      push()
       translate(this.p.x,this.p.y)
       scale(this.v.x<0?1:-1,-1)
       fill(fill_colors)
       stroke(line_colors)
       strokeWeight(4)
       beginShape()
       for(var k=0; k<points.length; k=k+1){
         vertex(points[k][0]*this.size,points[k][1]*this.size)
       }
      endShape()

      pop()
    }
  }
  update(){
    this.p.add(this.v)
    //let mouseV = createVector(mouseX,mouseY)
    //let delta = mouseV.sub(this.p).limit(this.v.mag()*2)
    //this.p.add(delta)

    if(this.p.x<=0||this.p.x>=width){
      this.v.x=-this.v.x
    }
    if(this.p.y<=0||this.p.y>=height)
    {
      this.v.y=-this.v.y
    }
  }
  isMonsterInRanger(x,y){
    let d =dist(x,y,this.p.x,this.p.y)
    if(d<4*this.size){
      return true
    }else{
      return false
    }
  }
}