import { NextFunction, Request, response, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";



export class UpdatedeEndDateController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const { id_deliveryman } = req
        const { id: id_delivery } = req.params

        const updateEndDateUseCase = new UpdateEndDateUseCase()

        const delivery = await updateEndDateUseCase.execute({
            id_deliveryman,
            id_delivery
        })

        return res.json(delivery)
    }
}