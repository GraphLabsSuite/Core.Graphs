import * as chai from "chai";
import {IGraph} from "../../src/types/IGraph";
import {IVertex} from "../../src/types/IVertex";
import {IEdge} from "../../src/types/IEdge";
import {GraphGenerator} from "../../src/helpers/GraphGenerator";
describe("GraphGenerator", () => {
  describe("#generate();", () => {
    let graph: IGraph<IVertex, IEdge>;
    it("Generate a graph with 5 vertices", () => {
      graph = GraphGenerator.generate(5);
      chai.assert(graph.vertices.length == 5);
    });

    it("Generate a graph with 8 vertices", () => {
      graph = GraphGenerator.generate(8);
      chai.assert(graph.vertices.length == 8);
    });

    it("Generate a graph with 2 vertices", () => {
      graph = GraphGenerator.generate(2);
      chai.assert(graph.vertices.length == 2);
    });

    it("Generate a graph with the single vertex", () => {
      graph = GraphGenerator.generate(1);
      chai.assert(graph.vertices.length == 1);
    });

    it("Generate an empty graph", () => {
      graph = GraphGenerator.generate(0);
      chai.assert(graph.vertices.length == 0);
    });

    it("Validating wrong values here", () => {
      graph = GraphGenerator.generate(-1);
      chai.assert(graph.vertices.length == 0);
    })
  });
});