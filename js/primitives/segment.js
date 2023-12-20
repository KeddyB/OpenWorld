class Segment{
    constructor(p1, p2){
        this.p1 = p1
        this.p2 = p2 
    }
    draw(ctx, width = 2, color = "black"){
        ctx.beginPath()
        ctx.lineWidth() = width
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2)
        ctx.fill()
    }
}