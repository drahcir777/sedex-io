import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/authenticateClient/useCases/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/useCases/AuthenticateDeliverymanController";
import { FindAllDeliveriesController } from "./modules/clients/deliveries/FindAllDeliveriesController";
import { CreateClientController } from "./modules/clients/useCases/CreateClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/CreateDelivery/CreateDeliveryController";
import { UpdatedeDeliverymenController } from "./modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController";
import { UpdatedeEndDateController } from "./modules/deliveries/useCases/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";
import { FindAllWithoutEndDateController } from "./modules/deliveryman/useCases/findAllWithoutEndDate/FindAllWithoutEndDateController";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliveryman = new CreateDeliverymanController()
const authenticateDeliveryman = new AuthenticateDeliverymanController()
const createDelivery = new CreateDeliveryController()
const findAllWithoutEndDateController = new FindAllWithoutEndDateController()
const updateDeliverymanController = new UpdatedeDeliverymenController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()
const updateEndDateController = new UpdatedeEndDateController()

routes.post("/client/", createClientController.handle)
routes.post("/auth/", authenticateClientController.handle)
routes.post("/deliveryman/", createDeliveryman.handle)
routes.post("/auth/deliveryman/", authenticateDeliveryman.handle)
routes.post("/delivery/", ensureAuthenticateClient, createDelivery.handle)
routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllWithoutEndDateController.handle)
routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)
routes.get("/client/deliveries", ensureAuthenticateClient, findAllDeliveriesController.handle)

routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)

routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes }