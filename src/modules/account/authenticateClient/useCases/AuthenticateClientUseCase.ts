import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { prisma } from "../../../../database/prismaClient"

interface IAuthenticate {
    username: string
    password: string
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticate) {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username or password invalid!")
        }

        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch) {
            throw new Error("Username or password invalid!")
        }

        const token = sign({ username }, "db4008358d87217d5502d5e985d271c2", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}