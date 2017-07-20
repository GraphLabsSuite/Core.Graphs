import {IGraph} from "../main/IGraph";
import {GraphToJSONConverter} from "./GraphToJSONConverter";
export class GraphSerializer {
    public static serialize(graph: IGraph): string {
        const graphJSON: GraphJSON = GraphToJSONConverter.convert(graph);
        return JSON.stringify(graphJSON);
    }

    public static deserialize(graph: string): IGraph {
        const graphJSON: GraphJSON = JSON.parse(graph);
        return GraphToJSONConverter.convertBack(graphJSON);
    }
}