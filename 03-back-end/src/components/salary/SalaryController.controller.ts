import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import CategoryModel from "../category/CategoryModel.model";
import IAddSalaryDto, { AddSalaryValidator, IAddSalary } from "./dto/IAddSalary.dto";

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

    async addSalary(req: Request, res: Response){
        const monthId: number = +req.params.mid;
        const employeeId: number = +req.params.eid;
        const data = req.body as IAddSalaryDto;

        if(!AddSalaryValidator(data)){
            return res.status(400).send(AddSalaryValidator.errors);
        }

        this.services.employee.getById(employeeId, {})
        .then(employee => {
            if(employee === null){
               throw {
                    status: 404,
                    message: "Employee not found",
               };
            }

            return employee;
        })
        .then(async employee => {
            const category: CategoryModel|null = await this.services.category.getById(employee.categoryId, {loadEmployees: false});

            if(category === null){
                throw {
                    status: 404,
                    message: "Category not found",
               };
            }

            return {
                employee: employee,
                category: category,
            };
            
        })
        .then(result => {

            const grossWorth = data.workHours * result.category.hourlyPrice * (result.employee.employment / 100);
            const healthCare = grossWorth * (5.15 / 100);
            const socialCare = grossWorth * (0.75 / 100);
            const pio = grossWorth * (14 / 100);
            const tax = (grossWorth - 19300) * (10 / 100);
            const netWorth = grossWorth - tax - socialCare - healthCare - pio; 

            const serviceData: IAddSalary = {
                employee_id: employeeId,
                month_id: monthId,
                work_hours: data.workHours,
                gross_worth: grossWorth,
                health_care: healthCare,
                social_care: socialCare,
                pio: pio,
                tax: tax,
                net_worth: netWorth,
            };

            return serviceData;

        })
        .then(async serviceData => {
            res.send(await this.services.salary.add(serviceData));
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }
}