import {ITreeNode} from "../types/ITreeNode";

/**
 * @classdesc
 * TreeNode implementation of the ITreeNode interface
 */
export class TreeNode implements ITreeNode {

  /**
   * @property
   * @private
   * Max identifier of list of nodes
   */
  public static lastId: number = 0;
  /**
   * @property
   * @public
   * MNode's identifier
   */
  public id: number;
  /**
   * @property
   * @public
   * Node's label
   */
  /**
   * @property
   * @public
   * Node's label
   */
  public label: string;
  /**
   * @property
   * @public
   * Node's weight
   */
  public weight: number;
  /**
   * @property
   * @public
   * Node's position on canvas
   */
  public position: {x: number; y: number};
  /**
   * @property
   * @public
   * The list of node's children
   */
  public children: TreeNode[] = [];

  /**
   * @constructor
   */
   private constructor(label: string, weight: number, position: {x: number; y: number}) {
       this.id = TreeNode.lastId++;
       this.label = label;
       this.weight = weight;
       this.children = [];
       this.position = position;
   }
  /**
   * @public
   * Gets the node's unique identifier
   */
  public getId(): number {
    return this.id;
  }
  /**
   * @public
   * Gets the node's label
   */
  public getLabel(): string {
    return this.label;
  }
  /**
   * @public
   * Gets the node's position on canvas
   * @returns {number; number}
   */
  public getPosition(): {x: number; y: number} {
    if (this.position === void 0) { throw Error("Position wasn't specified")}
    return this.position;
  }
  /**
   * @public
   * Sets the new node's position
   * @param pos
   */
  public setPosition(pos: {x: number; y: number}): void {
    if (this.position === void 0) { this.position = pos; }
    if (pos.x !== this.position.x) { this.position.x = pos.x; }
    if (pos.y !== this.position.y) { this.position.y = pos.y; }
  }
  /**
   * @public
   * Adds the new node's child
   * @param parentId
   * @param label
   * @param weight
   */
  public addChild(parentId: number, label: string, weight: number, position: {x: number; y: number}): void {
    const node = this.getNodeById(parentId);
    node.children.push(new TreeNode(label, weight, position));
  }
  /**
   * @public
   * Removes node
   * @param nodeId
   */
   public removeNode(nodeId: number): void {
     const parentNode = this.deepNodeSearch((n: TreeNode) => n.children.some((e: TreeNode) => e.id === nodeId));
     if (parentNode === void 0) { throw Error("Root cannot be removed."); }
     (<TreeNode>parentNode).children = (<TreeNode>parentNode).children.filter((e: TreeNode) => e.id !== nodeId);
   }
  /**
   * @public
   * Finds node by id
   * @param nodeId
   * @returns {TreeNode}
   */
   public getNodeById(nodeId: number): TreeNode {
     const node = this.deepNodeSearch((n: TreeNode) => n.id === nodeId);
     if (node === void 0) { throw Error("No node found by specified id."); }
     return <TreeNode>node;
   }
   /**
    * @public
    * Gets all nodes
    * @returns {TreeNode[]}
    */
   public getNodeList(): TreeNode[] {
     const childrenNodeList:TreeNode[] = this.children.map((e: TreeNode) => e.getNodeList()).reduce((a,b) => a.concat(b), []);
     const self: TreeNode = this;
     return [self].concat(childrenNodeList).sort((a,b) => a.getId() - b.getId());
   }
   /**
    * @public
    * Finds node by condition
    * @param predicate
    * @returns {TreeNode | void}
    */
   public deepNodeSearch(predicate: (node: TreeNode) => boolean): TreeNode | void {
     if (predicate(this)) { return this; }
     if (this.children.length > 0) {
         return this.children.map((e: TreeNode) => e.deepNodeSearch(predicate)).filter((e: TreeNode | void) => e !== void 0)[0];
     }
     return void 0;
   }
}
