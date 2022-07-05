import CategoryController from "./CategoryController.controller";
import CategoryService from "./CategoryService.service";
import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";

export default class CategoryRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const categoryService: CategoryService = new CategoryService(resources.databaseConnection);
        const categoryController: CategoryController = new CategoryController(categoryService);

        application.get('/api/categories', categoryController.getAll.bind(categoryController));
        application.get('/api/categories/:cid', categoryController.getById.bind(categoryController));
    }

}