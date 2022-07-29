export interface OrganisationUnit {
  name: string;
  config: OrganisationUnitConfig | null;
}

export class OrganisationUnitNode implements OrganisationUnit {
  children: OrganisationUnitNode[];
  name: string;
  config: OrganisationUnitConfig | null;
  parent: OrganisationUnitNode | undefined;
  constructor(
    { name, config }: OrganisationUnit,
    parent?: OrganisationUnitNode
  ) {
    this.name = name;
    this.config = config;
    this.children = [];
    this.parent = parent || undefined;
  }
}

export interface OrganisationUnitConfig {
  hasFixedMembershipFee: boolean;
  fixedMembershipFeeAmount: number;
}
