export interface IJob {
  id?: number;
  title: string;
  location: "ONSITE" | "REMOTE";
  description: string;
  employerId: number;
  createdAt?: Date;
}
