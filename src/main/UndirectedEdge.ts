import {Edge} from "./Edge";
import {IVertex} from "./IVertex";

/**
 * @classdesc
 * Undirected edge
 */
export class UndirectedEdge extends Edge {

  /**
   * Shows edge is undirected
   * @returns {boolean}
   */
  public get isDirected(): boolean {
    return false;
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