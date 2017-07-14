import {Vertex} from "./Vertex";
import {Graph} from "./Graph";


export class DirectedWeightedGraph extends Graph<Vertex, DirectedWeightedGraph> {

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
    super();
  }

  /**
   * @override
   * Deep graph-cloning
   */
  public clone() {

  }
}