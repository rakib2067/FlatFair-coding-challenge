"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationUnitNode = void 0;
class OrganisationUnitNode {
    constructor({ name, config }, parent) {
        this.name = name;
        this.config = config;
        this.children = [];
        this.parent = parent || undefined;
    }
}
exports.OrganisationUnitNode = OrganisationUnitNode;
//# sourceMappingURL=OrganisationUnit.js.map