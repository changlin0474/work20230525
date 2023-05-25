//定義bullet物件class
class Bullet{
    constructor(args){//預設值
        this.r = args.r || 15
        this.p = args.p || shipP.copy()//createVector(width/2,height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)
        this.color = args.color || "#1b4965"
        
    }
    draw(){//匯出物件程式碼
         push()//bullet style
           translate(this.p.x,this.p.y)
           fill(this.color)
           noStroke()
           ellipse(0,0,this.r)

         pop()
    }
    update(){//計算移動後距離
        this.p.add(this.v)
  
    }
  }