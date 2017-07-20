import {Edge} from "./Edge";
import {IVertex} from "../types/IVertex";

/**
 * @classdesc
 * Directed edge
 */
export class DirectedEdge extends Edge {

  /**
   * @property
   * @public
   * Shows the edge is directed
   * @returns {boolean}
   */
  public get isDirected(): boolean {
    return true;
  }

  /**
   * @constructor
   * @param vertexOne
   * @param vertexTwo
   */
  public constructor(vertexOne: IVertex, vertexTwo: IVertex) {
    super(vertexOne, vertexTwo);
  }
}