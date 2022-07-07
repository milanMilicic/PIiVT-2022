import * as express from "express";
import * as cors from "cors";
import IConfig from "./common/IConfig.interface";
import DevConfig from "./configs";
import * as fs from "fs";
import * as morgan from "morgan";
import IApplicationResources from "./common/IApplicationResources.interface";
import * as mysql2 from "mysql2/promise";
import routers from "./routers";
import CategoryService from "./components/category/CategoryService.service";
import EmployeeService from "./components/employee/EmployeeService.service";
import UserService from "./components/user/UserService.service";
import SalaryService from "./components/salary/SalaryService.service";


async function main(){
    const config: IConfig = DevConfig;

fs.mkdirSync(config.logging.path, {
    mode: 0o755,
    recursive: true,
});

const db = await mysql2.createConnection({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    charset: config.database.charset,
    timezone: config.database.timezone,
    supportBigNumbers: config.database.supportBigNumbers,
});

const resources: IApplicationResources = {
    databaseConnection: db,
    services: {
        category: null,
        employee: null,
        user: null,
        salary: null,
    },
};

resources.services.category = new CategoryService(db);
resources.services.employee = new EmployeeService(db);
resources.services.user = new UserService(db);
resources.services.salary = new SalaryService(db);

const application: express.Application = express();

application.use(morgan(config.logging.format, {
    stream: fs.createWriteStream(config.logging.path + "/" + config.logging.filename, {flags: 'a'}),
}));

application.use(cors());
application.use(express.json());

application.use(config.server.static.route, express.static(config.server.static.path, {
    index: config.server.static.index,
    dotfiles: config.server.static.dotfiles,
    cacheControl: config.server.static.cacheControl,
    etag: config.server.static.etag,
    maxAge: config.server.static.maxAge,
}));


for(let router of routers){
    router.setupRoutes(application, resources)
}


application.use( (req, res) => {
    res.sendStatus(404);
});

application.listen(config.server.port);

}

process.on('uncaughtException', error => {
    console.log('ERROR:', error);
});

main();

