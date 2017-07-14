import {Vertex} from "./Vertex";
import {UndirectedEdge} from "./UndirectedEdge";
import {Graph} from "./Graph";
import {IVertex} from "./IVertex";
import {DirectedEdge} from "./DirectedEdge";

/**
 * @classdesc
 * Undirected edge
 */
export class UndirectedGraph extends Graph<Vertex, UndirectedEdge> {

  /**
   * @constructor
   */
  public constructor() {
    super();
  }

  /**
   * @override
   * Gets the edge by vertices incident to it
   * @param vertexOne
   * @param vertexTwo
   * @returns {DirectedEdge}
   */
  public getEdge(vertexOne: IVertex, vertexTwo: IVertex): UndirectedEdge {
    return <DirectedEdge> super.edges.find(a => a.vertexTwo == vertexTwo && a.vertexOne == vertexOne);
  }
}