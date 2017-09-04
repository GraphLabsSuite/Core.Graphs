import {IGraph} from "./IGraph";
import {IEdge} from "./IEdge";
import {IVertex} from "./IVertex";
/**
 * @interface
 * Static function for IGraph interface
 */
export class IGraphStatic {
    /**
     * @static
     * @public
     * Static extension of intersect operation for N graphs
     * @param graphs
     * @returns {IGraph}
     */
    public static intersectN: (graphs: IGraph<IVertex, IEdge>[])=> IGraph<IVertex, IEdge>;


    /**
     * @static
     * @public
     * Static extension of union operation for N graphs
     * @param graphs
     * @returns {IGraph}
     */
    public static unionN: (graphs: IGraph<IVertex, IEdge>[])=> IGraph<IVertex, IEdge>;
}