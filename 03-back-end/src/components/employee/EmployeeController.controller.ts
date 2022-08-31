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


    async getSingleEmployee(req: Request, res: Response){
        const id: number = +req.params?.eid;

        this.services.employee.getById(id, {})
        .then(result => {
            if(result === null){
                res.status(404).send('Employee not found');
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

}