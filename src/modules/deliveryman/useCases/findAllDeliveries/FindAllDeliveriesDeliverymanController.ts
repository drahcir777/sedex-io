import { NextFunction, Request, Response } from "express";
import { FindAllDeliveriesDeliverymanUseCase } from "./FindAllDeliveriesDeliverymanUseCase";



export class FindAllDeliveriesDeliverymanController {

    async handle(req: Request, res: Response, next: NextFunction) {
        const { id_deliveryman } = req

        const findAllDeliveriesDeliverymanUseCase = new FindAllDeliveriesDeliverymanUseCase()

        const deliveries = await findAllDeliveriesDeliverymanUseCase.execute(id_deliveryman)

        return res.json(deliveries)
    }
}
