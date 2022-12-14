import { OrganisationUnitNode } from "./models/OrganisationUnit";

export function calculateMembershipFee(
  rentAmount: number,
  rentPeriod: "month" | "week",
  organisationUnit: OrganisationUnitNode
): number | Error {
  //If not within range
  if (
    (rentPeriod === "week" && (rentAmount < 25 || rentAmount > 2000)) ||
    (rentPeriod === "month" && (rentAmount < 110 || rentAmount > 8660))
  )
    return new Error("Amount is not within the range");

  const VAT = 1.2;

  //Convert to weekly rent amount
  if (rentPeriod === "month")
    rentAmount = parseFloat(((rentAmount * 12) / 52).toFixed(2));

  let membershipFee: number;

  //if no config object
  if (!organisationUnit.config?.hasFixedMembershipFee) {
    //Recursively call traverse to look for fixed fee
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
    if (rentAmount < 120) membershipFee = 120 * VAT;
    else membershipFee = parseFloat((rentAmount * VAT).toFixed(2));
  }

  //convert to pence
  membershipFee = membershipFee * 100;
  return membershipFee;
}
