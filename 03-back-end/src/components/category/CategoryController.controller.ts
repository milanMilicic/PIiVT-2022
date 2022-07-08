import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import IAddEmployeeDto, { IAddEmployee } from "../employee/dto/IAddEmployee.dto";
import { AddEmployeeValidator } from "../employee/dto/IAddEmployee.dto";
import IEditEmployee, { EditEmployeeValidator, IEditEmployeeDto } from "../employee/dto/IEditEmployee.dto";
import { DefaultCategoryAdapterOptions } from './CategoryService.service';
import { AddCategoryValidator, IAddCategoryDto } from "./dto/IAddCategory.dto";
import IEditCategory, { EditCategoryValidator, IEditCategoryDto } from "./dto/IEditCategory.dto";

export default class CategoryController extends BaseController {

    async getAll(req: Request, res: Response){
        this.services.category.getAll({loadEmployees: false})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        })
    }

    async getById(req: Request, res: Response){
        const id: number = +req.params?.cid;

        this.services.category.getById(id, DefaultCategoryAdapterOptions)
        .then(result => {
            if(result === null){
                res.status(404).send('Category not found');
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async addCategory(req: Request, res: Response){
        const data = req.body as IAddCategoryDto;

        if(!AddCategoryValidator(data)){
            return res.status(400).send(AddCategoryValidator.errors);
        }

        this.services.category.add({name: data.name, hourly_price: data.hourlyPrice})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(400).send(error?.message);
        });
    }

    async addEmployee(req: Request, res: Response){

        const categoryId: number = +req.params?.cid;
        const data = req.body as IAddEmployeeDto;

        if(!AddEmployeeValidator(data)){
            return res.status(400).send(AddEmployeeValidator.errors);
        }

        this.services.category.getById(categoryId, {loadEmployees: false})
        .then(result => {
            if(result === null){
                res.sendStatus(404);
            }

            const serviceData: IAddEmployee = {name: data.name, jmbg: data.jmbg, employment: data.employment, category_id: categoryId};


            this.services.employee.add(serviceData)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(400).send(error?.message);
            });
            
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async editCategory(req: Request, res: Response){
        const categoryId: number = +req.params?.cid;
        const data = req.body as IEditCategoryDto;

        if(!EditCategoryValidator(data)){
            return res.status(400).send(EditCategoryValidator.errors)
        }

        this.services.category.getById(categoryId, {loadEmployees: false})
        .then(result => {
            if(result === null){
                res.status(404).send('Category not found');
            }

            const serviceData: IEditCategory = {};

            if(data.name !== undefined){
                serviceData.name = data.name;
            }

            if(data.hourlyPrice !== undefined){
                serviceData.hourly_price = data.hourlyPrice;
            }

            this.services.category.editById(categoryId, serviceData)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(400).send(error?.message);
            })
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    async editEmployee(req: Request, res: Response){
        const categoryId: number = +req.params?.cid;
        const employeeId: number = +req.params?.eid;
        const data = req.body as IEditEmployeeDto;

        if(!EditEmployeeValidator(data)){
            return res.status(400).send(EditEmployeeValidator.errors)
        }

        this.services.category.getById(categoryId, {loadEmployees: false})
        .then(result => {
            if(result === null){
                return res.status(404).send('Category not found');
            }

            this.services.employee.getById(employeeId, {})
            .then(result => {
                if(result === null){
                    return res.status(404).send('Employee not found');
                }

                if(result.categoryId !== categoryId){
                    return res.status(400).send('This employee does not belong to this category');
                }

                const serviceData: IEditEmployee = {};

                if(data.name !== undefined){
                    serviceData.name = data.name;
                }

                if(data.employment !== undefined){
                    serviceData.employment = data.employment;
                }

                if(data.isActive !== undefined){
                    serviceData.is_active = data.isActive === true ? 1 : 0;
                }

                this.services.employee.edit(employeeId, serviceData)
                .then(result => {
                    return res.send(result);
                });

            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }
}