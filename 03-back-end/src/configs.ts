import IConfig from "./common/IConfig.interface";

const DevConfig: IConfig = {
    server: {
        port: 10000,
        static: {
            index: false,
            dotfiles: "deny",
            cacheControl: true,
            etag: true,
            maxAge: 1000 * 60 * 60 * 24,
            route: "/assets",
            path: "./static",
        }
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "project",
        password: "project",
        database: "piivt_project",
        charset: "utf8",
        timezone: "+01:00",
        supportBigNumbers: false,
    },
    logging: {
        path: "./logs",
        filename: "access.log",
        format: ":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-length] bytes\t:response-time ms",
    },
}

export default DevConfig;