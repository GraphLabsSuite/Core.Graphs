import {Graph} from "./Graph";
import {Vertex} from "./Vertex";
import {DirectedEdge} from "./DirectedEdge";
import {IVertex} from "../types/IVertex";

/**
 * @classdesc
 * Directed graph
 */
export class DirectedGraph extends Graph<Vertex, DirectedEdge> {

  /**
   * @constructor
   */
  public constructor() {
    super();
  }

  /**
   * Gets the direct edge by two vertices incident to it
   * @param vertexOne
   * @param vertexTwo
   * @returns {DirectedEdge}
   */
  public getDirectEdge(vertexOne: IVertex, vertexTwo: IVertex): DirectedEdge {
    return <DirectedEdge> super.edges.filter(a => a.vertexTwo == vertexTwo && a.vertexOne == vertexOne)[0];
  }

  /**
   * Returns the copy of the graph
   * @returns {DirectedGraph}
   */
  public clone(): DirectedGraph {
    const clone = new DirectedGraph();
    this.vertices.forEach(v => clone.addVertex(new Vertex(v.name)));
    for (const edge of this.edges)
    {
      const v1 = clone.vertices.filter(edge.vertexOne.equals)[0]; //Single?
      const v2 = clone.vertices.filter(edge.vertexTwo.equals)[0];
      clone.addEdge(new DirectedEdge(v1, v2));
    }

    return clone;
  }
}