import * as chai from "chai";
import {Edge} from "../../src/main/Edge";
import {Vertex} from "../../src/main/Vertex";
import {Graph} from "../../src/main/Graph";
import {IVertex} from "../../src/types/IVertex";
import {UndirectedGraph} from "../../src/main/UndirectedGraph";
import {DirectedWeightedEdge} from "../../src/main/DirectedWeightedEdge";
import {DirectedWeightedGraph} from "../../src/main/DirectedWeightedGraph";

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

   describe("#union();", () => {
       it("Empty graph and graph with one vertex returns graph with one vertex", () => {
          const graphToBeUnion = new UndirectedGraph();
          graphToBeUnion.addVertex(vertex);
          const result = graphToBeUnion.union(graph);
          chai.assert(result.edges.length == 0);
          chai.assert(result.vertices.length == 1);
       });

       it("Two vertices and an edge, and one another vertex makes three vertices and an edge", () => {
           const graphToBeUnion = new Graph<Vertex, Edge>();
           graphToBeUnion.addVertex(vertex);
           graph.addVertex(vertexOne);
           graph.addVertex(vertexTwo);
           graph.addEdge(new Edge(vertexOne, vertexTwo));
           const result = graph.union(graphToBeUnion);
           chai.assert(result.edges.length == 1);
           chai.assert(result.vertices.length == 3);
       });
   });

   describe("#intersect();", () => {
      it("Graph of two vertices and one edge and graph with one vertex with one common vertex => one vertex", () => {
          const graphToBeIntersect = new Graph<Vertex, Edge>();
          graphToBeIntersect.addVertex(vertexOne);
          graphToBeIntersect.addVertex(vertexTwo);
          graphToBeIntersect.addEdge(new Edge(vertexOne, vertexTwo));
          graph.addVertex(vertex);
          const result = graphToBeIntersect.intersect(graph);
          result.print();
          chai.assert(result.vertices.length == 1);
          chai.assert(result.edges.length == 0);
      });
   });
});