export type Role = "ADMIN" | "EMPLOYER" | "EMPLOYEE";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: Role;
  location?: string;
}
