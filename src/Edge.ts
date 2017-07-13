/**
 * Created by Егор on 13.07.2017.
 */
namespace GraphLabs.Core.Graphs {
  export class Edge implements IEdge {
    _vertexOne: IVertex;
    _vertexTwo: IVertex;
    _isDirected: boolean;

    public get vertexOne(): IVertex {
      return this._vertexOne;
    }

    public get vertexTwo(): IVertex {
      return this._vertexTwo;
    }

    public get isDirected(): boolean|undefined {
      return this._isDirected;
    }

    public constructor(vertexOne: IVertex, vertexTwo: IVertex) {
      this._vertexOne = vertexOne;
      this._vertexTwo = vertexTwo;
      this._isDirected = undefined;
    }
  }
}