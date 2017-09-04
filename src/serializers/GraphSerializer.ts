import {IGraph} from "../types/IGraph";
import {GraphToJSONConverter} from "./GraphToJSONConverter";
import {GraphJSON} from "../types/GraphJSON";
import {IVertex} from "../types/IVertex";
import {IEdge} from "../types/IEdge";

export class GraphSerializer {
    public static serialize(graph: IGraph<IVertex, IEdge>): string {
        const graphJSON: GraphJSON = GraphToJSONConverter.convert(graph);
        return JSON.stringify(graphJSON);
    }

    public static deserialize(graph: string): IGraph<IVertex, IEdge> {
        const graphJSON: GraphJSON = JSON.parse(graph);
        return GraphToJSONConverter.convertBack(graphJSON);
    }
}