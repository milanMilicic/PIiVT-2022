import AuthRouter from "./components/auth/AuthRouter.router";
import CategoryRouter from "./components/category/CategoryRouter.router";
import UserRouter from "./components/user/UserRouter.router";

const routers = [
    new CategoryRouter(),
    new UserRouter(),
    new AuthRouter(),
];

export default routers;