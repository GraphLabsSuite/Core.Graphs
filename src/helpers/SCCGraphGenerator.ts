
function getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max) + 1
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomElementArray(arr: Array<any>){
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand]
}


let maxVerIndex = 0

export class SCCGraphGenerator {
    maxCmp: number = 2
    minCmp: number = 4
    cmpNum: number
    components: Array<any>
    graph: any
    allVertices: Array<any>
    allEdges: Array<any>

    constructor() {
        this.components = []
        this.allEdges = []
        this.allVertices = []
        this.cmpNum = getRandomNumber(this.minCmp, this.maxCmp)
        this.generateSCC()
        this.connectComponents()
        this.generateSingleSCC()
        this.graph = this.getGraph()
    }

    generateSCC() {
        for (let i = 0; i < this.cmpNum; i++) {
            let cmp = new SCCGenerator()
            let parsedCmp = cmp.getComponent()

            this.components.push(parsedCmp)
            for (let v of parsedCmp.vertices) {
                this.allVertices.push(v)
            }
            for (let e of parsedCmp.edges) {
                this.allEdges.push(e)
            }
        }
    }

    connectComponents() {
        for (let i = 0; i < this.components.length - 1; i++) {
            let source = getRandomElementArray(this.components[i].vertices)
            let target: string
            if(i + 1 === this.components.length){
                target = getRandomElementArray(this.components[0].vertices)
            }
            else {
                target = getRandomElementArray(this.components[i + 1].vertices)
            }
            let edge = {"source": source, "target": target, "isDirected": true}
            this.allEdges.push(edge)
        }
    }

    generateSingleSCC() {
        let numOfStarts = getRandomNumber(0, 3)
        let index = maxVerIndex + 1

        if (this.allEdges.length > 24) return

        for (let i = 0; i <= numOfStarts; i++) {
            let source: string = String(index)
            this.allVertices.push(source)
            index++

            let numOfDestination = getRandomNumber(1, 2)

            for (let d = 0; d <= numOfDestination; d++) {
                let destinationCmp = getRandomElementArray(this.components)
                let destinationVertice = getRandomElementArray(destinationCmp.vertices)

                let edge = {"source": source, "target": destinationVertice, "isDirected": true}

                let parseEdge = JSON.stringify(edge)
                let parseAllEdges = JSON.stringify(this.allEdges)

                if (parseAllEdges.indexOf(parseEdge) === -1) this.allEdges.push(edge)
            }
        }
    }

    getGraph() {
        return {
            vertices: this.allVertices,
            edges: this.allEdges
        }
    }
}



class SCCGenerator{
    vertexes: any
    edges: any
    verNumber: number

    constructor() {
        this.vertexes = []
        this.edges = []
        this.verNumber = getRandomNumber(2, 4)
        this.generateVertexes()
        this.generateEdges()
    }

    generateVertexes(){
        for(let i: number = 0; i < this.verNumber;){
            let ver = String(maxVerIndex)
            if(this.vertexes.indexOf(ver) === -1){
                this.vertexes.push(ver)
                i++
            }
            maxVerIndex++
        }
    }

    generateEdges(){
        let destinations = []


        while(destinations.length !== this.vertexes.length){

            let source = getRandomElementArray(this.vertexes)
            let destination = getRandomElementArray(this.vertexes)

            if(source !== destination){

                let edge = {"source": source, "target": destination, "isDirected": true}
                let parseEdge = JSON.stringify(edge)
                let parseAllEdges = JSON.stringify(this.edges)

                if(parseAllEdges.indexOf(parseEdge) === -1){
                    this.edges.push(edge)
                    if(destinations.indexOf(destination) === -1) {
                        destinations.push(destination)
                    }
                }
            }
        }
    }

    getComponent(){
        return {
            vertices: this.vertexes,
            edges: this.edges
        }
    }
}
