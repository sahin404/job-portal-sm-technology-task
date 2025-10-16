export interface signUpInput {
    name:string,
    email:string,
    password:string,
    role: "ADMIN" | "EMPLOYER" | "EMPLOYEE",
    otp?:string
}

export interface pendingUser{
    name:string,
    email:string,
    password:string,
    role: "ADMIN" | "EMPLOYER" | "EMPLOYEE",
    otp:string
}

export interface signUpVerify {
    email:string,
    otp:string,
}