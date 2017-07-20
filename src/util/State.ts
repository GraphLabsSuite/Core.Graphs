import {StateColor} from "../enums/StateColor";
import {IVertex} from "../types/IVertex";
import {UndirectedGraph} from "../main/UndirectedGraph";

/**
 * State of the graph within recursion
 */
export class State {
    /**
     * Vertex colors
     */
    private _vertexColors: {[vertex: number]: StateColor};

    /**
     * Vertex neighbors
     */
    private _vertexNeighbors: {[vertex: number]: IVertex[]};

    /**
     * Dominant number
     */
    private _vertexDominatedNumber: {[vertex: number]: number};

    /**
     * Number of possible dominants
     */
    private _vertexPossibleDominatingNumber: {[vertex: number]: number};

    /**
     * Temporal dominating set
     */
    private _tempDs: IVertex[];

    /**
     * Auxiliary list of vertices
     */
    private _verticesList: IVertex[];

    /**
     * Number of vertices being dominated
     */
    public nDominated: number;

    /**
     * Level of the recursion
     */
    public level: number;

    public get tempDs(): IVertex[] {
        return this._tempDs;
    }

    public vertexColor(vertex: IVertex): StateColor {
        this._verticesList.forEach(v => {
           if (vertex.equals(v)) return this._vertexColors[v.id.idValue];
        });
        return undefined; //If nothing has been found
    }

    public setVertexColor(vertex: IVertex, color: StateColor): void {
        this._verticesList.forEach(v => {
            if (vertex.equals(v)) this._vertexColors[v.id.idValue] = color;
        });
    }

    public vertexNeighbors(vertex: IVertex): IVertex[] {
        this._verticesList.forEach(v => {
            if (vertex.equals(v)) return this._vertexNeighbors[v.id.idValue];
        });
        return undefined;
    }

    public vertexDominatedNumber(vertex: IVertex): number {
        this._verticesList.forEach(v => {
            if (vertex.equals(v)) return this._vertexDominatedNumber[v.id.idValue];
        });
        return undefined;
    }

    public decrementVertexDominatedNumber(vertex: IVertex): void {
        this._verticesList.forEach(v => {
            if (vertex.equals(v)) {
                this._vertexDominatedNumber[v.id.idValue] = this._vertexDominatedNumber[v.id.idValue] - 1;
            }
        });
    }

    public incrementVertexDominatedNumber(vertex: IVertex): void {
        this._verticesList.forEach(v => {
            if (vertex.equals(v)) {
                this._vertexDominatedNumber[v.id.idValue] = this._vertexDominatedNumber[v.id.idValue] + 1;
            }
        });
    }

    public vertexDominatedNumberValues(): number[] {
        const result: number[] = [];
        for (const key in this._vertexDominatedNumber) {
            result.push(this._vertexDominatedNumber[key]);
        }
        return result;
    }

    public vertexPossibleDominatingNumber(vertex: IVertex): number {
        this._verticesList.forEach(v => {
            if (vertex.equals(v)) return this._vertexPossibleDominatingNumber[v.id.idValue];
        });
        return undefined;
    }

    public vertexPossibleDominatingNumberValues(): number[] {
        const result: number[] = [];
        for (const key in this._vertexPossibleDominatingNumber) {
            result.push(this._vertexPossibleDominatingNumber[key]);
        }
        return result;
    }

    public decrementVertexPossibleDominatingNumber(vertex: IVertex): void {
        this._verticesList.forEach(v => {
            if (vertex.equals(v)) {
                this._vertexPossibleDominatingNumber[v.id.idValue] = this._vertexPossibleDominatingNumber[v.id.idValue] - 1;
            }
        });
    }

    public incrementVertexPossibleDominatingNumber(vertex: IVertex): void {
        this._verticesList.forEach(v => {
            if (vertex.equals(v)) {
                this._vertexPossibleDominatingNumber[v.id.idValue] = this._vertexPossibleDominatingNumber[v.id.idValue] + 1;
            }
        });
    }

    /**
     * Clones the state for the recursion process
     * @returns {State}
     */
    public clone(): State
    {
        return new State(this);
    }

    /**
     * @constructor
     * Initialising parameters for the algorithm
     * @param graph
     */
    public constructor(graph: UndirectedGraph) {
        this._verticesList = graph.vertices;
        this._tempDs = [];
        this._vertexColors = [];
        this._vertexDominatedNumber = [];
        this._vertexNeighbors = [];
        this._vertexPossibleDominatingNumber = [];
        this.level = 0;
        for (const vertex of graph.vertices) {
            this._vertexColors[vertex.id.idValue] = StateColor.WHITE;
            this._vertexDominatedNumber[vertex.id.idValue] = 0;
            const tempNeighbors: IVertex[] = [];
            for (let i = 0; i < graph.verticesNumber; i++) {
                if (graph.getEdge(graph.vertices[i], vertex) != null) tempNeighbors.push(graph.vertices[i]);
            }
            this._vertexNeighbors[vertex.id.idValue] = tempNeighbors;
            this._vertexPossibleDominatingNumber[vertex.id.idValue] = tempNeighbors.length + 1;
        }
        this.nDominated = 0;
    }

    private constructor(prototype: State) {
        this.level = prototype.level;
        this.nDominated = prototype.nDominated;
        this._tempDs = [];
        prototype._tempDs.forEach(ds => this._tempDs.push(ds));
        this._vertexColors = {};
        for (const key in prototype._vertexColors) {
            this._vertexColors[key] = prototype._vertexColors[key];
        }
        this._vertexNeighbors = {};
        for (const key in prototype._vertexNeighbors) {
            this._vertexNeighbors[key] = prototype._vertexNeighbors[key];
        }
        this._vertexDominatedNumber = {};
        for (const key in prototype._vertexDominatedNumber) {
            this._vertexDominatedNumber[key] = prototype._vertexDominatedNumber[key];
        }
        this._vertexPossibleDominatingNumber = {};
        for (const key in prototype._vertexPossibleDominatingNumber) {
            this._vertexPossibleDominatingNumber[key] = prototype._vertexPossibleDominatingNumber[key];
        }
    }
}