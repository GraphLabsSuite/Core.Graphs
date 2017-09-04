import {IEdge} from "../types/IEdge";
import {VertexToJSONConverter} from "./VertexToJSONConverter";
import {DirectedEdge} from "../main/DirectedEdge";
import {Edge} from "../main/Edge";
import {UndirectedEdge} from "../main/UndirectedEdge";
import {EdgeJSON} from "../types/EdgeJSON";

export class EdgeToJSONConverter {
    public static convert(edge: IEdge): EdgeJSON {
        return {
            vertexOne: VertexToJSONConverter.convert(edge.vertexOne),
            vertexTwo: VertexToJSONConverter.convert(edge.vertexTwo),
            isDirected: edge.isDirected
        }
    }

    //TODO: Think about ID in the new created edges (Vertices are created twice)
    public static convertBack(edge: EdgeJSON): IEdge {
        return (edge.isDirected) ?
            new DirectedEdge(VertexToJSONConverter.convertBack(edge.vertexOne), VertexToJSONConverter.convertBack(edge.vertexTwo)) :
            new UndirectedEdge(VertexToJSONConverter.convertBack(edge.vertexOne), VertexToJSONConverter.convertBack(edge.vertexTwo))
    }
}