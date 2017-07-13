/**
 * Created by Егор on 13.07.2017.
 */
namespace GraphLabs.Core.Graphs {

  export class UndirectedEdge extends Edge {

    public get isDirected(): boolean {
      return false;
    }

    public constructor(vertexOne: IVertex, vertexTwo: IVertex) {
      super(vertexOne, vertexTwo);
    }
  }
}