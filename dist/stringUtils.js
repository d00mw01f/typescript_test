"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textNode = require("./textNode");
var textNodeTypes = textNode.TEXT_NODE_TYPE;
exports.ERROR = "ERROR";
var SPECIAL_SYMBOLS_REGEXP = /([^\(\)\,]+)|([\(\)\,])/g;
var SPECIAL_SYMBOLS;
(function (SPECIAL_SYMBOLS) {
    SPECIAL_SYMBOLS["CHARACTER_LEFT_PARENTHESIS"] = "(";
    SPECIAL_SYMBOLS["CHARACTER_RIGHT_PARENTHESIS"] = ")";
    SPECIAL_SYMBOLS["CHARACTER_COLON_PARENTHESIS"] = ",";
})(SPECIAL_SYMBOLS || (SPECIAL_SYMBOLS = {}));
function printNodeInReverse(node) {
    var result = node.getName();
    if (node.getChildNodes().length > 0) {
        result += SPECIAL_SYMBOLS.CHARACTER_LEFT_PARENTHESIS;
        result += node.getChildNodes().reverse()
            .map(function (childNode) { return printNodeInReverse(childNode); })
            .join(SPECIAL_SYMBOLS.CHARACTER_COLON_PARENTHESIS);
        result += SPECIAL_SYMBOLS.CHARACTER_RIGHT_PARENTHESIS;
    }
    return result;
}
exports.printNodeInReverse = printNodeInReverse;
function parseTextNodes(line) {
    var splittedLine = line.match(SPECIAL_SYMBOLS_REGEXP);
    return splittedLine.map(function (chunk) {
        var type;
        if (chunk === SPECIAL_SYMBOLS.CHARACTER_COLON_PARENTHESIS) {
            type = textNodeTypes.COLON;
        }
        else if (chunk === SPECIAL_SYMBOLS.CHARACTER_LEFT_PARENTHESIS) {
            type = textNodeTypes.LEFT_PARENTHESIS;
        }
        else if (chunk === SPECIAL_SYMBOLS.CHARACTER_RIGHT_PARENTHESIS) {
            type = textNodeTypes.RIGHT_PARENTHESIS;
        }
        else {
            type = textNodeTypes.NAME;
        }
        return new textNode.TextNode(chunk, type);
    });
}
exports.parseTextNodes = parseTextNodes;
//# sourceMappingURL=stringUtils.js.map