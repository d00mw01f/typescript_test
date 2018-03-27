"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringUtils = require("./stringUtils");
var textNode = require("./textNode");
var textNodeTypes = textNode.TEXT_NODE_TYPE;
var treeNode = require("./treeNode");
function flipLine(line) {
    try {
        var textNodes = stringUtils.parseTextNodes(line);
        var node = parseRootTreeNode(textNodes);
        return stringUtils.printNodeInReverse(node);
    }
    catch (e) {
        console.error("Error in line: " + line);
        console.error(e.message);
        return stringUtils.ERROR;
    }
}
exports.flipLine = flipLine;
function parseRootTreeNode(textNodes) {
    var rootNode = parseTreeNode(textNodes);
    if (textNodes.length === 0) {
        return rootNode;
    }
    throw new Error("Something rest in the line after reading");
}
function parseTreeNode(textNodes) {
    if (textNodes.length === 0 || textNodes[0].getType() !== textNodeTypes.NAME) {
        throw new Error("Node name expected");
    }
    var node = new treeNode.TreeNode(textNodes.splice(0, 1)[0].getText());
    if (textNodes.length > 0 && textNodes[0].getType() === textNodeTypes.LEFT_PARENTHESIS) {
        textNodes.splice(0, 1);
        node.addChildNodes(parseChilds(textNodes));
    }
    return node;
}
function parseChilds(textNodes) {
    var childNodes = [];
    while (true) {
        var node = parseTreeNode(textNodes);
        childNodes.push(node);
        if (textNodes.length > 0 && textNodes[0].getType() === textNodeTypes.COLON) {
            textNodes.splice(0, 1);
        }
        else if (textNodes.length > 0 && textNodes[0].getType() === textNodeTypes.RIGHT_PARENTHESIS) {
            textNodes.splice(0, 1);
            break;
        }
        else {
            throw new Error("Colon or right parenthesis expected in child node reading");
        }
    }
    return childNodes;
}
//# sourceMappingURL=parser.js.map