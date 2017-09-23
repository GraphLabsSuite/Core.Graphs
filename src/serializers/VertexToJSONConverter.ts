import {IVertex} from "../types/IVertex";
import {Vertex} from "../main/Vertex";
import {VertexJSON} from "../types/VertexJSON";
import {IGraph} from "../types/IGraph";
import {IEdge} from "../types/IEdge";

export class VertexToJSONConverter {
    public static convert(vertex: IVertex): VertexJSON {
        return {
            name: vertex.name,
            label: vertex.label
        }
    }

    public static convertBack(vertex: VertexJSON, graph?: IGraph<IVertex, IEdge>): IVertex {
        return new Vertex(vertex.name, graph);
    }
}