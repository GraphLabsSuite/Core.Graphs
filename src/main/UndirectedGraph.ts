import {Vertex} from "./Vertex";
import {UndirectedEdge} from "./UndirectedEdge";
import {Graph} from "./Graph";
import {IVertex} from "./IVertex";
import {DirectedEdge} from "./DirectedEdge";
import {MinDSEvaluator} from "../algorithms/MinDSEvaluator";

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
    return <UndirectedEdge> super.edges.filter(a => a.vertexTwo == vertexTwo && a.vertexOne == vertexOne)[0];
  }

  /**
   * Returns the minimal dominating sets of the graph
   * @returns {IVertex[][]}
   */
  public buildMDS(): IVertex[][] {
    const evaluator: MinDSEvaluator = new MinDSEvaluator(this);
    evaluator.evaluate(this, false);
    return evaluator._minDs;
  }

  /**
   * Returns the copy of the graph
   * @returns {UndirectedGraph}
   */
  public clone(): UndirectedGraph {
    const clone = new UndirectedGraph();
    this.vertices.forEach(v => clone.addVertex(new Vertex(v.name)));
    for (const edge of this.edges)
    {
      const v1 = clone.vertices.filter(edge.vertexOne.equals)[0];//First
      const v2 = clone.vertices.filter(edge.vertexTwo.equals)[0];
      clone.addEdge(new UndirectedEdge(v1, v2));
    }

    return clone;
  }
}
