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

  /**
   * Checks whether the vertex is incident to the edge
   * @param vertex
   */
  isIncident: (vertex: IVertex)=> boolean;

  /**
   * @property
   * @public
   * The name of the edge(shown on the edge visually)
   */
  name: string;

  /**
   * @public
   * Compares two edges
   * @param edge
   */
  equals:(edge: IEdge)=> boolean;
}