import { Request, Response } from "express";
import IAddEmployeeDto from "../employee/dto/IAddEmployee.dto";
import { AddEmployeeValidator } from "../employee/dto/IAddEmployee.dto";
import EmployeeService from "../employee/EmployeeService.service";
import CategoryService, { DefaultCategoryAdapterOptions } from './CategoryService.service';
import IAddCategory, { AddCategoryValidator } from "./dto/IAddCategory.dto";

export default class CategoryController {
    private categoryService: CategoryService;
    private employeeService: EmployeeService;

    constructor(categoryService: CategoryService, employeeService: EmployeeService){
        this.categoryService = categoryService;
        this.employeeService = employeeService;
    }

    async getAll(req: Request, res: Response){
        this.categoryService.getAll(DefaultCategoryAdapterOptions)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message)
        })
    }

    async getById(req: Request, res: Response){
        const id: number = +req.params?.cid;

        this.categoryService.getById(id, DefaultCategoryAdapterOptions)
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

    async add(req: Request, res: Response){
        const data = req.body as IAddCategory;

        if(!AddCategoryValidator(data)){
            return res.status(400).send(AddCategoryValidator.errors)
        }

        this.categoryService.add(data)
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
            return res.status(400).send(AddEmployeeValidator.errors)
        }

        this.categoryService.getById(categoryId, {loadEmployees: false})
        .then(result => {
            if(result === null){
                res.sendStatus(404);
            }

            this.employeeService.add({name: data.name, jmbg: data.jmbg, categoryId: categoryId, employment: data.employment})
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
}