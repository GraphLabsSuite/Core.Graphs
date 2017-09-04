import {IVertex} from "../types/IVertex";
import {Vertex} from "../main/Vertex";
import {VertexJSON} from "../types/VertexJSON";

export class VertexToJSONConverter {
    public static convert(vertex: IVertex): VertexJSON {
        return {
            name: vertex.name,
            label: vertex.label
        }
    }

    public static convertBack(vertex: VertexJSON): IVertex {
        return new Vertex(vertex.name);
    }
}