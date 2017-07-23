import * as chai from "chai";
import {Vertex} from "../../src/main/Vertex";
import {Edge} from "../../src/main/Edge";
import {IGraph} from "../../src/types/IGraph";
import {IVertex} from "../../src/types/IVertex";
import {IEdge} from "../../src/types/IEdge";
import {Graph} from "../../src/main/Graph";

describe('Vertex', () => {

    describe('#isAdjacent', () => {
        const graph: IGraph<IVertex, IEdge> = new Graph<Vertex, Edge>();
        const vertexOne = new Vertex("", graph);
        const vertexTwo = new Vertex("", graph);
        const vertexThree = new Vertex("", graph);
        const edge = new Edge(vertexOne, vertexTwo);
        graph.addVertex(vertexOne);
        graph.addVertex(vertexTwo);
        graph.addVertex(vertexThree);
        graph.addEdge(edge);

        it('Two vertices connected by an edge are adjacent', () => {
            chai.assert(vertexOne.isAdjacent(vertexTwo) == true);
        });

        it('Two vertices not connected by an edge are not adjacent', () => {
           chai.assert(vertexOne.isAdjacent(vertexThree) == false);
        });

        it('If the vertex has no graph reference, adjacent operation returns false', () => {
           chai.assert(new Vertex("").isAdjacent(vertexOne) == false);
        });
    });

    describe('#equals();', () => {
       const vertex = new Vertex("name");

       it('Vertices with the same id are equal', () => {
           chai.assert(vertex.equals(vertex) == true);
       });

       it('Vertices with different id are not equal', () => {
           chai.assert(vertex.equals(new Vertex("")) == false);
       });
    });
});