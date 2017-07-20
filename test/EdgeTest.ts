import * as chai from "chai";
import {Vertex} from "../src/main/Vertex";
import {Edge} from "../src/main/Edge";
describe('Edge', () => {
   describe('#isIncident();', () => {
       it('Vertex should return the vertex in the edge', () => {
          const vertex = new Vertex("my_name");
          const edge = new Edge(vertex, new Vertex("another vertex"));
          chai.assert(edge.isIncident(vertex) == true);
       });
   });
});