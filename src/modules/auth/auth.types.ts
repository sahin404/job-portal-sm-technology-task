// sign up related type
export interface signUpInput {
    name:string,
    email:string,
    password:string,
    role: "ADMIN" | "EMPLOYER" | "EMPLOYEE",
    otp?:string
}

export interface pendingSignUpUser{
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


//sign in related Type
export interface signInInput {
    email:string,
    password:string,
}

export interface pendingSigninUser{
    email:string,
    password:string,
    otp:string
}

export interface signInVerify{
    email:string,
    otp:string
}