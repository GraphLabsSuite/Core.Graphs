import {Graph} from "./Graph";
import {Vertex} from "./Vertex";
import {DirectedEdge} from "./DirectedEdge";
import {IVertex} from "../types/IVertex";
import {UndirectedGraph} from "./UndirectedGraph";
import {SccBuilder} from "../algorithms/SccBuilder";
import {IGraph} from "../types/IGraph";
import {IEdge} from "../types/IEdge";
import {forEach} from "lodash";

/**
 * Directed graph
 * @classdes
 */
export class DirectedGraph extends Graph<Vertex, DirectedEdge> {

  /**
   * @constructor
   */
  public constructor(directed: boolean = true) {
    super(directed);
  }

  /**
   * Gets the direct edge by two vertices incident to it
   * @param vertexOne
   * @param vertexTwo
   * @returns {DirectedEdge}
   */
  public getEdge(vertexOne: IVertex, vertexTwo: IVertex): DirectedEdge[]{

    let e:DirectedEdge;

    let i:number=0;
    let result:DirectedEdge[] =[];

    for (i=0; i<this.edges.length; i++)
    {
      if (this.edges[i].vertexOne.name === vertexOne.name && this.edges[i].vertexTwo.name ===vertexTwo.name)
      {
        result.push(new DirectedEdge(this.edges[i].vertexOne, this.edges[i].vertexTwo, this.edges[i].name, this.edges[i].weightLabel, this.edges[i].isDirected));
      }
    }

    // return this.edges.filter(a => a.vertexTwo.name === vertexTwo.name && a.vertexOne.name == vertexOne.name);

     return result;
  }

  public buildSCC(): IGraph<IVertex, IEdge>[] {
    return SccBuilder.findComponents(this);
  }

  /**
   * Returns the copy of the graph
   * @returns {DirectedGraph}
   */
  public clone(): DirectedGraph {
    const clone = new DirectedGraph(true);
    this.vertices.forEach(v => clone.addVertex(v.clone()));
    for (const edge of this.edges)
    {
      // const v1 = clone.vertices.filter(edge.vertexOne.equals)[0]; //Single?
      // const v2 = clone.vertices.filter(edge.vertexTwo.equals)[0];
      clone.addEdge(new DirectedEdge(edge.vertexOne, edge.vertexTwo, edge.name, edge.weightLabel, edge.isDirected));
    }

    return clone;
  }
}