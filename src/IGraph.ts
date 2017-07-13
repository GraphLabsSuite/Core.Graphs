/**
 * Created by Егор on 13.07.2017.
 */
import List from 'immutable';
import {IVertex} from "./IVertex";
import {IEdge} from "./IEdge";

export interface IGraph<T extends IVertex, K extends IEdge> {

  isDirected: boolean;
  allowMultipleEdges: boolean;

  edgesNumber: number;
  edges: List<K>;

  verticesNumber: number;
  vertices: List<T>;

  addEdge: (edge: K)=> void;
  removeEdge: (edge: K)=> void;
  getEdge: (verticeOne: T, verticeTwo: T)=> K;

  addVertex: (vertice: T)=> void;
  removeVertex: (vertice: T)=> void;

}