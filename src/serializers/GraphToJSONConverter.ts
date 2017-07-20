import {IGraph} from "../types/IGraph";
import {VertexToJSONConverter} from "./VertexToJSONConverter";
import {EdgeToJSONConverter} from "./EdgeToJSONConverter";
import {Graph} from "../main/Graph";
export class GraphToJSONConverter {
    public static convert(graph: IGraph): GraphJSON {
        return {
            isDirected: graph.isDirected,
            weighted: typeof graph === 'DirectedWeightedGraph',
            vertices: graph.vertices.map(v => VertexToJSONConverter.convert(v)),
            edges: graph.edges.map(e => EdgeToJSONConverter.convert(e))
        }
    }

    public static convertBack(graph: GraphJSON): IGraph {
        return new Graph();
        //Filling graph
    }
}
