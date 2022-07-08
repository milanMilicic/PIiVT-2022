import { Request, Response } from "express";
import BaseController from "../../common/BaseController";

export default class CalculationController extends BaseController {

    async getAll(req: Request, res: Response){
        this.services.calculation.getAll({})
        .then(result => {
            if(result.length === 0){
                return res.status(404).send("There are no calculations");
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async getByYear(req: Request, res: Response){
        const year: number = +req.params.yid;

        this.services.calculation.getByYearNumber(year)
        .then(result => {
            if(result.length === 0){
                return res.status(404).send(`Calculation for year ${year} not found`);
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }
    
}