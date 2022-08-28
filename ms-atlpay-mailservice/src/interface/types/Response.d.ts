export interface SuccessResponseMessage {
    success : boolean
    info: {
        message : string
    }
}

export interface SuccessResponseData {
    success : boolean
    info : any
}

export interface ErrorResponse {
    success : boolean
    errors : any
}
