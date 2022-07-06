import UserController from "./UserController.controller";
import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";

export default class UserRouter implements IRouter {
    
    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const userController: UserController = new UserController(resources.services);

        application.get('/api/user', userController.getAll.bind(userController));
        application.get('/api/user/:uid', userController.getById.bind(userController));
       
    }

}