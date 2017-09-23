import * as chai from "chai";
import {IGraph} from "../../src/types/IGraph";
import {IVertex} from "../../src/types/IVertex";
import {IEdge} from "../../src/types/IEdge";
import {GraphSerializer} from "../../src/serializers/GraphSerializer";
describe("GraphSerializer", () => {
  describe("#deserialize();", () => {
    const graphSerialized: string = `{"isUndirected": false, "weighted": false, "vertices": [{"name":"0", "label": "0"},{"name":"1", "label": "1"},{"name":"2", "label": "2"},{"name":"3", "label": "3"},{"name":"4", "label": "4"}], "edges": [{"vertexOne": {"name":"2", "label": "2"}, "vertexTwo": {"name":"1", "label": "1"}, "isDirected": false},{"vertexOne": {"name":"4", "label": "4"}, "vertexTwo": {"name":"3", "label": "3"}, "isDirected": false},{"vertexOne": {"name":"3", "label": "3"}, "vertexTwo": {"name":"1", "label": "1"}, "isDirected": false}]}`;

    it("Get a 5-vertexed graph", () => {
      const graph: IGraph<IVertex, IEdge> = GraphSerializer.deserialize(graphSerialized);
      chai.assert(graph.vertices.length == 5);
      chai.assert(graph.edges.length == 3);
    });
  });
});