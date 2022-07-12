import AuthRouter from "./components/auth/AuthRouter.router";
import CalculationRouter from "./components/calculation/CalculationRouter.router";
import CategoryRouter from "./components/category/CategoryRouter.router";
import EmployeeRouter from "./components/employee/EmployeeRouter.router";
import SalaryRouter from "./components/salary/SalaryRouter.router";
import UserRouter from "./components/user/UserRouter.router";

const routers = [
    new CategoryRouter(),
    new UserRouter(),
    new AuthRouter(),
    new SalaryRouter(),
    new CalculationRouter(),
    new EmployeeRouter(),
];

export default routers;