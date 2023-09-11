export interface User{
    id?:string;
    username?:string;
    email?:string;
    password?:string;
    roles:Set<Role>;
}

export interface Role{
    id?:string;
    roleName?:string;
}

export interface LoginRequest{
    username?:string;
    password?:string;
}