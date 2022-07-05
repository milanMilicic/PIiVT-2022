import { Request, Response } from "express";
import CategoryService from './CategoryService.service';

export default class CategoryController {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService){
        this.categoryService = categoryService;
    }

    async getAll(req: Request, res: Response){
        this.categoryService.getAll()
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message)
        })
    }

    async getById(req: Request, res: Response){
        const id: number = +req.params?.cid;

        this.categoryService.getById(id)
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
}