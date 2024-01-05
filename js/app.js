function clearCanvas() {
    graph.dispose()
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}
function removePoint() {
    if (graph.points.length == 0) {
        console.log("no points")
        return
    }
    const index = Math.floor(Math.random() * graph.points.length)
    graph.removePoints(graph.points[index])
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}
function removeSegment() {
    if (graph.segments.length == 0) {
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

const worldString = localStorage.getItem("world")
const worldInfo = worldString ? JSON.parse(worldString) : null
const world = worldInfo ? World.load(worldInfo) : new World(new Graph())
const graph = world.graph

const viewport = new ViewPort(myCanvas)

const tools = {
    graph: { button: graphBtn, editor: new GraphEditor(viewport, graph) },
    stop: { button: stopBtn, editor: new StopEditor(viewport, world) },
    crossing: { button: crossingBtn, editor: new CrossingEditor(viewport, world) },
    start: {button: startBtn, editor: new StartEditor(viewport, world)}
}

let oldGraphHash = graph.hash()

setMode("graph")

animate()

function animate() {
    viewport.reset()
    if (graph.hash() != oldGraphHash) {
        world.generate()
        oldGraphHash = graph.hash()
    }
    const viewPoint = scale(viewport.getOffset(), -1)
    world.draw(ctx, viewPoint)
    ctx.globalAlpha = 0.1
    for (const tool of Object.values(tools)) {
        tool.editor.display()
    }
    requestAnimationFrame(animate)
}
function dispose() {
    tools["graph"].editor.dispose()
    world.markings.length = 0
}
function save() {
    const element = document.createElement("a")
    element.setAttribute(
        "href",
        "data:application/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(world))
    )
    const fileName = "name.world"
    localStorage.setItem("world", JSON.stringify(world))
}
function setMode(mode) {
    disableEditors()
    tools[mode].button.style.background = "white"
    tools[mode].button.style.filter = ""
    tools[mode].editor.enable()
}
function disableEditors() {
    for (const tool of Object.values(tools)) {
        tool.button.style.background = "gray"
        tool.button.style.filter = "grayscale(100%)"
        tool.editor.disable()
    }
}