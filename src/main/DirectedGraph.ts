import {Graph} from "./Graph";
import {Vertex} from "./Vertex";
import {DirectedEdge} from "./DirectedEdge";
import {IVertex} from "./IVertex";

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
    return <DirectedEdge> super.edges.find(a => a.vertexTwo == vertexTwo && a.vertexOne == vertexOne);
  }
}