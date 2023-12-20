class Graph{
    constructor(points = [], segment = []){
        this.points = points
        this.segment = segment
    }
    draw(ctx){
        for(const seg of this.segment){
            seg.draw(ctx)
        }
        for(const point of this.points){
            point.draw(ctx)
        }
    }
}