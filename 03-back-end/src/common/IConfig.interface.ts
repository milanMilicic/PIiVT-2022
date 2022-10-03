import { Algorithm } from "jsonwebtoken";

export interface ITokenProperties {
    duration: number,
    keys: {
        public: string,
        private: string,
    },
}

export interface IAuthTokenOptions {
    issuer: string,
    algorithm: Algorithm,
    tokens: {
        auth: ITokenProperties,
        refresh: ITokenProperties,
    }
} 

export default interface IConfig {
    server: {
        port: number;
        static: {
            index: string|false;
            dotfiles: "allow" | "deny";
            cacheControl: boolean;
            etag: boolean;
            maxAge: number;
            route: string;
            path: string;
        }
    },
    database:{
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
        charset: 'utf8' | 'utf8mb4' | 'ascii',
        timezone: string,
        supportBigNumbers: false,
    },
    logging: {
        path: string,
        filename: string,
        format: string,
    },
    auth: {
        user: IAuthTokenOptions,
        allowAllRoutesWithoutAuthTokens: boolean,
    }

}