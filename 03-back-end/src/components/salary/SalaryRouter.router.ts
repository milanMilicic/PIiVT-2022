import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import SalaryController from './SalaryController.controller';

export default class SalaryRouter implements IRouter {
    
    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const salaryController: SalaryController = new SalaryController(resources.services);

        application.get('/api/salary', salaryController.getAll.bind(salaryController));
        application.get('/api/salary/month/:mid', salaryController.getById.bind(salaryController));
        application.post('/api/salary/year/:yid/month/:mid/employee/:eid', salaryController.addSalary.bind(salaryController));
        
    }

}