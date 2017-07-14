/**
 * Created by Егор on 13.07.2017.
 */
import {List} from "immutable";
import {IVertex} from "./IVertex";
import {IEdge} from "./IEdge";
import {IGraph} from "./IGraph";

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
  private _vertices: List<T>;
  /** @property
   *  @private
   * The list of edges in the graph */
  private _edges: List<K>;

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
   * @return {List<T>}
   */
  public get vertices(): List<T> {
    return this._vertices;
  }

  /**
   * @property
   * @public
   * Getter for edges number in the graph
   * @return {number}
   */
  public get edgesNumber(): number {
    return this._vertices.size;
  }

  /**
   * @property
   * @public
   * Getter for vertices number in the graph
   * @return {number}
   */
  public get verticesNumber(): number {
    return this._vertices.size;
  }

  /**
   * @property
   * @public
   * Getter for _edges field
   * @return {List<K>}
   */
  public get edges(): List<K> {
    return this._edges;
  }

  /**
   * @constructor
   */
   public constructor<T,K>() {
    this._vertices = new List<T>();
    this._edges = new List<K>();
  }

  /**
   * Adds the edge to the graph
   * @param edge
   */
  public addEdge(edge: K): void {

  }

  /**
   * Removes the edge from the graph
   * @param edge
   */
  public removeEdge(edge: K): void {

  }

  /**
   * Gets the edge between the two vertices incident to it
   * @param verticeOne
   * @param verticeTwo
   */
  public getEdge(verticeOne: T, verticeTwo: T) {

  }

  /**
   * Adds the vertex to the graph
   * @param vertex
   */
  public addVertex(vertex: T): void {

  }

  /**
   * Removes the vertex from the graph
   * @param vertex
   */
  public removeVertex(vertex: T): void {

  }

  /**
   * Deep graph-cloning
   */
  public clone() {

  }
}