"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TEXT_NODE_TYPE;
(function (TEXT_NODE_TYPE) {
    TEXT_NODE_TYPE[TEXT_NODE_TYPE["NAME"] = 0] = "NAME";
    TEXT_NODE_TYPE[TEXT_NODE_TYPE["LEFT_PARENTHESIS"] = 1] = "LEFT_PARENTHESIS";
    TEXT_NODE_TYPE[TEXT_NODE_TYPE["RIGHT_PARENTHESIS"] = 2] = "RIGHT_PARENTHESIS";
    TEXT_NODE_TYPE[TEXT_NODE_TYPE["COLON"] = 3] = "COLON";
})(TEXT_NODE_TYPE = exports.TEXT_NODE_TYPE || (exports.TEXT_NODE_TYPE = {}));
var TextNode = /** @class */ (function () {
    function TextNode(text, type) {
        this.text = text;
        this.type = type;
    }
    TextNode.prototype.getType = function () {
        return this.type;
    };
    TextNode.prototype.getText = function () {
        return this.text;
    };
    return TextNode;
}());
exports.TextNode = TextNode;
//# sourceMappingURL=textNode.js.map