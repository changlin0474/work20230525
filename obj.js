class Obj{//宣告一個類別，針對一個畫的圖案
    constructor(args){//預設值
      //this.p = args.p||{x:random(width),y:random(height)}//描述該物件的初始位置
      this.p = args.p||createVector(random(width),random(height))

      //this.v = {x:random(-1,1),y:random(-1,1)}//物件移動速度
      this.v = createVector(random(-1,1),random(-1,1))

      this.size = random(5,10)//放大倍率
      this.color = random(fill_colors)//充滿顏色
      this.stroke = random(line_colors)//外框線條
    }
    draw(){
      push()
        translate(this.p.x,this.p.y)
        scale(this.v.x<0?1:-1,-1)
        fill(this.color)
        stroke(this.stroke)
        strokeWeight(4)
        beginShape()
         for(var k=0; k<points.length; k=k+1){
          //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
          vertex(points[k][0]*this.size,points[k][1]*this.size)//只要設定一點，會把所有點串接在一起
          //curveVertex(points[k][0]*this.size,points[k][1]*this.size)//畫線為圓弧方式畫圖
        }
        endShape()
      pop()
    }
    update(){
      // this.p.x=this.p.x+this.v.x
      // this.p.y=this.p.y+this.v.y
      this.p.add(this.v)
      //隨滑鼠移動
      let mouseV = createVector(mouseX,mouseY)
      let delta = mouseV.sub(this.p).limit(this.v.mag()*2)
      this.p.add(delta)

      if(this.p.x<=0||this.p.x>=width){
        this.v.x=-this.v.x
      }
      if(this.p.y<=0||this.p.y>=height)
      {
        this.v.y=-this.v.y
      }
    }
    isBallInRanger(x,y){
      let d =dist(x,y,this.p.x,this.p.y)
      if(d<4*this.size){
        return true
      }else{
        return false
      }
    }
}