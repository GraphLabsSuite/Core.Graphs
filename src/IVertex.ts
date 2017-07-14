/**
 * @interface
 * Interface of the vertex
 */
export interface IVertex {
  /**
   * @property
   * @public
   * Id of the vertex, identifying it
   */
  id: number;
  /**
   * @property
   * @public
   * The name of the vertex (shown on the vertex visually)
   */
  name: string;
  /**
   * @property
   * @public
   * The additional label for further information of the vertex (i.e. weight)
   */
  label?: string;
  /**
   * Allows to change the name property of the vertex
   * @param newName
   * @returns {IVertex}
   */
  rename: (newName: string)=> IVertex
}