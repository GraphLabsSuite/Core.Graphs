/**
 * Created by Егор on 13.07.2017.
 */
import List from 'immutable';
import {IVertex} from "./IVertex";
import {IEdge} from "./IEdge";

/**
 * @interface
 * Base graph interface
 */
export interface IGraph<T extends IVertex, K extends IEdge> {

  /**
   * @property
   * @public
   * Mark shows graph is directed or not
   */
  isDirected: boolean;
  /**
   * @property
   * @public
   * Mark shows graph can contain multiple edges or not
   */
  allowMultipleEdges: boolean;

  /**
   * @property
   * @public
   * The amount of edges in the graph
   */
  edgesNumber: number;
  /**
   * @property
   * @public
   * The list of edges in the graph
   */
  edges: List<K>;

  /**
   * @property
   * @public
   * The amount of vertices in the graph
   */
  verticesNumber: number;
  /**
   * @property
   * @public
   * The list of vertices in the graph
   */
  vertices: List<T>;

  /**
   * @public
   * Adds the edge to the graph
   * @param edge
   */
  addEdge: (edge: K)=> void;
  /**
   * @public
   * Removes the edge from the graph
   * @param edge
   */
  removeEdge: (edge: K)=> void;
  /**
   * @public
   * Get the edge between two vertices incident to it
   * @param verticeOne
   * @param verticeTwo
   * @returns {K}
   */
  getEdge: (verticeOne: T, verticeTwo: T)=> K;

  /**
   * @public
   * Adds the vertex to the graph
   * @param vertice
   */
  addVertex: (vertice: T)=> void;
  /**
   * @public
   * Removes the vertex from the graph
   * @param vertice
   */
  removeVertex: (vertice: T)=> void;

  /**
   * Deep graph-cloning
   * @returns {IGraph}
   */
  clone: ()=> IGraph;
}