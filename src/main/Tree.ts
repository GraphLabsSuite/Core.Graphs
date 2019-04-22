interface ITreeNode {
    label: string;
    weight: number;
    position: {x: number; y: number};
    children: TreeNode[];
}

export default class TreeNode {

    public static getInstance(node: ITreeNode): TreeNode {
        return new TreeNode(node);
    }

    private static lastId: number = 0;

    public label: string;
    public weight: number;
    private position: {x: number; y: number};
    public children: TreeNode[];

    private readonly id: number;

    private constructor(node: ITreeNode) {
        this.id = TreeNode.lastId++;
        this.label = node.label;
        this.weight = node.weight;
        this.children = node.children;
        this.position = node.position;
    }

    public getId(): number {
        return this.id;
    }

    public getLabel(): string {
        return this.label;
    }

    public getPosition(): {x: number; y: number} {
        if (this.position === void 0) { throw Error("Position wasn't specified")}
        return this.position;
    }

    public setPosition(pos: {x: number; y: number}) {
        if (this.position === void 0) { this.position = pos; }
        if (pos.x !== this.position.x) { this.position.x = pos.x; }
        if (pos.y !== this.position.y) { this.position.y = pos.y; }
    }

    public addLeaf(parentId: number, label: string, weigth: number): void {
        const node = this.getNodeById(parentId);
        node.children.push(TreeNode.getInstance({
            label,
            weight: weigth,
            position: {...node.position},
            children: []
        }));
    }

    public removeLeaf(nodeId: number): void {
        const parentNode = this.deepNodeSearch((n: TreeNode) => n.children.some((e: TreeNode) => e.id === nodeId));
        if (parentNode === void 0) { throw Error("Root cannot be removed."); }
        (<TreeNode>parentNode).children = (<TreeNode>parentNode).children.filter((e: TreeNode) => e.id !== nodeId);
    }

    public getNodeById(id: number): TreeNode {
        const node = this.deepNodeSearch((n: TreeNode) => n.id === id);
        if (node === void 0) { throw Error("No node found by specified id."); }
        return <TreeNode>node;
    }

    public getNodeList(): TreeNode[] {
        const childrenNodeList:TreeNode[] = this.children.map((e: TreeNode) => e.getNodeList()).reduce((a,b) => a.concat(b), []);
        const self: TreeNode = this;
        return [self].concat(childrenNodeList).sort((a,b) => a.getId() - b.getId());
    }

    public deepNodeSearch(predicate: (node: TreeNode) => boolean): TreeNode | void {
        if (predicate(this)) { return this; }
        if (this.children.length > 0) {
            return this.children.map((e: TreeNode) => e.deepNodeSearch(predicate)).find((e: TreeNode | void) => e !== void 0);
        }
        return void 0;
    }
}
