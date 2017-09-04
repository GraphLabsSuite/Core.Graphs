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
        return new Graph<Vertex, Edge>();
        //Filling graph
    }
}
