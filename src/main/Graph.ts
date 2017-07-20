import * as _ from "lodash";
import {IVertex} from "../types/IVertex";
import {IEdge} from "../types/IEdge";
import {IGraph} from "../types/IGraph";
import {Vertex} from "./Vertex";
import {SccBuilder} from "../algorithms/SccBuilder";
import {IsomorphismChecker} from "../algorithms/IsomorphismChecker";
import {MinDSEvaluator} from "../algorithms/MinDSEvaluator";

/** @classdesc
 * Graph implementation of the IGraph interface */
export class Graph<T extends IVertex, K extends IEdge> implements IGraph<T,K> {
  /** @property
   *  @private
   * Mark shows whether graph edges are directed or not */
  private _isDirected: boolean;
  /** @property
   *  @private
   * Mark shows whether it is possible to have more
   * than one edge between two vertices or not */
  private _allowMultipleEdges: boolean;
  /** @property
   *  @private
   * The list of vertices in the graph */
  private _vertices: T[];
  /** @property
   *  @private
   * The list of edges in the graph */
  private _edges: K[];

  /** @property
   *  @public
   *  Getter for _isDirected field
   *  @returns {boolean}
   *  */
  public get isDirected(): boolean {
    return this._isDirected;
  }

  /** @property
   *  @public
   *  Getter for _allowMultipleEdges field
   *  @returns {boolean}
   */
  public get allowMultipleEdges(): boolean {
    return this._allowMultipleEdges;
  }

  /**
   * @property
   * @public
   * Getter for _vertices field
   * @return {T[]}
   */
  public get vertices(): T[] {
    return this._vertices;
  }

  /**
   * @property
   * @public
   * Getter for edges number in the graph
   * @return {number}
   */
  public get edgesNumber(): number {
    return this._vertices.length;
  }

  /**
   * @property
   * @public
   * Getter for vertices number in the graph
   * @return {number}
   */
  public get verticesNumber(): number {
    return this._vertices.length;
  }

  /**
   * @property
   * @public
   * Getter for _edges field
   * @return {K[]}
   */
  public get edges(): K[] {
    return this._edges;
  }

  /**
   * @constructor
   */
   public constructor<T,K>() {
    this._vertices = [];
    this._edges = [];
  }

  /**
   * Adds the edge to the graph
   * @param edge
   */
  public addEdge(edge: K): void {
    this.edges.push(edge);
  }

  /**
   * Removes the edge from the graph
   * @param edge
   */
  public removeEdge(edge: K): void {
    let edges: K[] = [];
    let edgeOut: K = null;
    do {
      edgeOut = this.edges.pop();
      edges.push(edgeOut);
    } while (edgeOut != edge);
    edges.forEach(e => this.edges.push(e));
  }

  /**
   * Gets the edge between the two vertices incident to it
   * @param vertexOne
   * @param vertexTwo
   */
  public getEdge(vertexOne: T, vertexTwo: T): K {
    let result: K = null;
    this.edges.forEach(edge => {
      if (edge.vertexOne == vertexOne && edge.vertexTwo == vertexTwo) result = edge;
    });
    return result;
  }

  /**
   * Get the vertex by its name
   * @param name
   * @returns {T[]}
   */
  public getVertex(name: string): T[] {
    let verticesOut: T[] = [];
    for (const v of this.vertices) {
      if (v.name === name) verticesOut.push(v);
    }
    return verticesOut;
  }

  /**
   * Adds the vertex to the graph
   * @param vertex
   */
  public addVertex(vertex: T): void {
    this.vertices.push(vertex);
  }

  /**
   * Removes the vertex from the graph
   * @param vertex
   */
  public removeVertex(vertex: T): void {
    let vertices: T[] = [];
    let vertexOut: T = null;
    do {
      vertexOut = this.vertices.pop();
      vertices.push(vertexOut);
    } while (vertexOut != vertex);
    vertices.forEach(v => this.vertices.push(v));
  }

  /**
   * Returns the result of union operation for N graphs
   * @param graphs
   * @returns {Graph<T,K>}
   */
  public static unionN(graphs: IGraph[]): IGraph {
    if (graphs.length < 2) return Graph.createEmpty(0);
    //TODO: Think about contracts or asserts
    const copies = graphs.map(g => g.clone());
    const result = copies[0];
    for (let i = 1; i < copies.length; i++)
    {
      copies[i].vertices.forEach(result.addVertex);
      copies[i].edges.forEach(result.addEdge);
    }

    return result;
  }

  /**
   * Returns the result of intersect operation for N graphs
   * @param graphs
   * @returns {IGraph<T,K>}
   */
  public static intersectN(graphs: IGraph[]): IGraph {
    if (graphs.length < 2) return Graph.createEmpty(0);
    //TODO: Think about contracts or asserts
    const copies = graphs.map(g => g.clone());
    const result = copies[0];
    for (let i = 1; i < copies.length; i++)
    {
      copies[i].vertices.forEach(result.removeVertex);
      copies[i].edges.forEach(result.removeEdge);
    }

    return result;
  }

  /**
   * @static
   * Static builder for the directed weighted graph
   * @param verticesNumber
   * @return {DirectedWeightedGraph}
   */
  public static createEmpty(verticesNumber: number): IGraph {
    const newGraph = new IGraph();
    for (let i = 0; i < verticesNumber; ++i)
      newGraph.addVertex(new Vertex(i.toString(verticesNumber)));
    return newGraph;
  }

  /**
   * Returns the result of union operation
   * @param graph
   * @returns {Graph<T, K>}
   */
  public union(graph: IGraph): IGraph {
    //TODO: Think about contracts or asserts
    return Graph.unionN([this, graph]);
  }

  /**
   * Returns the result of intersect operation
   * @param graph
   * @returns {IGraph}
   */
  public intersect(graph: IGraph): IGraph {
    return Graph.intersectN([this, graph]);
  }

  /**
   * Returns a complement graph to the given one
   * @returns {IGraph}
   */
  public complement(): IGraph {
    return Graph.createEmpty(0); //TODO: implementation
  }

  /**
   * Checks if the second graph is isomorphic to the given one
   * @param graph
   * @returns {boolean}
   */
  public checkIsomorphism(graph: IGraph): boolean {
    return IsomorphismChecker.checkIsomorphism(this, graph);
  }

  /**
   * Returns strongly connected components of the given graph
   * @returns {IGraph[]}
   */
  public buildSCC(): IGraph[] {
    return SccBuilder.findComponents(this);
  }

  public print(): void {
    console.log(this.toString());
  }

  public toString(): string {
    let verticesListStr: string = this.vertices.join(',');
    if (verticesListStr.length == 0) verticesListStr = "\x00D8";

    let edgesListStr = "";
    this.edges.forEach(g => edgesListStr.concat(g.vertexOne + "," + g.vertexTwo));
    if (edgesListStr.length == 0) edgesListStr = "\x00D8";

    return verticesListStr + "," + edgesListStr;
  }

  /**
   * Deep graph-cloning
   */
  public clone() {
    //TODO: implementation (or abstract?)
  }
}