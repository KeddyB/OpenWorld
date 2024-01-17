class Building{
    constructor(base, height = 200){
        this.base = base
        this.height = height
    }
    static load(info){
        return new Building(Polygon.load(info.base), info.height)
    }
    draw(ctx, viewPoint){
        const topPoints = this.base.points.map((p) =>
            getFake3DPoint(p, viewPoint, this.height * 0.6)
        )

        const ceiling = new Polygon(topPoints)

        const sides = []
        for(let i = 0; i < this.base.points.length; i++){
            const nextI = (i + 1) % this.base.points.length
            const poly = new Polygon([
                this.base.points[i], this.base.points[nextI],
                topPoints[nextI], topPoints[i]
            ])
            sides.push(poly)
        }
        sides.sort(
            (a, b) =>
                b.distanceToPoint(viewPoint) - a.distanceToPoint(viewPoint)
        )

        this.base.draw(ctx, {fill: "white", stroke: "#AAA"})
        for(const side of sides){
            side.draw(ctx, {fill: "white", stroke: "#AAA"})
        }
        ceiling.draw(ctx, {fill: "white", stroke: "#AAA"})
    }
}