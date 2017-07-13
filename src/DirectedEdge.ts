/**
 * Created by Егор on 13.07.2017.
 */
namespace GraphLabs.Core.Graphs {

  export class DirectedEdge extends Edge {

    public get isDirected(): boolean {
      return true;
    }

    public constructor(vertexOne: IVertex, vertexTwo: IVertex) {
      super(vertexOne, vertexTwo);
    }
  }
}