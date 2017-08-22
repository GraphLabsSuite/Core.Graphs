import * as chai from "chai";
import {Vertex} from "../../src/main/Vertex";
import {Edge} from "../../src/main/Edge";
describe('Edge', () => {
    const vertex = new Vertex("my_name");
    const vertexOne = new Vertex("first");
    const vertexTwo = new Vertex("second");
    const edgeWithVertex = new Edge(vertex, vertexTwo);
    const edgeWithoutVertex = new Edge(vertexOne, vertexTwo);

    describe('#isIncident();', () => {
       it('Vertex of the edge should be incident to it', () => {
          chai.assert(edgeWithVertex.isIncident(vertex) == true);
       });

       it('Vertex not of the edge should not be incident to it', () => {
          const vertex = new Vertex("my_name");
          chai.assert(edgeWithoutVertex.isIncident(vertex) == false);
       });
   });

   describe('#equals();', () => {
       it('If functions gets null it responses with false answer', () => {
          chai.assert(edgeWithVertex.equals(null) == false);
       });

       it('If the received edge has the same vertexOne and vertexTwo, it is equal', () => {
           const edge = new Edge(vertexOne, vertexTwo);
           chai.assert(edgeWithoutVertex.equals(edge) == true);
       });

       it('If one of the vertices in the received edge is not the same, edges are not equal', () => {
          chai.assert(edgeWithoutVertex.equals(edgeWithVertex) == false);
       });
   })
});