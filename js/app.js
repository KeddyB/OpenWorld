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
const viewport = new ViewPort(myCanvas)
const graphEditor = new GraphEditor(viewport, graph)

animate()

function animate(){
    viewport.reset()
    graphEditor.display()
    new Envelope(graph.segments[0], 80).draw(ctx)
    requestAnimationFrame(animate)
}
function dispose(){
    graphEditor.dispose()
}
function save(){
    localStorage.setItem("graph", JSON.stringify(graph))
}