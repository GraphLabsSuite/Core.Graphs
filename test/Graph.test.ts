import * as chai from "chai";
import {Edge} from "../src/main/Edge";
import {Vertex} from "../src/main/Vertex";
import {Graph} from "../src/main/Graph";
import {IVertex} from "../src/types/IVertex";

describe("Graph", () => {
    const graph = new Graph<Vertex, Edge>();
    const vertex = new Vertex("", graph);
    const name: string = "something";
    const vertexOne = new Vertex(name, graph);
    const vertexTwo = new Vertex(name, graph);

    afterEach(() => {
        graph.clear();
    });

    describe("#addVertex();", () => {
       it("Added vertex adds plus one to the graph vertices array length", () => {
          const n = graph.vertices.length;
          graph.addVertex(vertex);
          chai.assert(graph.vertices.length == n + 1);
      });
    });

   describe("#removeVertex();", () => {

       it("Removed vertex decrease the length of graph vertices array by 1", () => {
           graph.addVertex(vertex);
           const n = graph.vertices.length;
           graph.removeVertex(vertex);
           chai.assert(graph.vertices.length == n - 1);
       });
   });

   describe("#getVertex();", () => {

      it("We get two vertices with name 'something' from the graph", () => {
          graph.addVertex(vertexOne);
          graph.addVertex(vertexTwo);
          chai.assert(graph.getVertex(name).length == 2);
      });
   });

   describe("#addEdge();", () => {
      it("Added edge increase the graph edge array length by one", () => {
         graph.addVertex(vertexOne);
         graph.addVertex(vertexTwo);
         graph.addEdge(new Edge(vertexOne, vertexTwo));
         chai.assert(graph.edges.length == 1);
      });
   });

   describe("#removeEdge();", () => {
      it("Removed edge decrese the graph edge array length by one", () => {
          graph.addVertex(vertexOne);
          graph.addVertex(vertexTwo);
          const edge: Edge = new Edge(vertexOne, vertexTwo);
          graph.addEdge(edge);
          const n = graph.edges.length;
          graph.removeEdge(edge);
          chai.assert(graph.edges.length == n - 1);
      });
   });

   describe("#getEdge();", () => {
      it("We get the edge by the vertices on its end", () => {
          graph.addVertex(vertexOne);
          graph.addVertex(vertexTwo);
          const edge: Edge = new Edge(vertexOne, vertexTwo);
          graph.addEdge(edge);
          const edgeGot: Edge[] = graph.getEdge(vertexOne, vertexTwo);
          chai.assert(edgeGot.length == 1);
          chai.assert(edgeGot[0].vertexOne.equals(vertexOne) && edgeGot[0].vertexTwo.equals(vertexTwo));
      });
   });
});