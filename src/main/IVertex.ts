import {IGraph} from "./IGraph";
import {IEdge} from "./IEdge";
/**
 * @interface
 * Interface of the vertex
 */
export interface IVertex {

  /**
   * @property
   * @private
   * Graph to which the vertex belongs to
   */
  _graphReference?: IGraph;

  /**
   * @property
   * @public
   * Id of the vertex, identifying it
   */
  id: number;
  /**
   * @property
   * @public
   * The name of the vertex (shown on the vertex visually)
   */
  name: string;
  /**
   * @property
   * @public
   * The additional label for further information of the vertex (i.e. weight)
   */
  label?: string;
  /**
   * Allows to change the name property of the vertex
   * @param newName
   * @returns {IVertex}
   */
  rename: (newName: string)=> IVertex

  /**
   * Checks whether the edge is incident to the vertex
   * @param edge
   */
  isIncident: (edge: IEdge)=> boolean;

  /**
   * Checks whether the vertex is adjacent to the given one
   * @param vertex
   */
  isAdjacent: (vertex: IVertex)=> boolean;

  /**
   * Check whether two graphs are equal
   * @param vertex
   * @returns {boolean}
   */
  equals: (vertex: IVertex)=> boolean;
}