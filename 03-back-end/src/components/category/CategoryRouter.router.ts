import CategoryController from "./CategoryController.controller";
import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";

export default class CategoryRouter implements IRouter {
    
    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const categoryController: CategoryController = new CategoryController(resources.services);

        application.get('/api/category', categoryController.getAll.bind(categoryController));
        application.get('/api/category/:cid', categoryController.getById.bind(categoryController));
        application.put('/api/category/:cid', categoryController.editCategory.bind(categoryController));
        application.post('/api/category', categoryController.addCategory.bind(categoryController));
        application.post('/api/category/:cid/employee', categoryController.addEmployee.bind(categoryController));
        application.put('/api/category/:cid/employee/:eid', categoryController.editEmployee.bind(categoryController));
    }

}