export interface Payload {
    user_id : string,
    user_email: string,
    // user_access_role : number
}

export interface JWT {
    access_token: string,
    token_type: string,
    expire_in: string
}
