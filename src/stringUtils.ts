import textNode = require("./textNode");
import textNodeTypes = textNode.TEXT_NODE_TYPE;
import treeNode = require("./treeNode");

export const ERROR: string = "ERROR";
const SPECIAL_SYMBOLS_REGEXP: RegExp = /([^\(\)\,]+)|([\(\)\,])/g;
enum SPECIAL_SYMBOLS {
    CHARACTER_LEFT_PARENTHESIS = "(",
    CHARACTER_RIGHT_PARENTHESIS = ")",
    CHARACTER_COLON_PARENTHESIS = ",",
}

export function printNodeInReverse(node: treeNode.TreeNode): string {
    let result: string = node.getName();

    if (node.getChildNodes().length > 0) {
        result += SPECIAL_SYMBOLS.CHARACTER_LEFT_PARENTHESIS;
        result += node.getChildNodes().reverse()
            .map((childNode) => printNodeInReverse(childNode))
            .join(SPECIAL_SYMBOLS.CHARACTER_COLON_PARENTHESIS);
        result += SPECIAL_SYMBOLS.CHARACTER_RIGHT_PARENTHESIS;
    }

    return result;
}

export function parseTextNodes(line: string): textNode.TextNode[] {
    const splittedLine: string[] = line.match(SPECIAL_SYMBOLS_REGEXP);
    return splittedLine.map((chunk) => {
        let type: textNode.TEXT_NODE_TYPE;
        if (chunk === SPECIAL_SYMBOLS.CHARACTER_COLON_PARENTHESIS) {
            type = textNodeTypes.COLON;
        } else if (chunk === SPECIAL_SYMBOLS.CHARACTER_LEFT_PARENTHESIS) {
            type = textNodeTypes.LEFT_PARENTHESIS;
        } else if (chunk === SPECIAL_SYMBOLS.CHARACTER_RIGHT_PARENTHESIS) {
            type = textNodeTypes.RIGHT_PARENTHESIS;
        } else {
            type = textNodeTypes.NAME;
        }
        return new textNode.TextNode(chunk, type);
    });
}
