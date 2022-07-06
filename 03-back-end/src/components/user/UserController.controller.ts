import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { DefaultUserAdapterOptions } from "./UserService.service";

export default class UserController extends BaseController {

    async getAll(req: Request, res: Response){
        this.services.user.getAll(DefaultUserAdapterOptions)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        })

    }

    async getById(req: Request, res: Response){
        const userId: number = +req.params.uid;

        this.services.user.getById(userId, DefaultUserAdapterOptions)
        .then(result => {
            if(result === null){
                return res.status(404).send("User not found");
            }

            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async addUser(req: Request, res: Response){
        
    }
}