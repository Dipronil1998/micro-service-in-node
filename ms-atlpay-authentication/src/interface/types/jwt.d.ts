export interface Payload {
    user_id : string,
    user_access_role_id:number,
    user_email: string,
}

export interface JWT {
    access_token: string,
    token_type: string,
    expire_in: string
}
