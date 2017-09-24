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

    public static generateVertexNumber(max: number): number {
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
            const verticeNumberGen: number = GraphGenerator.generateVertexNumber(10);
            return GraphGenerator.generate(verticeNumberGen);
        }
        const graph: IGraph<IVertex, IEdge> = new Graph<Vertex, Edge>();
        for(let i: number = 0; i < verticeNumber; i++) {
            graph.addVertex(new Vertex(i.toString(), graph));
        }
        if (verticeNumber > 2) {
            const edgeNumber: number = GraphGenerator.generateVertexNumber(graph.vertices.length);
            for (let i: number = 0; i < edgeNumber; i++) {
                let vertexOne: IVertex = undefined;
                let vertexTwo: IVertex = undefined;
                let flag1;
                let flag2;
                let flag3;
                let flag4;
                let flag5;
                do {
                    const vertexOneNumber: number = GraphGenerator.generateVertexNumber(graph.vertices.length - 1);
                    const vertexTwoNumber: number = GraphGenerator.generateVertexNumber(graph.vertices.length - 1);
                    vertexOne = graph.getVertex(vertexOneNumber.toString())[0];
                    vertexTwo = graph.getVertex(vertexTwoNumber.toString())[0];
                    flag1 = vertexOne === undefined;
                    flag2 = vertexTwo === undefined;
                    flag3 = vertexOne == vertexTwo;
                    flag4 = graph.getEdge(vertexOne, vertexTwo).length != 0;
                    flag5 = graph.getEdge(vertexTwo, vertexOne).length != 0;
                } while (flag1 || flag2
                || flag3
                || flag4
                || flag5
                  );
                graph.addEdge(new Edge(vertexOne, vertexTwo));

            }
        } else if (verticeNumber === 2) {
            const validator = this.generateVertexNumber(20);
            if (validator % 2 == 0) graph.addEdge(new Edge(graph.vertices[0], graph.vertices[1]));
        } else if (verticeNumber === 1) {
            // pass
        } else if (verticeNumber === 0) {
            // pass
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