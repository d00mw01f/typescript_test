"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeNode = /** @class */ (function () {
    function TreeNode(name) {
        this.name = name;
        this.childNodes = [];
    }
    TreeNode.prototype.getName = function () {
        return this.name;
    };
    TreeNode.prototype.addChildNodes = function (nodes) {
        Array.prototype.push.apply(this.childNodes, nodes);
    };
    TreeNode.prototype.getChildNodes = function () {
        return this.childNodes;
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
//# sourceMappingURL=treeNode.js.map