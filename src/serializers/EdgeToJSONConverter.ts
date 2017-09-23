import {IEdge} from "../types/IEdge";
import {VertexToJSONConverter} from "./VertexToJSONConverter";
import {DirectedEdge} from "../main/DirectedEdge";
import {Edge} from "../main/Edge";
import {UndirectedEdge} from "../main/UndirectedEdge";
import {EdgeJSON} from "../types/EdgeJSON";
import {IGraph} from "../types/IGraph";
import {IVertex} from "../types/IVertex";

export class EdgeToJSONConverter {
    public static convert(edge: IEdge): EdgeJSON {
        return {
            vertexOne: VertexToJSONConverter.convert(edge.vertexOne),
            vertexTwo: VertexToJSONConverter.convert(edge.vertexTwo),
            isDirected: edge.isDirected
        }
    }

    //TODO: Think about ID in the new created edges (Vertices are created twice)
    public static convertBack(edge: EdgeJSON, graph: IGraph<IVertex, IEdge>): IEdge {
        const vertexOne = graph.getVertex(edge.vertexOne.name)[0];
        const vertexTwo = graph.getVertex(edge.vertexTwo.name)[0];
        return (edge.isDirected) ?
            new DirectedEdge(vertexOne, vertexTwo) :
            new UndirectedEdge(vertexOne, vertexTwo)
    }
}