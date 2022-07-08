import * as express from 'express';
import IApplicationResources from "../../common/IApplicationResources.interface";
import IRouter from "../../common/IRouter.interface";
import CalculationController from './CalculationController.controller';

export default class CalculationRouter implements IRouter {
    
    public setupRoutes(application: express.Application, resources: IApplicationResources){

        const calculationController: CalculationController = new CalculationController(resources.services);

        application.get('/api/calculation', calculationController.getAll.bind(calculationController));
        application.get('/api/calculation/year/:yid', calculationController.getByYear.bind(calculationController));
        application.get('/api/calculation/month/:mid', calculationController.getByMonth.bind(calculationController));
       
        
    }

}