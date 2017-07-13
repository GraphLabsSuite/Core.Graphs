import {IVertex} from "./IVertex";
/**
 * Created by Егор on 13.07.2017.
 */
export interface IEdge {
  vertexOne: IVertex;
  vertexTwo: IVertex;
  isDirected: boolean;
}