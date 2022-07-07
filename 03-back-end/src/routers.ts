import AuthRouter from "./components/auth/AuthRouter.router";
import CategoryRouter from "./components/category/CategoryRouter.router";
import SalaryRouter from "./components/salary/SalaryRouter.router";
import UserRouter from "./components/user/UserRouter.router";

const routers = [
    new CategoryRouter(),
    new UserRouter(),
    new AuthRouter(),
    new SalaryRouter(),
];

export default routers;