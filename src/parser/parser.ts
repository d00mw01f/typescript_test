import stringUtils = require("./stringUtils");
import textNode = require("./textNode");
import textNodeTypes = textNode.TEXT_NODE_TYPE;
import treeNode = require("./treeNode");

export function flipLine(line: string): string {
    try {
        const textNodes: textNode.TextNode[] = stringUtils.parseTextNodes(line);
        const node: treeNode.TreeNode = parseRootTreeNode(textNodes);
        return stringUtils.printNodeInReverse(node);
    } catch (e) {
        console.error("Error in line: " + line);
        console.error(e.message);
        return stringUtils.ERROR;
    }
}

function parseRootTreeNode(textNodes: textNode.TextNode[]): treeNode.TreeNode {
    const rootNode: treeNode.TreeNode = parseTreeNode(textNodes);
    if (textNodes.length === 0) {
        return rootNode;
    }
    throw new Error("Something rest in the line after reading");
}

function parseTreeNode(textNodes: textNode.TextNode[]): treeNode.TreeNode {
    if (textNodes.length === 0 || textNodes[0].getType() !== textNodeTypes.NAME) {
        throw new Error("Node name expected");
    }
    const node = new treeNode.TreeNode(textNodes.splice(0, 1)[0].getText());
    if (textNodes.length > 0 && textNodes[0].getType() === textNodeTypes.LEFT_PARENTHESIS) {
        textNodes.splice(0, 1);
        node.addChildNodes(parseChilds(textNodes));
    }
    return node;
}

function parseChilds(textNodes: textNode.TextNode[]): treeNode.TreeNode[] {
    const childNodes = [];
    while (true) {
        const node: treeNode.TreeNode = parseTreeNode(textNodes);
        childNodes.push(node);
        if (textNodes.length > 0 && textNodes[0].getType() === textNodeTypes.COLON) {
            textNodes.splice(0, 1);
        } else if (textNodes.length > 0 && textNodes[0].getType() === textNodeTypes.RIGHT_PARENTHESIS) {
            textNodes.splice(0, 1);
            break;
        } else {
            throw new Error("Colon or right parenthesis expected in child node reading");
        }
    }
    return childNodes;
}
