import {IGraph} from "./IGraph";
import {IEdge} from "./IEdge";
import {GraphID} from "../util/GraphID";
/**
 * @interface
 * Interface of the vertex
 */
export interface IVertex {

  /**
   * @property
   * @public
   * Id of the vertex, identifying it
   */
  id: GraphID;
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
  rename: (newName: string)=> void

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
   * Return the array of incident edges for the vertex
   * @param graph
   */
  arrOfIncidentEdges: (graph: IGraph<IVertex, IEdge>) => IEdge[];

  /**
   * Check whether two graphs are equal
   * @param vertex
   * @returns {boolean}
   */
  equals: (vertex: IVertex)=> boolean;
}