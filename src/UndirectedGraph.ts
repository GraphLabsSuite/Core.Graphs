/**
 * Created by Егор on 13.07.2017.
 */
namespace GraphLabs.Core.Graphs {

  export class UndirectedGraph extends Graph<Vertex, UndirectedEdge> {
    public constructor() {
      super();
    }

    public getEdge(vertexOne: IVertex, vertexTwo: IVertex): UndirectedEdge {
      return <DirectedEdge> super.edges.find(a => a.vertexTwo == vertexTwo && a.vertexOne == vertexOne);
    }
  }
}