import {Vertex} from "./Vertex";
import {UndirectedEdge} from "./UndirectedEdge";
import {Graph} from "./Graph";
import {IVertex} from "../types/IVertex";
import {DirectedEdge} from "./DirectedEdge";
import {MinDSEvaluator} from "../algorithms/MinDSEvaluator";
import {SccBuilder} from "../algorithms/SccBuilder";
import {IGraph} from "../types/IGraph";
import {IEdge} from "../types/IEdge";

/**
 * @classdesc
 * Undirected edge
 */
export class UndirectedGraph extends Graph<Vertex, UndirectedEdge> {

  /**
   * @constructor
   */
  public constructor() {
    super(false);
  }

  /**
   * @override
   * Gets the edge by vertices incident to it
   * @param vertexOne
   * @param vertexTwo
   * @returns {DirectedEdge}
   */
  public getEdge(vertexOne: IVertex, vertexTwo: IVertex): UndirectedEdge[] {
    return this.edges.filter(a => a.vertexTwo.equals(vertexTwo) && a.vertexOne.equals(vertexOne));
  }

  public buildSCC(): IGraph<IVertex, IEdge>[] {
    return SccBuilder.findComponents(this);
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
   * @override
   * Returns the copy of the graph
   * @returns {UndirectedGraph}
   */
  public clone(): UndirectedGraph {
    const clone = new UndirectedGraph();
    this.vertices.forEach(v => clone.addVertex(v.clone()));
    for (const edge of this.edges)
    {
      const v1 = clone.vertices.filter(v => edge.vertexOne.equals(v))[0];//First
      const v2 = clone.vertices.filter(v => edge.vertexTwo.equals(v))[0];
      clone.addEdge(new UndirectedEdge(v1, v2));
    }

    return clone;
  }
}
