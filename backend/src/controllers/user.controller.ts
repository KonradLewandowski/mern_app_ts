import {RequestHandler} from "express";
import createHttpError from "http-errors";

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown>= async (req, res, next) =>{
    const {username, email} =  req.body;
    const passwordRaw =  req.body.password;

    try{
        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters missing")
        }
    }catch (error) {
        next(error)
    }
}
