import {IVertex} from "../types/IVertex";
import {IEdge} from "../types/IEdge";

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
   * The name of the edge
   */

  private _name: string;

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

  public get name(): string {
    return this._name;
  }

  /**
   * @property
   * @public
   * Setter for _name field
   */

  public set name(value: string) {
    this._name = value;
  }

  /**
   * @property
   * @public
   * Getter for _isDirected field
   * @return {boolean}
   */

  public get isDirected(): boolean {
    return this._isDirected;
  }

  /**
   * @constructor
   * @param vertexOne
   * @param vertexTwo
   */
  public constructor(vertexOne: IVertex, vertexTwo: IVertex, name: string = undefined) {
    this._vertexOne = vertexOne;
    this._vertexTwo = vertexTwo;
    this._isDirected = false;
    this._name = name;
  }

  public isIncident(vertex: IVertex): boolean {
    return vertex.equals(this.vertexOne) || vertex.equals(this.vertexTwo);
  }

  /**
   *
   * @param edge
   * @returns {boolean}
   */
  public equals(edge: IEdge): boolean {
    if (edge == null) return false;

    return this.isDirected == edge.isDirected &&
        (this.vertexOne.equals(edge.vertexOne) && this.vertexTwo.equals(edge.vertexTwo)
        || !this.isDirected && this.vertexOne.equals(edge.vertexOne) && this.vertexTwo.equals(edge.vertexTwo));
  }
}