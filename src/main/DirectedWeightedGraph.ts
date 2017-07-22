import {Vertex} from "./Vertex";
import {DirectedWeightedEdge} from "./DirectedWeightedEdge";
import {IVertex} from "../types/IVertex";
import {IWeightedEdge} from "../types/IWeightedEdge";
import {Graph} from "./Graph";


export class DirectedWeightedGraph extends Graph<IVertex, IWeightedEdge> {

  /**
   * @static
   * Static builder for the directed weighted graph
   * @param verticesNumber
   * @return {DirectedWeightedGraph}
   */
  public static createEmpty(verticesNumber: number): DirectedWeightedGraph {
    const newGraph = new DirectedWeightedGraph();
    for (let i = 0; i < verticesNumber; ++i)
      newGraph.addVertex(new Vertex(i.toString(verticesNumber)));
    return newGraph;
  }

  /**
   * @override
   * @property
   * @public
   * Shows the graph is directed
   * @return {boolean}
   */
  public get isDirected(): boolean {
    return true;
  }

  /**
   * @override
   * @property
   * @public
   * Shows the graph is not able to have multiple edges
   * @return {boolean}
   */
  public get allowMultipleEdges(): boolean {
    return false;
  }

  /**
   * @constructor
   */
  public constructor() {
    super(true);
  }

  /**
   * @public
   * Gets the edge by two vertices incident to it
   * @param vertexOne
   * @param vertexTwo
   */
  public getEdge(vertexOne: IVertex, vertexTwo: IVertex): DirectedWeightedEdge[] {
    return this.edges.filter(a => a.vertexTwo.equals(vertexTwo) && a.vertexOne.equals(vertexOne)); //TODO: why is it so?
  }

  /**
   * @override
   * Deep graph-cloning
   * @returns {DirectedWeightedGraph}
   */
  public clone(): DirectedWeightedGraph {
    let clone = new DirectedWeightedGraph();
    super.vertices.forEach(v => clone.addVertex(new Vertex(v.name)));
    super.edges.forEach(e => {
      const dwe = <DirectedWeightedEdge> e;
      const v1 = clone.vertices.filter(v => v.equals(e.vertexOne))[0];//Single
      const v2 = clone.vertices.filter(v => v.equals(e.vertexTwo))[0];//First
      clone.addEdge(new DirectedWeightedEdge(v1, v2, dwe.weight));
    });
    return clone;
  }
}