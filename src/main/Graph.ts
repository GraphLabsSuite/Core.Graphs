import {IVertex} from "../types/IVertex";
import {IEdge} from "../types/IEdge";
import {IGraph} from "../types/IGraph";
import {Vertex} from "./Vertex";
import {SccBuilder} from "../algorithms/SccBuilder";
import {IsomorphismChecker} from "../algorithms/IsomorphismChecker";
import {Edge} from "./Edge";
import {UndirectedGraph} from "./UndirectedGraph";

/** @classdesc
 * Graph implementation of the IGraph interface */
export class Graph<T extends Vertex, K extends Edge> implements IGraph<T,K> {
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
   * Getter for _edges field
   * @return {K[]}
   */
  public get edges(): K[] {
    return this._edges;
  }

  /**
   * @constructor
   */
   public constructor(directed?: boolean) {
    this._vertices = [];
    this._edges = [];
    this._isDirected = directed == null ? false : directed;
  }

  public clear(): void {
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
    } while (edgeOut === undefined || !edgeOut.equals(edge));
    edges.forEach(e => {
      if (!e.equals(edgeOut))
        this.edges.push(e)
    });
  }

  /**
   * Gets the edge between the two vertices incident to it
   * @param vertexOne
   * @param vertexTwo
   */
  public getEdge(vertexOne: T, vertexTwo: T): K[] {
    let result: K[] = [];
    this.edges.forEach(edge => {
      if (edge.vertexOne == vertexOne && edge.vertexTwo == vertexTwo) result.push(edge);
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
    for (const v of this.vertices)
      if (v.name == name) verticesOut.push(v);
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
    if (this._vertices.length > 0) {
      do {
        vertexOut = this._vertices.pop();
        vertices.push(vertexOut);
      } while (vertexOut === undefined || !vertexOut.equals(vertex));
      vertices.forEach(v => {
        if (!v.equals(vertexOut)) {
          this.vertices.push(v)
        }
      });
    }
    this._edges.forEach(e => {
      if (e.isIncident(vertex)) {
        this.removeEdge(e);
      }
    })
  }

  /**
   * Returns the result of union operation for N graphs
   * @param graphs
   * @returns {Graph<T,K>}
   */
  public static unionN(graphs: IGraph<IVertex, IEdge>[]): IGraph<IVertex, IEdge> {
    if (graphs.length < 2) return Graph.createEmpty(0);
    //TODO: Think about contracts or asserts
    const copies: Graph<Vertex, Edge>[] = graphs.map(g => <Graph<Vertex, Edge>> g.clone());
    const result: Graph<Vertex, Edge> = copies[0];
    for (let i = 1; i < copies.length; i++) {
      copies[i].vertices.forEach(v => result.addVertex(v));
      copies[i].edges.forEach(e => result.addEdge(e));
    }

    return result;
  }

  /**
   * Returns the result of intersect operation for N graphs
   * @param graphs
   * @returns {IGraph<T,K>}
   */
  public static intersectN(graphs: IGraph<IVertex, IEdge>[]): IGraph<IVertex, IEdge> {
    if (graphs.length < 2) return Graph.createEmpty(0);
    //TODO: Think about contracts or asserts
    const copies: Graph<Vertex, Edge>[] = graphs.map(g => <Graph<Vertex, Edge>> g.clone());
    const result: Graph<Vertex, Edge> = copies[0];
    for (let i = 1; i < copies.length; i++) {
      copies[i].vertices.forEach(v => result.removeVertex(v));
      copies[i].edges.forEach(e => result.removeEdge(e));
    }

    return result;
  }

  /**
   * @static
   * Static builder for the directed weighted graph
   * @param verticesNumber
   * @return {DirectedWeightedGraph}
   */
  public static createEmpty(verticesNumber: number): IGraph<IVertex, IEdge> {
    const newGraph = new Graph<Vertex, Edge>();
    for (let i = 0; i < verticesNumber; ++i)
      newGraph.addVertex(new Vertex(i.toString(verticesNumber)));
    return newGraph;
  }

  /**
   * Returns the result of union operation
   * @param graph
   * @returns {Graph<T, K>}
   */
  public union(graph: IGraph<IVertex, IEdge>): IGraph<IVertex, IEdge> {
    //TODO: Think about contracts or asserts
    return Graph.unionN([this, graph]);
  }

  /**
   * Returns the result of intersect operation
   * @param graph
   * @returns {IGraph}
   */
  public intersect(graph: IGraph<IVertex, IEdge>): IGraph<IVertex, IEdge> {
    return Graph.intersectN([this, graph]);
  }

  /**
   * Returns a complement graph to the given one
   * @returns {IGraph}
   */
  public complement(): IGraph<IVertex, IEdge> {
    return Graph.createEmpty(0); //TODO: implementation
  }

  /**
   * Checks if the second graph is isomorphic to the given one
   * @param graph
   * @returns {boolean}
   */
  public checkIsomorphism(graph: IGraph<IVertex, IEdge>): boolean {
    return IsomorphismChecker.checkIsomorphism(this, graph);
  }

  /**
   * Returns strongly connected components of the given graph
   * @returns {IGraph[]}
   */
  public buildSCC(): IGraph<IVertex, IEdge>[] {
    //TODO: fix the bug with TypeError: Object prototype may only be an Object or null: undefined
    return [];
  }

  public print(): void {
    // @ts-ignore
    console.log(this.toString());
  }

  public toString(): string {
    let verticesListStr: string = '[' + this.vertices.join(',') + ']';
    if (verticesListStr.length == 0) verticesListStr = "\u2205";

    let edgesListStr = "";
    this.edges.forEach(g => edgesListStr = edgesListStr + `{${g.vertexOne},${g.vertexTwo}}`);
    edgesListStr = (edgesListStr.length == 0) ? "\u2205" : `[${edgesListStr}]`;

    return `(${verticesListStr},${edgesListStr})`;
  }

  /**
   * Deep graph-cloning
   */
  public clone(): IGraph<IVertex, IEdge> {
    const clone = new Graph<Vertex, Edge>();
    this.vertices.forEach(v => clone.addVertex(v.clone()));
    for (const edge of this.edges)
    {
      const v1 = clone.vertices.filter(v => edge.vertexOne.equals(v))[0]; //Single?
      const v2 = clone.vertices.filter(v => edge.vertexTwo.equals(v))[0];
      clone.addEdge(new Edge(v1, v2));
    }

    return clone;
  }

  /**
   * Get subgraph of graph
   * input: vertives
   */
   public getSubgraph(subVertices: T[]): IGraph<IVertex, IEdge>{
      const subGraph = new Graph<Vertex, Edge>();
      subVertices.forEach(v => {
          subGraph.addVertex(v.clone());
      });
      this.edges.filter(e =>
          (subVertices.indexOf(<T>e.vertexOne) >= 0)
          &&  (subVertices.indexOf(<T>e.vertexTwo) >= 0)).forEach((e: K) => subGraph.addEdge(new Edge(e.vertexOne, e.vertexTwo)));
      return subGraph;
  }

  /**
   * Get neighbourhood
   */
  public getNeighbourhood(vertex: Vertex): Vertex[] {
      const neighbourhood: Vertex[] = [];
      this.vertices.forEach((v: Vertex) => neighbourhood.push(v.clone()));
      return neighbourhood.reduce((accum: Vertex[], next: Vertex) => {
              this.edges.forEach(e => {
                if (e.vertexOne === vertex) accum.push(e.vertexTwo as Vertex);
                if (e.vertexTwo === vertex) accum.push(e.vertexOne as Vertex);
              });
              return accum;
            }, []);
  }

  /**
   * Get non-neighbourhood
   */
  public getNonNeighbourhood(vertex: Vertex): Vertex[] {
      const neighbours = this.getNeighbourhood(vertex);
      neighbours.push(vertex);
      const answer = this.vertices.reduce((accum: Vertex[], next: Vertex) =>
          (neighbours.indexOf(next) >= 0) ?
              accum : accum.concat(next), []);
      return answer
  }

  /**
   * Get vertex's degree
   */
  public getVertexDegree(vertex: Vertex): number {
    return this.edges.filter((e: Edge) => (e.vertexOne === vertex) || (e.vertexTwo === vertex)).length;
  }

  /**
   * Get vertex with minimum degree
   */
   public getVertexWithMinDegree(): Vertex | null {
     return this.vertices.reduce((min: Vertex | null, next: Vertex) => {
       if (!min || this.getVertexDegree(next) < this.getVertexDegree(min)) return next;
       return min;
     }, null);
   }
}

  /**
   * Checks if the graph is connected
   */

  public isConnected(this: IGraph<IVertex, IEdge> ): boolean {
      let visited: string [] = [];
      let arr: IVertex[] = [];
      function dfs(d: IVertex){
          visited.push(d.name);
          arr = d.arrOfAdjacentVertices(this);
         for (let k = 0; k < arr.length; k++) {
           for (let i = 0; i < visited.length; i++){
            if (arr[k].name !== visited[i]) {
               dfs(arr[k]);
            }
          }
         }
      }
      dfs(this.vertices[0]);
      return (visited.length == this.vertices.length);
      }

}
