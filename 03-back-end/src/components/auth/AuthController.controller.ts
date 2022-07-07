import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { IUserLoginDto } from "./dto/IUserLogin.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ITokenData from "./dto/ITokenData";
import DevConfig from "../../configs";

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
            const tokenData: ITokenData = {
                role: "user",
                id: user.userId,
                identity: user.username,
            };

            const authToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.user.algorithm,
                issuer: DevConfig.auth.user.issuer,
                expiresIn: DevConfig.auth.user.tokens.auth.duration,
            });

            const refreshToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.refresh.keys.private, {
                algorithm: DevConfig.auth.user.algorithm,
                issuer: DevConfig.auth.user.issuer,
                expiresIn: DevConfig.auth.user.tokens.refresh.duration,
            });

            res.send({
                authToken,
                refreshToken
            });
        })
        .catch(error => {
            setTimeout(() => {
                res.status(error?.status ?? 500).send(error?.message);
            }, 1500);
        });
    }


    
}