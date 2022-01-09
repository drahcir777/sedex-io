import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


interface IPayload {
    sub: string
}

export async function ensureAuthenticateClient(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Token missing!"
        })
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub } = verify(token, "db4008358d87217d5502d5e985d271c2") as IPayload

        console.log(sub)

        req.id_client = sub

        return next()
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token!"
        })
    }
}