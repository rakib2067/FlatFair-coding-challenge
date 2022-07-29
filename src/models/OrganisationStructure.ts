import { OrganisationUnit, OrganisationUnitNode } from "./OrganisationUnit";
export class OrganisationStructure {
  root: OrganisationUnitNode | null;
  constructor() {
    this.root = null;
  }
  //Adds all JSON objects and orders to tree
  insertAll(arr: OrganisationUnit[]) {
    for (let i = 0; i < arr.length; i++) {
      let node = new OrganisationUnitNode(arr[i]);
      let client = this.root as OrganisationUnitNode;

      if (i == 0) {
        //client
        this.root = node;
      } else if (i <= 2) {
        //division
        node.parent = client;
        node.parent.children.push(node);
      } else if (i <= 6) {
        //area
        if (i <= 4) node.parent = client.children[0];
        else node.parent = client.children[1];
        node.parent.children.push(node);
      } else if (i <= 22) {
        if (i <= 10) node.parent = client.children[0].children[0];
        else if (i <= 14) node.parent = client.children[0].children[1];
        else if (i <= 18) node.parent = client.children[1].children[0];
        else node.parent = client.children[1].children[1];
        node.parent.children.push(node);
      }
    }
  }
  //Returns all branches
  getBranches() {
    if (!this.root) return;

    let current = this.root;
    let results: OrganisationUnitNode[] = [];
    //Recursively checks and pushes children in order
    function traverse(node: OrganisationUnitNode) {
      if (!node.children.length) results.push(node);
      else {
        node.children.forEach((child) => traverse(child));
      }
    }
    traverse(current);
    return results;
  }
}
