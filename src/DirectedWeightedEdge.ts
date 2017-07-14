import {Edge} from "./Edge";

/**
 * @classdesc
 * Directed weighted edge
 */
export class DirectedWeightedEdge extends Edge {

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
}