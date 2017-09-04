import {VertexJSON} from "./VertexJSON";

export interface EdgeJSON {
    weight?: number,
    vertexOne: VertexJSON,
    vertexTwo: VertexJSON,
    isDirected: boolean
}