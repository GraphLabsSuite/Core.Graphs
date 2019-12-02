/**
 * @interface
 * Base tree node interface
 */
export interface ITreeNode<T> {

  /**
   * @property
   * @public
   * MNode's identifier
   */
  id: number;
  /**
   * @property
   * @public
   * Node's label
   */
  label: string;
  /**
   * @property
   * @public
   * Node's weight

   */
  weight: T;
  /**
   * @property
   * @private
   * Node's position on canvas
   */
  position: {x: number; y: number};

  /**
   * @public
   * Gets the node's unique identifier
   */
  getId: () => number;
  /**
   * @public
   * Gets the node's label
   */
  getLabel: () => string
  /**
   * @public
   * Gets the node's position on canvas
   * @returns {number; number}
   */
  getPosition: () => {x: number; y: number};
  /**
   * @public
   * Sets the new node's position
   * @param pos
   */
  setPosition: (pos: {x: number; y: number}) => void;
  /**
   * @public
   * Adds the new node's child
   * @param parentId
   * @param label
   * @param weight
   */
  addChild: (parentId: number, label: string, weight: T, position: {x: number; y: number}) => void;
  /**
   * @public
   * Removes node
   * @param nodeId
   */
  removeNode: (nodeId: number) => void;
}
