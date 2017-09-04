import {Edge} from "./src/main/Edge";
import {IEdge} from "./src/types/IEdge";
import {DirectedEdge} from "./src/main/DirectedEdge";
import {UndirectedEdge} from "./src/main/UndirectedEdge";
import {DirectedWeightedEdge} from "./src/main/DirectedWeightedEdge";
import {IWeightedEdge} from "./src/types/IWeightedEdge";
import {IGraphStatic} from "./src/types/IGraphStatic";
import {IGraph} from "./src/types/IGraph";
import {Graph} from "./src/main/Graph";
import {UndirectedGraph} from "./src/main/UndirectedGraph";
import {DirectedGraph} from "./src/main/DirectedGraph";
import {DirectedWeightedGraph} from "./src/main/DirectedWeightedGraph";
import {IVertex} from "./src/types/IVertex";
import {Vertex} from "./src/main/Vertex";
import {EdgeJSON} from "./src/types/EdgeJSON";
import {GraphJSON} from "./src/types/GraphJSON";
import {VertexJSON} from "./src/types/VertexJSON";
import {EdgeToJSONConverter} from "./src/serializers/EdgeToJSONConverter";
import {GraphSerializer} from "./src/serializers/GraphSerializer";
import {GraphToJSONConverter} from "./src/serializers/GraphToJSONConverter";
import {VertexToJSONConverter} from "./src/serializers/VertexToJSONConverter";
import {GraphGenerator} from "./src/helpers/GraphGenerator";
import {GraphID} from "./src/util/GraphID";

declare module "graphlabs.core.graphs" {
  export const Edge: Edge;
  export const IEdge: IEdge;
  export const DirectedEdge: DirectedEdge;
  export const UndirectedEdge: UndirectedEdge;
  export const DirectedWeightedEdge: DirectedWeightedEdge;
  export const IWeightedEdge: IWeightedEdge;

  export const IGraphStatic: IGraphStatic;
  export const IGraph: IGraph;
  export const Graph: Graph;
  export const UndirectedGraph: UndirectedGraph;
  export const DirectedGraph: DirectedGraph;
  export const DirectedWeightedGraph: DirectedWeightedGraph;

  export const IVertex: IVertex;
  export const Vertex: Vertex;

  export const EdgeJSON: EdgeJSON;
  export const GraphJSON: GraphJSON;
  export const VertexJSON: VertexJSON;

  export const EdgeToJSONConverter: EdgeToJSONConverter;
  export const GraphSerializer: GraphSerializer;
  export const GraphToJSONConverter: GraphToJSONConverter;
  export const VertexToJSONConverter: VertexToJSONConverter;

  export const GraphGenerator: GraphGenerator;

  export const GraphID: GraphID;
}