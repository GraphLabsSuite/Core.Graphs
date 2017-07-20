import {IGraph} from "../types/IGraph";
import {Vertex} from "../main/Vertex";
import {IVertex} from "../types/IVertex";
import {Edge} from "../main/Edge";
import {UndirectedGraph} from "../main/UndirectedGraph";
import {DirectedGraph} from "../main/DirectedGraph";

/**
 * Graph generator
 */
export class GraphGenerator {

    public static generateVerticeNumber(): number {
        return Math.floor(Math.random() * 10) + 1;
    }

    /**
     * Generate graph with 1...10 vertices
     * @returns {IGraph}
     */
    public static generate(): IGraph {
        const verticeNumber: number = GraphGenerator.generateVerticeNumber();
        return GraphGenerator.generate(verticeNumber);
    }

    /**
     * Returns the generated graph with exact vertex number
     * @param verticeNumber
     * @returns {IGraph}
     */
    public static generate(verticeNumber: number): IGraph {
        const graph: IGraph = new IGraph();
        for(let i: number = 0; i < verticeNumber; i++) {
            graph.addVertex(new Vertex(i.toString()));
        }
        const edgeNumber: number = Math.floor(Math.random() * verticeNumber * (verticeNumber - 1));
        for(let i: number = 0; i < edgeNumber; i++) {
            let verticeOne: IVertex = undefined;
            let verticeTwo: IVertex = undefined;
            do {
                const verticeOneNumber: number = GraphGenerator.generateVerticeNumber();
                const verticeTwoNumber: number = GraphGenerator.generateVerticeNumber();
                verticeOne = graph.getVertex(verticeOneNumber.toString());
                verticeTwo = graph.getVertex(verticeTwoNumber.toString());
            } while(verticeOne != undefined ||
                verticeTwo != undefined ||
                verticeOne != verticeTwo ||
                graph.getEdge(verticeOne, verticeTwo) == null);
            graph.addEdge(new Edge(verticeOne, verticeTwo));
        }
        return graph;
    }

    public static generateUndirectedGraph(): UndirectedGraph {
        return <UndirectedGraph> GraphGenerator.generate();
    }

    public static generateDirectedGraph(): DirectedGraph {
        return <DirectedGraph> GraphGenerator.generate();
    }
}