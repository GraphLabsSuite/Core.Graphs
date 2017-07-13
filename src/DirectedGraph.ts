/**
 * Created by Егор on 13.07.2017.
 */
namespace GraphLabs.Core.Graphs {

  export class DirectedGraph extends Graph<Vertex, DirectedEdge> {
    public constructor() {
      super();
    }

    public getDirectEdge(vertexOne: IVertex, vertexTwo: IVertex): DirectedEdge {
      return new DirectedEdge(vertexOne, vertexTwo); //TODO: implementation
    }
  }
}