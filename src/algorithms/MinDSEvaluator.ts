import {IVertex} from "../main/IVertex";
import {UndirectedGraph} from "../main/UndirectedGraph";
import {State} from "../util/State";
import {CheckSet} from "../util/CheckSet";
import {StateColor} from "../enums/StateColor";
/**
 * @classdesc
 * Minimal dominating sets evaluator
 */
export class MinDSEvaluator {

    /**
     * Minimal dominating sets
     */
    public readonly _minDs: IVertex[][];

    /**
     * Checker for stopping recursion of unpromising branches
     */
    private readonly _delta: number;

    /**
     * Maximum level of the recursion
     */
    private readonly _n: number;

    /**
     * @constructor
     * @param graph
     */
    public constructor(graph: UndirectedGraph) {
        this._minDs = [];
        this._delta = 0;
        this._n = graph.verticesNumber;
        const tempDs: IVertex[] = [];
        for (let i: number = 0; i < this._n; i++) {
            tempDs.push(graph.vertices[i]);
            let tempDelta: number = 0;
            for (let j: number = 0; j < this._n; j++) {
                if (graph.vertices[i].isAdjacent(graph.vertices[j])) tempDelta++;
            }
            if (tempDelta > this._delta) this._delta = tempDelta;
        }
        this._minDs.push(tempDs);
    }

    public evaluate(graph: UndirectedGraph, flag: boolean): IVertex[][] {
        const firstStep = new State(graph);
        this.process(firstStep, graph, flag);
        return this._minDs;
    }

    /**
     * Checks whether there are vertices could not be covered by red vertex in this context
     * @param vertex
     * @param state
     * @returns {boolean}
     */
    private canVertexBeCovered(vertex: IVertex, state: State): boolean {
        const neighbors: IVertex[] = state.vertexNeighbors[vertex];
        const vertDomNum: number = state.vertexPossibleDominatingNumber[vertex];
        if (vertDomNum == 0) return false;
        if (neighbors != null)
            for (const neigh of neighbors) {
                const neighVertDomNum: number = state.vertexPossibleDominatingNumber[neigh];
                if (neighVertDomNum == 0) return false;
            }
        return true;
    }

    /**
     * Checks whether all vertices can be dominated by anyone
     * @param state
     * @returns {boolean}
     */
    private canVerticesBeCovered(state: State): boolean {
        for (const value of state.vertexPossibleDominatingNumberValues())
            if (value == 0) return false;
        return true;
    }

    private recountNDominated(state: State): number {
        let result: number = 0;
        for (const value of state.vertexDominatedNumberValues())
            if (value > 0) result++;
        return result;
    }

    private blueVertexRecount(state: State, givenVertex: IVertex): void {
        let neighbors: IVertex[] = state.vertexNeighbors(givenVertex);
        state.decrementVertexPossibleDominatingNumber(givenVertex);
        if (neighbors != [])
            for (const vertex of neighbors)
                state.decrementVertexPossibleDominatingNumber(vertex);
    }

    private redVertexRecount(state: State, givenVertex: IVertex): void {
        state.incrementVertexPossibleDominatingNumber(givenVertex);
        state.incrementVertexDominatedNumber(givenVertex);
        for (const vertex of state.vertexNeighbors(givenVertex)) {
            state.incrementVertexPossibleDominatingNumber(vertex);
            state.incrementVertexDominatedNumber(vertex);
        }
        state.nDominated = this.recountNDominated(state);
    }

    private process(givenState: State, graph: UndirectedGraph, flag: boolean): void {
        if (givenState.level == this._n)
        {
            const isAllVerticesCovered = this.canVerticesBeCovered(givenState);
            if (isAllVerticesCovered)
            {
                if (flag)
                {
                    if (this._minDs[0].length > givenState.tempDs.length)
                    {
                        this._minDs.forEach(d => this._minDs.pop());
                        this._minDs.push(givenState.tempDs);
                        return;
                    }
                    if (this._minDs[0].length == givenState.tempDs.length)
                    {
                        this._minDs.push(givenState.tempDs);
                        return;
                    }
                }
                else
                {
                    const checker = new CheckSet();
                    if (checker.isMinimal(givenState.tempDs, graph))
                    {
                        this._minDs.push(givenState.tempDs);
                    }
                }
            }
        }
        else
        {
            const givenVertex: IVertex = graph.vertices[givenState.level];
            givenState.setVertexColor(givenVertex,StateColor.BLUE);
            this.blueVertexRecount(givenState, givenVertex);
            const isVertexCovered = this.canVertexBeCovered(givenVertex, givenState);
            if (isVertexCovered)
            {
                const newState = givenState.clone();
                newState.level++;
                this.process(newState, graph, flag);
            }
            givenState.setVertexColor(givenVertex, StateColor.RED);
            givenState.tempDs.push(givenVertex);
            this.redVertexRecount(givenState, givenVertex);
            if (givenState.nDominated == this._n)
            {
                if (flag)
                {
                    if (this._minDs[0].length > givenState.tempDs.length)
                    {
                        this._minDs.forEach(d => this._minDs.pop());
                        this._minDs.push(givenState.tempDs);
                        return;
                    }
                    if (this._minDs[0].length == givenState.tempDs.length)
                    {
                        this._minDs.push(givenState.tempDs);
                        return;
                    }
                }
                else
                {
                    const checker = new CheckSet();
                    if (checker.isMinimal(givenState.tempDs, graph))
                        this._minDs.push(givenState.tempDs);
                }
            }
            else
            {
                if (flag)
                {
                    const nExtra = (this._n - givenState.nDominated)/(this._delta + 1);
                    if ((nExtra + givenState.tempDs.length) > this._minDs[0].length)
                        return;
                    else
                    {
                        const newState = givenState.clone();
                        newState.level++;
                        this.process(newState, graph, flag);
                        return;
                    }
                }
                else
                {
                    const newState = givenState.clone();
                    newState.level++;
                    this.process(newState, graph, flag);
                    return;
                }
            }

        }
    }
}