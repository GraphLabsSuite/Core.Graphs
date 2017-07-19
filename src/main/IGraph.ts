import {IVertex} from "./IVertex";
import {IEdge} from "./IEdge";
import {IGraphStatic} from "./IGraphStatic";

/**
 * @interface
 * Base graph interface
 */
export interface IGraph<T extends IVertex, K extends IEdge> extends IGraphStatic {

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
  edges: K[];

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
  vertices: T[];

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
   * @public
   * Returns the result of union operation
   * @param graph
   * @returns {IGraph}
   */
  union: (graph: IGraph)=> IGraph;

  /**
   * @public
   * Returns the result of intersect operation
   * @param graph
   * @returns {IGraph}
   */
  intersect: (graph: IGraph)=> IGraph;

  /**
   * Returns the complement graph to this one
   * @returns {IGraph}
   */
  complement: ()=> IGraph;

  /**
   * @public
   * Checks whether the second graph is isomorphic to the given one
   * @param graph
   * @returns {boolean}
   */
  checkIsomorphism: (graph: IGraph)=> boolean;

  /**
   * @public
   * Returns strong connected components of the graph
   * @returns {IGraph[]}
   */
  buildSCC: ()=> IGraph[];

  /**
   * Printing graph to the screen
   */
  print: ()=> void;

  /**
   * Returns string representation of the graph
   */
  toString: ()=> string;

  /**
   * Deep graph-cloning
   * @returns {IGraph}
   */
  clone: ()=> IGraph;
}