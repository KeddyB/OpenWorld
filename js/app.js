function clearCanvas(){
    graph.dispose()
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}
function removePoint(){
    if(graph.points.length == 0){
        console.log("no points")
        return
    }
    const index = Math.floor(Math.random() * graph.points.length)
    graph.removePoints(graph.points[index])
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}
function removeSegment(){
    if(graph.segments.length == 0){
        console.log("no segment")
        return
    }
    const index = Math.floor(Math.random() * graph.points.length)
    graph.removeSegment(graph.segments[index])
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}
function addRandomSegment() {
    const index1 = Math.floor(Math.random() * graph.points.length)
    const index2 = Math.floor(Math.random() * graph.points.length)

    const success = graph.tryAddSegment(
        new Segment(graph.points[index1], graph.points[index2])
    )
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
    console.log(success)
}
function addRandomPoint() {
    const success = graph.tryAddPoint(
        new Point(
            Math.random() * myCanvas.width,
            Math.random() * myCanvas.height
        )
    );
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}
myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const graphString = localStorage.getItem("graph")
const graphInfo = graphString ? JSON.parse(graphString) : null
const graph = graphInfo ? Graph.load(graphInfo) : new Graph()
const world = new World(graph)
const viewport = new ViewPort(myCanvas)
const graphEditor = new GraphEditor(viewport, graph)

let oldGraphHash = graph.hash()

setMode

animate()

function animate(){
    viewport.reset()
    if(graph.hash() != oldGraphHash){
        world.generate()
        oldGraphHash = graph.hash()
    }
    const viewPoint = scale(viewport.getOffset(), -1)
    world.draw(ctx, viewPoint)
    ctx.globalAlpha = 0.1
    graphEditor.display()
    requestAnimationFrame(animate)
}
function dispose(){
    graphEditor.dispose()
}
function save(){
    localStorage.setItem("graph", JSON.stringify(graph))
}
function setMode(mode){
    disableEditors()
    switch(mode){
        case "graph":
            graphBtn.style.background = "white"
            graphBtn.style.filter = ""
            break
        case "stop":
            stopBtn.style.background = "white"
            stopBtn.style.filter = ""
            break
    }
}
function disableEditors(){
    graphBtn.style.background = "gray"
    graphBtn.style.filter = "grayscale(100%)"
    stopBtn.style.background = "gray"
    stopBtn.style.filter = "grayscale(100%)"
}