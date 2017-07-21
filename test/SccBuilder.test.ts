import {SccBuilder} from "../src/algorithms/SccBuilder";
import {UndirectedGraph} from "../src/main/UndirectedGraph";
import {Vertex} from "../src/main/Vertex";
import {Edge} from "../src/main/Edge";
import {IEdge} from "../src/types/IEdge";
import {IVertex} from "../src/types/IVertex";
import {IGraph} from "../src/types/IGraph";
describe("SccBuilder", () => {
   describe("", () => {
       const graph: UndirectedGraph = new UndirectedGraph();
       const v1 = new Vertex("1", graph);
       const v2 = new Vertex("2", graph);
       const v3 = new Vertex("1", graph);
       const v4 = new Vertex("2", graph);
       graph.addVertex(v1);
       graph.addVertex(v2);
       graph.addVertex(v3);
       graph.addVertex(v4);
       const e1 = new Edge(v1, v2);
       const e2 = new Edge(v1, v3);
       const e3 = new Edge(v2, v3);
       graph.addEdge(e1);
       graph.addEdge(e2);
       graph.addEdge(e3);
       // const d: IGraph<IVertex, IEdge>[] = SccBuilder.findComponents(graph);
       // console.log(d.toString());
       console.log(graph);
   });
});