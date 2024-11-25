class Ball{
    constructor(x,y,color,num, r){
        this.x = x
        this.y = y
        this.color = color 
        this.num = num
        this.r = r

    }
    blink(){
        let color = this.color
        this.color = "black";
        setInterval(() =>{this.color = color}, 1000)
    }
}