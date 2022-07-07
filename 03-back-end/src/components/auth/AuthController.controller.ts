import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { IUserLoginDto } from "./dto/IUserLogin.dto";
import * as bcrypt from "bcrypt";

export default class AuthController extends BaseController {

    public async userLogin(req: Request, res: Response){
        const data = req.body as IUserLoginDto;

        this.services.user.getByUsername(data.username)
        .then(result => {
            if(result === null){
                throw {
                    statis: 404,
                    message: "User account not found"
                };
            }

            return result;
        })
        .then(user => {
            if(!bcrypt.compareSync(data.password, user.passwordHash)){
                throw {
                    statis: 404,
                    message: "User account not found"
                };
            }

            return user;
        })
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            setTimeout(() => {
                res.status(error?.status ?? 500).send(error?.message);
            }, 1500);
        });
    }
}