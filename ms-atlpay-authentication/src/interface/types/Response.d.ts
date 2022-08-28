import {JWT} from './jwt';

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

export interface LoginSuccesResponse {
    message: string,
    jwt : JWT
}
