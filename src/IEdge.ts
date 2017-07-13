/**
 * Created by Егор on 13.07.2017.
 */
namespace GraphLabs.Core.Graphs {
  export interface IEdge {
    vertexOne: IVertex;
    vertexTwo: IVertex;
    isDirected: boolean;
  }
}