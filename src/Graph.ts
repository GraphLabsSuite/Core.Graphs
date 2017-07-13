/**
 * Created by Егор on 13.07.2017.
 */
import List from 'immutable';

namespace GraphLabs.Core.Graphs {

  export class Graph<T extends IVertex, K extends IEdge> implements IGraph<T,K> {
    private _isDirected: boolean;
    private _allowMultipleEdges: boolean;
    private _vertices: List<T>;
    private _edges: List<K>;

    public get isDirected(): boolean {
      return this._isDirected;
    }

    public get allowMultipleEdges(): boolean {
      return this._allowMultipleEdges;
    }

    public get vertices(): List<T> {
      return this._vertices;
    }

    public get edgesNumber(): number {
      return this._vertices.List.size; //Whuttafuck?
    }

    public get edges(): List<K> {
      return this._edges;
    }

    public constructor<T,K>() {
      this._vertices = new List<T>();
      this._edges = new List<K>();
    }

    public addEdge(edge: K): void {

    }

    public removeEdge(edge: K): void {

    }
  }
}