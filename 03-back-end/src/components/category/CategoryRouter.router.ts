import CategoryController from "./CategoryController.controller";
import CategoryService from "./CategoryService.service";
import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import EmployeeService from "../employee/EmployeeService.service";

export default class CategoryRouter implements IRouter {
    
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        const categoryService: CategoryService = new CategoryService(resources.databaseConnection);
        const employeeService: EmployeeService = new EmployeeService(resources.databaseConnection);
        const categoryController: CategoryController = new CategoryController(categoryService, employeeService);

        application.get('/api/category', categoryController.getAll.bind(categoryController));
        application.get('/api/category/:cid', categoryController.getById.bind(categoryController));
        application.put('/api/category/:cid', categoryController.editCategory.bind(categoryController));
        application.post('/api/category', categoryController.addCategory.bind(categoryController));
        application.post('/api/category/:cid/employee', categoryController.addEmployee.bind(categoryController));
        application.put('/api/category/:cid/employee/:eid', categoryController.editEmployee.bind(categoryController));
    }

}