class StopEditor{
    constructor(viewport, world){
        this.viewport = viewport
        this.world =  world

        this.canvas = viewport.canvas
        this.ctx = this.canvas.getContext("2d")

        this.mouse = null
        this.intent = null
    }
    enable(){
        this.#addEventListeners()
    }
    disable(){
        this.#removeEventListeners()
    }
    #addEventListeners() {
        this.boundMouseDown = this.#handleMouseDown.bind(this)
        this.boundMouseMove = this.#handleMouseMove.bind(this)
        this.boundContextMenu = (evt) => evt.preventDefault()
        this.canvas.addEventListener("mousedown", this.boundMouseDown)
        this.canvas.addEventListener("mousemove", this.boundMouseMove)
        this.canvas.addEventListener("mouseup", this.boundMouseUp)
        this.canvas.addEventListener("contextmenu", this.boundContextMenu)
    }
    #removeEventListeners() {
        this.canvas.removeEventListener("mousedown", this.boundMouseDown)
        this.canvas.removeEventListener("mousemove", this.boundMouseMove)
        this.canvas.removeEventListener("contextmenu", this.boundContextMenu)
    }
    #handleMouseDown(evt){
    //     if (evt.button == 2) { // right click
    //         if (this.selected) {
    //             this.selected = null
    //         } else if (this.hovered) {
    //             this.#removePoints(this.hovered)
    //         }
    //     }
    //     if (evt.button == 0) { //left click
    //         if (this.hovered) {
    //             this.#select(this.hovered)
    //             this.dragging = true
    //             return
    //         }
    //         this.graph.addPoint(this.mouse)
    //         this.#select(this.mouse)
    //         this.hovered = this.mouse
    //     }
    }
    #handleMouseMove(evt) {
        this.mouse = this.viewport.getMouse(evt, true)
        const seg = getNearestSegment(
            this.mouse,
            this.world.laneGuides,
            10 * this.viewport.zoom
        )
        if(seg){
            const proj = seg.projectPoint(this.mouse)
            if(proj.offset >= 0 && proj.offset <= 1){
                this.intent = new Stop(
                    proj.point,
                    seg.directionVector(),
                    world.roadWidth / 2,
                    world.roadWidth / 2
                )
            }else{
                this.intent = null
            }
        }else{
            this.intent = null
        }
    }
    display(){
        if(this.intent){
            this.intent.draw(this.ctx)
        }
    }
}