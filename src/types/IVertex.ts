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
   * @property
   * @public
   * The additional attribute for information of the vertex wave position
   */
  wave?: string;
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
  isAdjacent: (graph: IGraph<IVertex, IEdge>, vertex: IVertex)=> boolean;

  /**
   * Return the array of incident edges for the vertex
   * @param graph
   */
  arrOfIncidentEdges: (graph: IGraph<IVertex, IEdge>) => IEdge[];
  
    /**
   * Return the array of adjacent vertices for the vertex
   * @param graph
   */
  arrOfAdjacentVertices: (graph: IGraph<IVertex, IEdge>) => IVertex[];

  /**
   * Check whether two graphs are equal
   * @param vertex
   * @returns {boolean}
   */
  equals: (vertex: IVertex)=> boolean;
}
