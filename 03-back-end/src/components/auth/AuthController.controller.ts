import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import { IUserLoginDto } from "./dto/IUserLogin.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ITokenData from './dto/ITokenData';
import DevConfig from '../../configs';

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


    userRefresh(req: Request, res: Response){  //ovde radimo sa refresh tokenom da dobijemo novi autenti. token, posaljemo nas trnutni refresh token jer on traje duze i imamo ga, da bismo dobili novi autentifikacioni token 
        const refreshTokenHeader: string = req.headers.authorization ?? ""; //"Bearer TOKEN"

        if(refreshTokenHeader === ""){
            return res.status(400).send("No token specified");
        }

        const [ tokenType, token ] = refreshTokenHeader.trim().split(" ");

        if(tokenType !== "Bearer"){
            return res.status(400).send("Invalid token type");
        }

        if(typeof token !== "string" || token.length === 0){
            return res.status(400).send("Token not specified");
        }

        try {
            const refreshTokenVerification = jwt.verify(token, DevConfig.auth.user.tokens.refresh.keys.public);

            if(!refreshTokenVerification){
                return res.status(401).send("Invalid token specified");
            }

            const originalTokenData = refreshTokenVerification as ITokenData;

            const tokenData: ITokenData = {
                role: originalTokenData.role,
                id: originalTokenData.id,
                identity: originalTokenData.identity,
            };

            if(tokenData.role !== "user"){
                return res.status(401).send("Invalid token role");
            }

            const authToken = jwt.sign(tokenData, DevConfig.auth.user.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.user.algorithm,
                issuer: DevConfig.auth.user.issuer,
                expiresIn: DevConfig.auth.user.tokens.auth.duration,
            });

            res.send({
                authToken: authToken,
            });
        } catch (error) {
            res.status(500).send(error?.message);
        }

    }



}