import { OrganisationStructure } from "./models/OrganisationStructure";
import {
  OrganisationUnit,
  OrganisationUnitNode,
} from "./models/OrganisationUnit";

export function calculateMembershipFee(
  rentAmount: number,
  rentPeriod: "month" | "week",
  organisationUnit: OrganisationUnitNode
): number | Error {
  //Convert to weekly rent amount
  if (rentPeriod === "month") rentAmount = Math.ceil(rentAmount / 4);

  //If not within range
  if (rentAmount < 25 || rentAmount > 2000)
    return new Error("Amount is not within the range");

  let membershipFee: number;

  //if no config object
  if (!organisationUnit.config?.hasFixedMembershipFee) {
    function traverse(node: OrganisationUnitNode) {
      if (node.config && node.config.hasFixedMembershipFee) {
        organisationUnit = node;
        return;
      }
      if (!node.parent) return;
      traverse(node.parent);
    }
    traverse(organisationUnit);
  }

  //if organisation unit has a config and a fixed amount in config
  if (organisationUnit.config && organisationUnit.config.hasFixedMembershipFee)
    membershipFee = organisationUnit.config.fixedMembershipFeeAmount;
  //otherwise check if period is month and if so divide by 4 to get weekly amount
  else {
    //if amount is under 120, fix membership fee  to 120*1.2
    if (rentAmount < 120) membershipFee = 120 * 1.2;
    else membershipFee = rentAmount * 1.2;
  }

  //convert to pence
  membershipFee = membershipFee * 100;
  return membershipFee;
}

let arr: OrganisationUnit[] = [
  {
    name: "client",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "division_a",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "division_b",
    config: {
      hasFixedMembershipFee: true,
      fixedMembershipFeeAmount: 35000,
    },
  },
  {
    name: "area_a",
    config: {
      hasFixedMembershipFee: true,
      fixedMembershipFeeAmount: 45000,
    },
  },
  {
    name: "area_b",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "area_c",
    config: {
      hasFixedMembershipFee: true,
      fixedMembershipFeeAmount: 45000,
    },
  },
  {
    name: "area_d",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  { name: "branch_a", config: null },
  {
    name: "branch_b",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_c",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  { name: "branch_d", config: null },
  {
    name: "branch_e",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_f",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_g",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_h",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_i",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_j",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_k",
    config: {
      hasFixedMembershipFee: true,
      fixedMembershipFeeAmount: 25000,
    },
  },
  {
    name: "branch_l",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  { name: "branch_m", config: null },
  {
    name: "branch_n",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_o",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
  {
    name: "branch_p",
    config: { hasFixedMembershipFee: false, fixedMembershipFeeAmount: 0 },
  },
];

let org = new OrganisationStructure();
org.insertAll(arr);

let results = org.getBranches() as OrganisationUnitNode[];
let membershipFees: { name: string; membershipFee: number }[] = [];
results.forEach((branch) => {
  let membershipFee = calculateMembershipFee(30, "week", branch);
  console.log(membershipFee);

  if (typeof membershipFee == "number")
    membershipFees.push({ name: branch.name, membershipFee: membershipFee });
});

console.log(membershipFees);
