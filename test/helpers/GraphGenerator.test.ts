import * as chai from "chai";
import {IGraph} from "../../src/types/IGraph";
import {IVertex} from "../../src/types/IVertex";
import {IEdge} from "../../src/types/IEdge";
import {GraphGenerator} from "../../src/helpers/GraphGenerator";
describe("GraphGenerator", () => {
  describe("#generate();", () => {

    it("Generate a graph with 5 vertices", () => {
      const graph: IGraph<IVertex, IEdge> = GraphGenerator.generate(5);
      chai.assert(graph.vertices.length == 5);
    });

    it("Generate a graph with 8 vertices", () => {
      const graph: IGraph<IVertex, IEdge> = GraphGenerator.generate(8);
      chai.assert(graph.vertices.length == 8);
    });
  });
});