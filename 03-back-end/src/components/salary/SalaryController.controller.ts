import { Request, Response } from "express";
import BaseController from "../../common/BaseController";

export default class SalaryController extends BaseController{

    async getAll(req: Request, res: Response){
        this.services.salary.getAll({})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async getById(req: Request, res: Response){
        const monthId: number = +req.params.mid;

        this.services.salary.getByMonthId(monthId)
        .then(result => {
            if(result.length === 0){
                return res.status(404).send("No salaries for specified month");
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }
}