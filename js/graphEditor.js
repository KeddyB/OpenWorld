class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas
        this.graph = graph

        this.ctx = this.canvas.getContext("2d")
        this.selected = null
        this.hovered = null
        this.dragging = true
        this.#addEventListeners()
    }
    #addEventListeners() {
        this.canvas.addEventListener("mousedown", (evt) => {
            if (evt.button == 2) { // right click
                if (this.hovered) {
                    this.#removePoints(this.hovered)
                }else{
                    this.selected = null
                }
            }
            if (evt.button == 0) { //left click
                const mouse = new Point(evt.offsetX, evt.offsetY)
                if (this.hovered) {
                    this.#select(this.hovered)
                    this.dragging = true
                    this.selected = this.hovered
                    return
                }
                this.graph.addPoint(mouse)
                this.#select(this.hovered)
                this.hovered = mouse
            }

        })
        this.canvas.addEventListener("mousemove", (evt) => {
            const mouse = new Point(evt.offsetX, evt.offsetY)
            this.hovered = getNearestPoint(mouse, this.graph.points, 10)
            if(this.dragging){
                this.selected.x = mouse.x
                this.selected.y = mouse.y
            }
        })
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault())
        this.canvas.addEventListener("mouseup", () => {this.dragging = false})
    }
    #select(point){
        if(this.selected){
            this.graph.tryAddSegment(new Segment(this.selected, point))
        }
        this.selected = point
    }
    #removePoints(point){
        this.graph.removePoints(point)
        if(this.selected == point){
            this.selected = null
        }
        this.hovered = null
    }
    display() {
        this.graph.draw(this.ctx)
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true })
        }
        if (this.selected) {
            this.selected.draw(this.ctx, { outline: true })
        }
    }
}