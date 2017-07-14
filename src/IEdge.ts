import {IVertex} from "./IVertex";

/**
 * @interface
 * Interface of the edge
 */
export interface IEdge {
  /**
   * @property
   * @public
   * The first vertex incident to the edge
   */
  vertexOne: IVertex;
  /**
   * @property
   * @public
   * The second vertex incident to the edge
   */
  vertexTwo: IVertex;
  /**
   * @property
   * @public
   * The mark shows edge is direct or not
   */
  isDirected: boolean;
}