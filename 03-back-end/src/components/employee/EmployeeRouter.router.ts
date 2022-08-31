import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import EmployeeController from './EmployeeController.controller';

export default class EmployeeRouter implements IRouter {
    
    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const employeeController: EmployeeController = new EmployeeController(resources.services);

        application.get('/api/employee', employeeController.getAll.bind(employeeController));
        application.get('/api/employee/:eid', employeeController.getSingleEmployee.bind(employeeController));
    }

}