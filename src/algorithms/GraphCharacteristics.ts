import {IVertex} from "../types/IVertex";
import {IGraph} from "../types/IGraph";
import {IEdge} from "../types/IEdge";
import {Edge} from "../main/Edge";
import {Vertex} from "../main/Vertex";
import {Graph} from "../main/Graph";

export class GraphCharacteristics {
    /**
     * Get subgraph of graph
     * input: vertives
     */
     public static getSubgraph(subVertices: string[], graph: IGraph<IVertex, IEdge>) {
        const subGraph = Graph.createEmpty(0);
        subVertices.forEach((v: string) => {
            const vertex = new Vertex(v);
            subGraph.addVertex(vertex);
        });
        graph.edges.filter((e: Edge) => e.vertexOne.name in subVertices
            && e.vertexTwo.name in subVertices)
            .forEach(e => subGraph.addEdge(e));
        return subGraph;
    }

    /**
     * Get neighbourhood
     */
    public static getNeighbourhood(vertex: string, graph: IGraph<IVertex, IEdge>): string[] {
        const answer = graph.edges
            .reduce((accum: IVertex[], next: IEdge) =>
                (next.vertexOne.name === vertex)
                    ? accum.concat(next.vertexTwo as Vertex)
                    : (next.vertexTwo.name === vertex)
                    ? accum.concat(next.vertexOne as Vertex)
                    : accum, [])
            .map((e: IVertex) => e.name);
        return answer
    }

    /**
     * Get neighbourhood
     */
    public static getNonNeighbourhood(vertex: string, graph: IGraph<IVertex, IEdge>) {
        const neighbours = GraphCharacteristics.getNeighbourhood(vertex, graph);
        neighbours.push(vertex);
        const answer = graph.vertices.reduce((accum: string[], next: IVertex) =>
            (next.name in neighbours) ?
                accum : accum.concat(next.name), []);
        return answer
    }
}
