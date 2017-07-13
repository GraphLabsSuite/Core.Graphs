/**
 * Created by Егор on 13.07.2017.
 */
import List from 'immutable';

namespace GraphLabs.Core.Graphs {

  export interface IGraph {

    isDirected: boolean;
    allowMultipleEdges: boolean;

    edgesNumber: number;
    edges: List<IEdge>;

    verticesNumber: number;
    vertices: List<IVertex>;

    addEdge: (edge: IEdge)=> void;
    removeEdge: (edge: IEdge)=> void;
    getEdge: (verticeOne: IVertex, verticeTwo: IVertex)=> IEdge;

    addVertex: (vertice: IVertex)=> void;
    removerVertex: (vertice: IVertex)=> void;

  }
}