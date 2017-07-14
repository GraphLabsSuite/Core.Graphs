import {IEdge} from "./IEdge";
/**
 * @interface
 * Interface of the weighted edge
 */
export interface IWeightedEdge extends IEdge {
  /**
   * @property
   * @public
   * Weight of the edge
   */
  weight: number;
}
