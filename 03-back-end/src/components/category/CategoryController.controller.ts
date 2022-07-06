import { Request, Response } from "express";
import CategoryService, { DefaultCategoryAdapterOptions } from './CategoryService.service';
import IAddCategory, { AddCategoryValidator } from "./dto/IAddCategory.dto";

export default class CategoryController {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService){
        this.categoryService = categoryService;
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
}