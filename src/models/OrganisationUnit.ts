export interface OrganisationUnit {
    name: string;
    config: OrganisationUnitConfig | null;
    parent?: OrganisationUnit;
    children: OrganisationUnit[];
  }
  
interface OrganisationUnitConfig {
    hasFixedMembershipFee: boolean;
    fixedMembershipFeeAmount: number;
  }