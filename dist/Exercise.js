"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMembershipFee = void 0;
const OrganisationStructure_1 = require("./models/OrganisationStructure");
function calculateMembershipFee(rentAmount, rentPeriod, organisationUnit) {
    var _a;
    if (rentPeriod === "month")
        rentAmount = Math.ceil(rentAmount / 4);
    if (rentAmount < 25 || rentAmount > 2000)
        return new Error("Amount is not within the range");
    let membershipFee;
    if (!((_a = organisationUnit.config) === null || _a === void 0 ? void 0 : _a.hasFixedMembershipFee)) {
        function traverse(node) {
            if (node.config && node.config.hasFixedMembershipFee) {
                organisationUnit = node;
                return;
            }
            if (!node.parent)
                return;
            traverse(node.parent);
        }
        traverse(organisationUnit);
    }
    if (organisationUnit.config && organisationUnit.config.hasFixedMembershipFee)
        membershipFee = organisationUnit.config.fixedMembershipFeeAmount;
    else {
        if (rentAmount < 120)
            membershipFee = 120 * 1.2;
        else
            membershipFee = rentAmount * 1.2;
    }
    membershipFee = membershipFee * 100;
    return membershipFee;
}
exports.calculateMembershipFee = calculateMembershipFee;
let arr = [
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
let org = new OrganisationStructure_1.OrganisationStructure();
org.insertAll(arr);
let results = org.getBranches();
let membershipFees = [];
results.forEach((branch) => {
    let membershipFee = calculateMembershipFee(30, "week", branch);
    console.log(membershipFee);
    if (typeof membershipFee == "number")
        membershipFees.push({ name: branch.name, membershipFee: membershipFee });
});
console.log(membershipFees);
//# sourceMappingURL=Exercise.js.map