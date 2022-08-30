import { Link, useParams } from "react-router-dom";
import ICategory from "../../../models/ICategory.model";
import { useState, useEffect } from 'react';
import { api } from "../../../api/api";
import IEmployee from "../../../models/IEmployee.model";

export interface IUserCategoryEmployeesListUrlParams extends Record<string, string | undefined> {
    cid: string
}

interface IUserEmployeeListRowProperties {
    employee: IEmployee
}

export default function UserCategoryEmployeesList() {
    const params = useParams<IUserCategoryEmployeesListUrlParams>();

    const [ category, setCategory ] = useState<ICategory>();
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    

    useEffect(() => {
        loadCategoryData(+(params.cid ?? 0));
    }, []);


    function loadCategoryData(categoryId: number) {
        if(!categoryId){
            return;
        }

        api("get", "/api/category/" + categoryId, "user")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                return setErrorMessage(apiResponse.data + "");
            }

            setCategory(apiResponse.data);
        });
    }

    function UserEmployeeListRow(props: IUserEmployeeListRowProperties) {


        return (
            <tr>
                <td>{props.employee.employeeId}</td>
                <td>{props.employee.name}</td>
                <td>{props.employee.jmbg}</td>
                <td>{props.employee.employment}</td>
                <td>{props.employee.isActive ? 'Active' : 'Not active'}</td>
                <td>
                    <Link className="btn btn-primary btn-sm me-3" to={"/user/dashboard/category/employee/" + props.employee.employeeId}>Edit employee</Link>
                    <Link className="btn btn-primary btn-sm" to={"/user/dashboard/employee/" + props.employee.employeeId + "/salary"}>View salaries</Link>
                </td>
            </tr>
        )
    }


    function renderEmployeeTable(category: ICategory){
        return(
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>JMBG</th>
                        <th>Employment</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {category.employees?.map(employee => <UserEmployeeListRow employee={employee} key={'employee-row-' + employee.employeeId} /> )}
                </tbody>
            </table>    
        );
    }
    
    return(
        <div>
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {category && renderEmployeeTable(category)}
        </div>
    );
}