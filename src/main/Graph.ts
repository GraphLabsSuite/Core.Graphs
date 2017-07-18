import {List} from "immutable";
import {IVertex} from "./IVertex";
import {IEdge} from "./IEdge";
import {IGraph} from "./IGraph";
import {Vertex} from "./Vertex";
import {SccBuilder} from "../util/SccBuilder";

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
    //TODO: implementation
  }

  /**
   * Removes the edge from the graph
   * @param edge
   */
  public removeEdge(edge: K): void {
    //TODO: implementation
  }

  /**
   * Gets the edge between the two vertices incident to it
   * @param verticeOne
   * @param verticeTwo
   */
  public getEdge(verticeOne: T, verticeTwo: T) {
    //TODO: implementation
  }

  /**
   * Adds the vertex to the graph
   * @param vertex
   */
  public addVertex(vertex: T): void {
    //TODO: implementation
  }

  /**
   * Removes the vertex from the graph
   * @param vertex
   */
  public removeVertex(vertex: T): void {
    //TODO: implementation
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

  //TODO: implementation
  public permute(): number[] {
    return [1];
  }

  public updateBijection(verticesOne: IVertex[], verticesTwo: IVertex[]): void {
    // const _bijection = new Dictionary<string, string>();
    // foreach (string[] i in verticesList1.Zip(verticesList2, (a, b) => new string[] { a.Name, b.Name }))
    // _bijection.Add(i[1], i[0]);
  }

  public directCompare(graph: IGraph): boolean {
    // let equals = 0;
    // const count = this.edgesNumber;
    // for (let i = 0; i < count; i++)
    // for (let j = 0; j < count; j++)
    // if (compareHelper(graph1.Edges[i].Vertex1, graph2.Edges[j].Vertex1) &&
    //     CompareHelper(graph1.Edges[i].Vertex2, graph2.Edges[j].Vertex2) ||
    //     (CompareHelper(graph1.Edges[i].Vertex2, graph2.Edges[j].Vertex1) &&
    //     CompareHelper(graph1.Edges[i].Vertex1, graph2.Edges[j].Vertex2)))
    // {
    //   equals++;
    //   break;
    // }
    // return equals == count;
  }

  public checkIsomorphism(graph: IGraph): boolean {
    if (this.verticesNumber != graph.verticesNumber || this.edgesNumber != graph.edgesNumber)
      return false;
    this.permute().forEach(p => {
      // updateBijection(perm, graph.vertices);
      // if (directCompare(graph))
      //   return true;
    });
    return false;
  }

  public buildSCC(): IGraph[] {
    return SccBuilder.findComponents(this);
  }

  /**
   * Deep graph-cloning
   */
  public clone() {
    //TODO: implementation
  }
}