export interface IJob {
  id?: number;
  title: string;
  location: "onsite" | "remote";
  description: string;
  employerId: number;
  createdAt?: Date;
}
