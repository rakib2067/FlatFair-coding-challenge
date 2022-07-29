import { calculateMembershipFee } from "../src/Exercise";
import { OrganisationStructure } from "../src/models/OrganisationStructure";
import { arr } from "./testArr";
import { OrganisationUnitNode } from "../src/models/OrganisationUnit";

describe("Caculate Membership Fee for default cases", () => {
  let testBranch: OrganisationUnitNode = {
    name: "client-X",
    config: null,
    parent: undefined,
    children: [],
  };
  test("It returns the default for rent amounts under 120 but within the threshold", () => {
    expect(calculateMembershipFee(25, "week", testBranch)).toEqual(14400);
  });
  test("It returns the correct fee for weekly rentAmount within the threshold", () => {
    expect(calculateMembershipFee(200, "week", testBranch)).toEqual(24000);
  });
  test("It returns an Error for values below the threshold - weekly", () => {
    expect(calculateMembershipFee(24, "week", testBranch)).toBeInstanceOf(
      Error
    );
  });
  test("It returns an Error for values above the threshold - weekly", () => {
    expect(calculateMembershipFee(2001, "week", testBranch)).toBeInstanceOf(
      Error
    );
  });
  test("It returns an Error for values below the threshold - monthly", () => {
    expect(calculateMembershipFee(109, "month", testBranch)).toBeInstanceOf(
      Error
    );
  });
  test("It returns an Error for values above the threshold - monthly", () => {
    expect(calculateMembershipFee(8661, "month", testBranch)).toBeInstanceOf(
      Error
    );
  });
});

describe("Caculate Membership Fee for branches", () => {
  let organisationStructure = new OrganisationStructure();
  organisationStructure.insertAll(arr);
  let area_b = organisationStructure.getByArea("area_b"); //No fixed fee parent
  let area_c = organisationStructure.getByArea("area_c"); //Third index is branch k
  let area_d = organisationStructure.getByArea("area_d"); //Parent division has a fixed fee

  test("It overwrites when branch has a fixed fee", () => {
    expect(calculateMembershipFee(200, "month", area_c[2])).toEqual(2500000);
  });
  test("It recursively checks parents if branch has no fixed fee and overwrites if fixed fee is found", () => {
    expect(calculateMembershipFee(200, "week", area_d[0])).toEqual(3500000);
  });
  test("It uses default rent amount if no fixed fee is found", () => {
    expect(calculateMembershipFee(25, "week", area_b[0])).toEqual(14400);
  });
});
