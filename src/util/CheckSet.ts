import {IVertex} from "../main/IVertex";
import {UndirectedGraph} from "../main/UndirectedGraph";
/**
 * @classdesc
 * Checkers for dominating and minimal dominating sets
 */
export class CheckSet {

    /**
     * Checker for a dominating set
     * @param vSet
     * @param givenGraph
     * @returns {boolean}
     * @constructor
     */
    public isExternalStability(vSet: IVertex[], givenGraph: UndirectedGraph): boolean {
        const extendedSetofVertex: IVertex[] = [];
        for (const vertex of vSet)  {
            extendedSetofVertex.push(vertex);
        }

        //We add vertices adjacent with the chosen one into extended set of vertices
        for (const vertex of vSet) {
            for (const edge of givenGraph.edges)
            {
                if ((edge.vertexOne == vertex) && !extendedSetofVertex.filter(v => v.equals(edge.vertexTwo))[0]) {
                    extendedSetofVertex.push(edge.vertexTwo);
                }
                if ((edge.vertexTwo == vertex) && !extendedSetofVertex.filter(v => v.equals(edge.vertexOne))[0]) {
                    extendedSetofVertex.push(edge.vertexOne);
                }
            }
        }

        //We check whether the graph has vertices that are not adjacent to the ones in the extended set
        for (const vertex of givenGraph.vertices)
            if (!extendedSetofVertex.filter(v => v.equals(vertex))[0]) return false;
        return true;
    }

    /**
     * Checker for minimal dominating set
     * @param setEs
     * @param givenGraph
     * @returns {boolean}
     */
    public isMinimal(setEs: IVertex[], givenGraph: UndirectedGraph): boolean {
        let leadFlag: boolean = true;
        let flag: boolean = true;
        for (const vertex of setEs) {
            const newSet: IVertex[] = [];
            setEs.forEach(v => {
               if (!v.equals(vertex)) newSet.push(v);
            });
            flag = this.isExternalStability(newSet, givenGraph);
            if (flag) leadFlag = false;
        }
        return leadFlag;
    }
}