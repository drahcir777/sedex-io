import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { prisma } from "../../../../database/prismaClient"

interface IAuthenticate {
    username: string
    password: string
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password }: IAuthenticate) {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (!deliveryman) {
            throw new Error("Username or password invalid!")
        }

        const passwordMatch = await compare(password, deliveryman.password)

        if (!passwordMatch) {
            throw new Error("Username or password invalid!")
        }

        const token = sign({ username }, "db4008358d87217d5502d5e985d271c2", {
            subject: deliveryman.id,
            expiresIn: "1d"
        })

        return token
    }
}