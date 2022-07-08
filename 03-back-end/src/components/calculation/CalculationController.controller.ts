import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import SalaryModel from "../salary/SalaryModel.model";
import IAddCalculationDto, { IAddCalculation } from "./dto/IAddCalculation.dto";

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

        this.services.calculation.getAllByYearNumber(year)
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

    async getByMonth(req: Request, res: Response){
        const monthId: number = +req.params.mid;

        this.services.calculation.getAllByMonthId(monthId)
        .then(result => {
            if(result.length === 0){
                return res.status(404).send(`Calculation for month ${monthId} not found`);
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }


    async getByYearAndMonth(req: Request, res: Response){
        const monthId: number = +req.params.mid;
        const year: number = +req.params.yid;

        this.services.calculation.getByYearAndMonth(year, monthId)
        .then(result => {
            if(result.length === 0){
                return res.status(404).send(`Calculation for year ${year} and month ${monthId} not found`)
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }


    async add(req: Request, res: Response){
        const data = req.body as IAddCalculationDto;

        this.services.salary.getAllByFieldNamesAndValues("year", "month_id", data.year, data.monthId, {})
        .then(salaries => {
            if(salaries.length === 0){
                return res.status(404).send("Salaries not found");
            }

            return salaries;
        })
        .then(result => {
            const salaries = result as SalaryModel[];
            let pio = 0;
            let tax = 0;
            let socialCare = 0; 
            let healthCare = 0
            let grossWorth = 0; 
            let netWorth = 0;

            for(let salary of salaries){
                pio = salary.pio + pio;
                tax = salary.tax + tax;
                socialCare = salary.socialCare + socialCare;
                healthCare = salary.healthCare + healthCare;
                grossWorth = salary.grossWorth + grossWorth;
                netWorth = salary.netWorth + netWorth;
            }

            return {
                pio,
                tax,
                socialCare,
                healthCare,
                grossWorth,
                netWorth,
            }
 
        })
        .then(async result => {
            const serviceData: IAddCalculation = {year: data.year, month_id: data.monthId, gross_worth: result.grossWorth, net_worth: result.netWorth, health_care: result.healthCare, social_care: result.socialCare, pio: result.pio, tax: result.tax};

            res.send(await this.services.calculation.addCalculation(serviceData));
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

}