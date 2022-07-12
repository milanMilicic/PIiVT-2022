import { Request, Response } from "express";
import BaseController from "../../common/BaseController";

export default class EmployeeController extends BaseController{
    async getAll(req: Request, res: Response){
        this.services.employee.getAll({})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        })
    }

}