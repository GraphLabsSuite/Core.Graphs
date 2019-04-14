import {IVertex} from "../types/IVertex";
import {IGraph} from "../types/IGraph";
import {IEdge} from "../types/IEdge";
import {Graph} from "..";

export class GraphCharacteristics {
    /**
     * Get subgraph of graph
     * input: vertives
     */
     public static getSubgraph(subVertices: string[], graph: IGraph<IVertex, IEdge>) {
        const subGraph = Graph.createEmpty(0);
        subVertices.forEach(v => subGraph.addVertex(v))
        graph.edges.filter(e => subVertices.includes(e.vertexOne.toString())
            && subVertices.includes(e.vertexTwo.toString()))
            .forEach(e => subGraph.addEdge(e));
        return subGraph;
    }

    /**
     * Get neighbourhood
     */
    public static getNeighbourhood(vertex: <IVertex>, graph: IGraph<IVertex, IEdge>): string[] {
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
            (neighbours.includes(next.name)) ?
                accum : accum.concat(next.name), []);
        return answer
    }
}
