export class TreeNode {
    private name: string;
    private childNodes: TreeNode[];

    constructor(name: string) {
        this.name = name;
        this.childNodes = [];
    }

    public getName(): string {
        return this.name;
    }

    public addChildNodes(nodes: TreeNode[]): void {
        Array.prototype.push.apply(this.childNodes, nodes);
    }

    public getChildNodes(): TreeNode[] {
        return this.childNodes;
    }
}
