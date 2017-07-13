import {Edge} from "./Edge";
import {IVertex} from "./IVertex";
/**
 * Created by Егор on 13.07.2017.
 */
export class DirectedEdge extends Edge {

  public get isDirected(): boolean {
    return true;
  }

  public constructor(vertexOne: IVertex, vertexTwo: IVertex) {
    super(vertexOne, vertexTwo);
  }
}