import {Graph} from "./Graph";
import {Vertex} from "./Vertex";
import {DirectedEdge} from "./DirectedEdge";
import {IVertex} from "../types/IVertex";
import {UndirectedGraph} from "./UndirectedGraph";
import {SccBuilder} from "../algorithms/SccBuilder";
import {IGraph} from "../types/IGraph";
import {IEdge} from "../types/IEdge";

/**
 * Directed graph
 * @classdes
 */
export class DirectedGraph extends Graph<Vertex, DirectedEdge> {

  /**
   * @constructor
   */
  public constructor() {
    super(true);
  }

  /**
   * Gets the direct edge by two vertices incident to it
   * @param vertexOne
   * @param vertexTwo
   * @returns {DirectedEdge}
   */
  public getEdge(vertexOne: IVertex, vertexTwo: IVertex): DirectedEdge[] {
    return this.edges.filter(a => a.vertexTwo.equals(vertexTwo) && a.vertexOne.equals(vertexOne));
  }

  public buildSCC(): IGraph<IVertex, IEdge>[] {
    return SccBuilder.findComponents(this);
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