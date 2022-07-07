import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { AddUserValidator, IAddUserDto } from "./dto/IAddUser.dto";
import { DefaultUserAdapterOptions } from "./UserService.service";
import * as bcrypt from "bcrypt";
import { EditUserValidator, IEditUserDto } from "./dto/IEditUser.dto";
import IEditUser from './dto/IEditUser.dto';

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

    async add(req: Request, res: Response){
        const data = req.body as IAddUserDto;

        if(!AddUserValidator(data)){
            return res.status(400).send(AddUserValidator.errors);
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(data.password, salt);

        this.services.user.addUser({
            username: data.username,
            password_hash: passwordHash,
        })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }


    async edit(req: Request, res: Response){
        const userId: number = +req.params.uid;
        const data = req.body as IEditUserDto;

        if(!EditUserValidator(data)){
            return res.status(400).send(EditUserValidator.errors);
        }

        const serviceData: IEditUser = {};

        if(data.username !== undefined){
            serviceData.username = data.username;
        }

        if(data.password !== undefined){
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(data.password, salt);
            serviceData.password_hash = passwordHash;
        }
        this.services.user.editUser(userId, serviceData)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

}