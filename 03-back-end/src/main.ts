import * as express from "express";
import * as cors from "cors";
import IConfig from "./common/IConfig.interface";
import DevConfig from "./configs";
import CategoryController from "./components/category/CategoryController.controller";
import CategoryService from "./components/category/CategoryService.service";
import * as fs from "fs";
import * as morgan from "morgan";


const config: IConfig = DevConfig;

fs.mkdirSync("./logs", {
    mode: 0o755,
    recursive: true,
});

const application: express.Application = express();

application.use(morgan(":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-length] bytes\t:response-time ms", {
    stream: fs.createWriteStream("./logs/access.log")
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


const categoryService: CategoryService = new CategoryService();
const categoryController: CategoryController = new CategoryController(categoryService);

application.get('/api/categories', categoryController.getAll.bind(categoryController));
application.get('/api/categories/:cid', categoryController.getById.bind(categoryController));

application.use( (req, res) => {
    res.sendStatus(404);
});

application.listen(config.server.port);

