export interface IOrganization {
  id?: number;
  name: string;
  ownerId: number;  // User id
  memberIds?: number[];
}
