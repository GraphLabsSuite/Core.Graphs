import {IVertex} from "./IVertex";
import {IEdge} from "./IEdge";

/**
 * The Edge implementation of the IEdge interface
 * @classdesc
 */
export class Edge implements IEdge {
  /**
   * @property
   * @private
   * The first vertex incident to the edge
   */
  private _vertexOne: IVertex;
  /**
   * @property
   * @private
   * The second vertex incident to the edge
   */
  private _vertexTwo: IVertex;
  /**
   * @property
   * @private
   * Mark shows whether the edge is directed or not
   */
  private _isDirected: boolean;

  /**
   * @property
   * @public
   * Getter for _vertexOne field
   * @return {IVertex}
   */
  public get vertexOne(): IVertex {
    return this._vertexOne;
  }

  /**
   * @property
   * @public
   * Getter for _vertexTwo field
   * @return {IVertex}
   */
  public get vertexTwo(): IVertex {
    return this._vertexTwo;
  }

  /**
   * @property
   * @public
   * Getter for _isDirected field
   * @return {boolean}
   */
  public get isDirected(): boolean|undefined {
    return this._isDirected;
  }

  /**
   * @constructor
   * @param vertexOne
   * @param vertexTwo
   */
  public constructor(vertexOne: IVertex, vertexTwo: IVertex) {
    this._vertexOne = vertexOne;
    this._vertexTwo = vertexTwo;
    this._isDirected = undefined;
  }

  public equals(edge: IEdge): boolean {
    if (edge == null) return false;

    return this.isDirected == edge.isDirected &&
        (this.vertexOne.equals(edge.vertexOne) && this.vertexTwo.equals(edge.vertexTwo)
        || !this.isDirected && this.vertexOne.equals(edge.vertexOne) && this.vertexTwo.equals(edge.vertexTwo));
  }
}