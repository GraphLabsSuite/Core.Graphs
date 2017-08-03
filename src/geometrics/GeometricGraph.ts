import {Vertex} from "../main/Vertex";
import {Edge} from "../main/Edge";
import {Graph} from "../main/Graph";
import {GeometricVertex} from "./GeometricVertex";
import {GeometricEdge} from "./GeometricEdge";

export class GeometricGraph<T extends Graph<K, R>, K extends Vertex, R extends Edge> {
  public graph: T;

  public vertices: GeometricVertex<K>[];

  public edges: GeometricEdge<R>[];

  public constructor<T>(graph: T) {
    this.graph = graph;
    for (let vertex of graph.vertices)
      this.vertices.push(new GeometricVertex<K>(vertex));
    for (let edge of graph.edges)
      this.edges.push(new GeometricEdge<R>(edge));
  }
}