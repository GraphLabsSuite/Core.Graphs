import {IGraph} from "../types/IGraph";
import {IVertex} from "../types/IVertex";
import {DirectedGraph} from "../main/DirectedGraph";
import {UndirectedGraph} from "../main/UndirectedGraph";
import {IEdge} from "../types/IEdge";

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
        this._accessibilityMatrix = SccBuilder.buildAdjacencyMatrix(graph);
    }

    public static buildAdjacencyMatrix(graph: IGraph<IVertex, IEdge>): number[][] {
        const result: number[][] = [];
        for (let i: number = 0; i < graph.vertices.length; i++) {
            result[i] = [];
            for (let j: number = 0; j < graph.vertices.length; j++) {
                if (i == j) {
                    result[i][j] = 1;
                    continue;
                }
                if (graph.vertices[j].isAdjacent(graph, graph.vertices[i])) {
                    result[i][j] = 1;
                    continue;
                }
                result[i][j] = 0;
            }
        }
        return result;
    }

    //TODO: кажется, тут местами можно немного проще сделать
    private buildComponents(): IGraph<IVertex, IEdge>[] {
        const s: number[][] = [];
        for (let i: number = 0; i < this._graph.vertices.length; i++) {
            s[i] = [];
            for (let j: number = 0; j < this._graph.vertices.length; j++)
                s[i][j] = this._accessibilityMatrix[i][j] * this._accessibilityMatrix[j][i];
        }

        const added: boolean[] = new Array(this._graph.vertices.length);
        for (let i: number = 0; i < added.length; i++)
            added[i] = false;

        const components: IGraph<IVertex, IEdge>[] = [];
        for (let i: number = 0; i < this._graph.vertices.length; i++) {
            if (added[i])
                continue;
            const scc: IGraph<IVertex, IEdge> = this._graph.isDirected
                ? new DirectedGraph()
                : new UndirectedGraph();
            // const scc: IGraph<IVertex, IEdge> = new Graph<Vertex,UndirectedEdge>();

            added[i] = true;
            scc.addVertex(this._vertices[i]);
            for (let j: number = 0; j < this._graph.vertices.length; j++)
                if (!added[j] && s[i][j] == 1) {
                    added[j] = true;
                    scc.addVertex(this._vertices[j]);
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
