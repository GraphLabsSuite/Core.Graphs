import {IGraph} from "../types/IGraph";
import {IVertex} from "../types/IVertex";
import {DirectedGraph} from "../main/DirectedGraph";
import {UndirectedGraph} from "../main/UndirectedGraph";
import {IEdge} from "../types/IEdge";
import {Vertex} from "../main/Vertex";
import {Graph} from "../main/Graph";
import {UndirectedEdge} from "../main/UndirectedEdge";

/**
 * @classdesc
 * Finder of SCC
 */
export class SccBuilder {
    /**
     * Finds strongly connected components
     * @param graph
     * @returns {IGraph[]}
     */
    public static findComponents(graph: IGraph<IVertex, IEdge>): IGraph<IVertex, IEdge>[] {
        return (new SccBuilder(graph)).buildComponents();
    }

    private readonly _accessibilityMatrix: number[][];
    private readonly _graph: IGraph<IVertex, IEdge>;
    private readonly _vertices: IVertex[];

    private constructor(graph: IGraph<IVertex, IEdge>) {
        this._graph = graph;
        this._vertices = this._graph.vertices;
        this._accessibilityMatrix = [new Array(this._graph.verticesNumber), new Array(this._graph.verticesNumber)];
    }

    private  buildAccessibilityMatrix(startIndex: number, currentIndex: number): void {
        const currentVertex: IVertex = this._vertices[currentIndex];

        for (let i: number = 0; i < this._graph.verticesNumber; i++)
        {
            if (i == startIndex ||
                this._graph.getEdge(currentVertex, this._vertices[i]) == null ||
                this._accessibilityMatrix[startIndex][i] != 0)
            {
                continue;
            }

            this._accessibilityMatrix[startIndex][i] = 1;
            this.buildAccessibilityMatrix(startIndex, i);
        }
    }

    //TODO: кажется, тут местами можно немного проще сделать
    private buildComponents(): IGraph<IVertex, IEdge>[] {
        for (let i: number = 0; i < this._graph.verticesNumber; i++)
        {
            this.buildAccessibilityMatrix(i, i);
        }

        const s: number[][] = [new Array(this._graph.verticesNumber), new Array(this._graph.verticesNumber)];


        for (let i: number = 0; i < this._graph.verticesNumber; i++)
        {
            for (let j: number = 0; j < this._graph.verticesNumber; ++j)
            {
                s[i][j] = this._accessibilityMatrix[i][j] * this._accessibilityMatrix[j][i];
            }
        }

        const added: boolean[] = new Array(this._graph.verticesNumber);
        for (let i: number = 0; i < added.length; i++)
        {
            added[i] = false;
        }

        const components: IGraph<IVertex, IEdge>[] = [];
        for (let i: number = 0; i < this._graph.verticesNumber; i++)
        {
            if (added[i])
                continue;
            // const scc: IGraph<IVertex, IEdge> = this._graph.isDirected
            //     ? new DirectedGraph()
            //     : new UndirectedGraph();
            const scc: IGraph<IVertex, IEdge> = new Graph<Vertex,UndirectedEdge>();

            added[i] = true;
            scc.addVertex(this._vertices[i]);
            for (let j: number = 0; j < this._graph.verticesNumber; j++)
            {
                if (!added[j] && s[i][j] == 1)
                {
                    added[j] = true;
                    scc.addVertex(this._vertices[j]);
                }
            }
            components.push(scc);
        }
        this._graph.edges.forEach(edge => {
            const whereToAdd =
                components.filter(c => c.vertices.indexOf(edge.vertexOne) != -1 &&
                c.vertices.indexOf(edge.vertexTwo) != -1);
            whereToAdd.forEach(c => c.addEdge(edge));
        });
        return components;
    }
}