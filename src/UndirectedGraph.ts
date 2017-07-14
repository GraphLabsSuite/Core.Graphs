import {Vertex} from "./Vertex";
import {UndirectedEdge} from "./UndirectedEdge";
import {Graph} from "./Graph";
import {IVertex} from "./IVertex";
import {DirectedEdge} from "./DirectedEdge";
/**
 * Created by Егор on 13.07.2017.
 */


export class UndirectedGraph extends Graph<Vertex, UndirectedEdge> {
  public constructor() {
    super();
  }

  public getEdge(vertexOne: IVertex, vertexTwo: IVertex): UndirectedEdge {
    return <UndirectedEdge> super.edges.find(a => a.vertexTwo == vertexTwo && a.vertexOne == vertexOne);
  }
}
