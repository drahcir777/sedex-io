import { NextFunction, Request, Response } from "express";
import { FindAllDeliveriesUseCase } from "./FindAllDeliveriesUseCase";


export class FindAllDeliveriesController {

    async handle(req: Request, res: Response, next: NextFunction) {
        const { id_client } = req

        const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase()

        const deliveries = await findAllDeliveriesUseCase.execute(id_client)

        return res.json(deliveries)
    }
}

