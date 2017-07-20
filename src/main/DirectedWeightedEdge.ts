import {Edge} from "./Edge";
import {IVertex} from "../types/IVertex";

/**
 * @classdesc
 * Directed weighted edge
 */
export class DirectedWeightedEdge extends Edge {

  /**
   * @property
   * @private
   * Weight for the edge
   */
  private _weight: number;

  /**
   * @property
   * @public
   * Getter for _weight field
   * @returns {number}
   */
  public get weight(): number {
    return this._weight;
  }

  /**
   * @property
   * @public
   * Setter for _weigth field
   * @param newWeight
   */
  public set weight(newWeight: number) {
    this._weight = newWeight;
  }

  /**
   * @override
   * @property
   * @public
   * Shows that edge is directed
   * @return {boolean}
   */
  public get isDirected(): boolean {
    return true;
  }

  public constructor(vertexOne: IVertex, vertexTwo: IVertex, weight: number) {
    super(vertexOne, vertexTwo);
    this.weight = weight;
  }
}