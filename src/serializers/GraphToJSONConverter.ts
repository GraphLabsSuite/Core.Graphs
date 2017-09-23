import {IGraph} from "../types/IGraph";
import {VertexToJSONConverter} from "./VertexToJSONConverter";
import {EdgeToJSONConverter} from "./EdgeToJSONConverter";
import {Graph} from "../main/Graph";
import {GraphJSON} from "../types/GraphJSON";
import {IEdge} from "../types/IEdge";
import {IVertex} from "../types/IVertex";
import {Vertex} from "../main/Vertex";
import {Edge} from "../main/Edge";
import {DirectedWeightedGraph} from "../main/DirectedWeightedGraph";
import {DirectedGraph} from "../main/DirectedGraph";
import {UndirectedGraph} from "../main/UndirectedGraph";

export class GraphToJSONConverter {
    public static convert(graph: IGraph<IVertex, IEdge>): GraphJSON {
        return {
            isDirected: graph.isDirected,
            weighted: graph instanceof DirectedWeightedGraph,
            vertices: graph.vertices.map(v => VertexToJSONConverter.convert(v)),
            edges: graph.edges.map(e => EdgeToJSONConverter.convert(e))
        }
    }

    public static convertBack(graph: GraphJSON): IGraph<IVertex, IEdge> {
        let result: IGraph<IVertex, IEdge>;
        if (graph.isDirected) {
            if (graph.weighted) {
                result = new DirectedWeightedGraph();
            } else {
                result = new DirectedGraph();
            }
        } else {
            result = new UndirectedGraph();
        }
        graph.vertices.forEach(v => result.addVertex(VertexToJSONConverter.convertBack(v, result)));
        graph.edges.forEach(e => result.addEdge(EdgeToJSONConverter.convertBack(e, result)));
        return result;
    }
}
