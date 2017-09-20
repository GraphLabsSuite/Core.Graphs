import {IGraph} from "../types/IGraph";
import {Vertex} from "../main/Vertex";
import {IVertex} from "../types/IVertex";
import {Edge} from "../main/Edge";
import {UndirectedGraph} from "../main/UndirectedGraph";
import {DirectedGraph} from "../main/DirectedGraph";
import {IEdge} from "../types/IEdge";
import {UndirectedEdge} from "../main/UndirectedEdge";
import {Graph} from "../main/Graph";

/**
 * Graph generator
 */
export class GraphGenerator {

    public static generateVerticeNumber(max: number): number {
      return Math.floor(Math.random() * max) + 1;
    }

    public static generateEdgesNumber(verticeNumber: number): number {
      return Math.floor(Math.random() * verticeNumber * (verticeNumber - 1) / 2) + 1;
    }

    /**
     * Returns the generated graph with exact vertex number
     * @param verticeNumber
     * @returns {IGraph}
     */
    public static generate(verticeNumber?: number): IGraph<IVertex, IEdge> {
        if (verticeNumber == null) {
            const verticeNumberGen: number = GraphGenerator.generateVerticeNumber(10);
            return GraphGenerator.generate(verticeNumberGen);
        }
        const graph: IGraph<IVertex, IEdge> = new Graph<Vertex, Edge>();
        for(let i: number = 0; i < verticeNumber; i++) {
            graph.addVertex(new Vertex(i.toString(), graph));
        }
        const edgeNumber: number = GraphGenerator.generateVerticeNumber(graph.vertices.length);
        for(let i: number = 0; i < edgeNumber; i++) {
            let verticeOne: IVertex = undefined;
            let verticeTwo: IVertex = undefined;
            let flag1;
            let flag2;
            let flag3;
            let flag4;
            let flag5;
            do {
                const verticeOneNumber: number = GraphGenerator.generateVerticeNumber(graph.vertices.length - 1);
                const verticeTwoNumber: number = GraphGenerator.generateVerticeNumber(graph.vertices.length - 1);
                verticeOne = graph.getVertex(verticeOneNumber.toString())[0];
                verticeTwo = graph.getVertex(verticeTwoNumber.toString())[0];
                flag1 = verticeOne === undefined;
                flag2 = verticeTwo === undefined;
                flag3 = verticeOne == verticeTwo;
                flag4 = graph.getEdge(verticeOne, verticeTwo).length != 0;
                flag5 = graph.getEdge(verticeTwo, verticeOne).length != 0;
            } while(flag1 || flag2
                 || flag3
                 || flag4
                 || flag5
                );
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