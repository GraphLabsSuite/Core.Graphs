import {EdgeJSON} from "./EdgeJSON";
import {VertexJSON} from "./VertexJSON";

export interface GraphJSON {
    isDirected: boolean,
    weighted: boolean,
    vertices: VertexJSON[],
    edges: EdgeJSON[]
}