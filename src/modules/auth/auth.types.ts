export interface signUpInput {
    name:string,
    email:string,
    password:string,
    role?: "ADMIN" | "EMPLOYER" | "EMPLOYEE";
    otp?:string
}