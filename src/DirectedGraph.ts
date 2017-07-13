/**
 * Created by Егор on 13.07.2017.
 */
namespace GraphLabs.Core.Graphs {

  export class DirectedGraph extends Graph<Vertex, DirectedEdge> {
    public constructor() {
      super();
    }

    public getDirectEdge(vertexOne: IVertex, vertexTwo: IVertex): DirectedEdge {
      return <DirectedEdge> super.edges.find(a => a.vertexTwo == vertexTwo && a.vertexOne == vertexOne);
    }
  }
}