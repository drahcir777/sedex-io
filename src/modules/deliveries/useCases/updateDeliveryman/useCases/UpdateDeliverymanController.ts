import { NextFunction, Request, response, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";


export class UpdatedeDeliverymenController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id_deliveryman } = req
        const { id: id_delivery } = req.params

        const updateDeliverymanUseCase = new UpdateDeliverymanUseCase()

        const delivery = await updateDeliverymanUseCase.execute({
            id_deliveryman,
            id_delivery
        })

        return res.json(delivery)
    }
}