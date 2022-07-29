"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationStructure = void 0;
const OrganisationUnit_1 = require("./OrganisationUnit");
class OrganisationStructure {
    constructor() {
        this.root = null;
    }
    insertAll(arr) {
        for (let i = 0; i < arr.length; i++) {
            let node = new OrganisationUnit_1.OrganisationUnitNode(arr[i]);
            let client = this.root;
            if (i == 0) {
                this.root = node;
            }
            else if (i <= 2) {
                node.parent = client;
                node.parent.children.push(node);
            }
            else if (i <= 6) {
                if (i <= 4)
                    node.parent = client.children[0];
                else
                    node.parent = client.children[1];
                node.parent.children.push(node);
            }
            else if (i <= 22) {
                if (i <= 10)
                    node.parent = client.children[0].children[0];
                else if (i <= 14)
                    node.parent = client.children[0].children[1];
                else if (i <= 18)
                    node.parent = client.children[1].children[0];
                else
                    node.parent = client.children[1].children[1];
                node.parent.children.push(node);
            }
        }
    }
    getBranches() {
        if (!this.root)
            return;
        let current = this.root;
        let results = [];
        function traverse(node) {
            if (!node.children.length)
                results.push(node);
            else {
                node.children.forEach((child) => traverse(child));
            }
        }
        traverse(current);
        return results;
    }
}
exports.OrganisationStructure = OrganisationStructure;
//# sourceMappingURL=OrganisationStructure.js.map