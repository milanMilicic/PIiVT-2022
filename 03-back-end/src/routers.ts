import CategoryRouter from "./components/category/CategoryRouter.router";
import UserRouter from "./components/user/UserRouter.router";

const routers = [
    new CategoryRouter(),
    new UserRouter(),
];

export default routers;