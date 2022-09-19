import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api';
import IEmployee from '../../../models/IEmployee.model';
export default function UserEmployeeList(){

    const [ employee, setEmployee ] = useState<IEmployee[]>();
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    interface EmployeeListRowProperties {
        employee: IEmployee
    }

    function loadEmployees(){
        api("get", "/api/employee", "user")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                throw{
                    message: 'Unknown error while loading employees',
                }
            }

            setEmployee(apiResponse.data);
        })
        .catch(error => {
            setErrorMessage(error.message ?? 'Unknown error while loading categories');
        });
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    function EmployeeListRow(props: EmployeeListRowProperties) {
        
        return (
            <tr>
                <td>{props.employee.employeeId}</td>
                <td>{props.employee.name}</td>
                <td>{props.employee.jmbg}</td>
                <td>{props.employee.employment}</td>
                <td>{props.employee.isActive ? 'Active' : 'Not active'}</td>
                <td>
                    <Link className="btn btn-primary btn-sm me-3" to={"/user/dashboard/category/" + props.employee.categoryId + "/employee/" + props.employee.employeeId} state={{employee: props.employee}}>Edit employee</Link>
                    <Link className="btn btn-primary btn-sm" to={"/user/dashboard/employee/" + props.employee.employeeId + "/salary"}>View salaries</Link>
                </td>
            </tr>
        );
    }

    return (
        <div>
            { errorMessage && <p>Error: {errorMessage}</p> }
            {!errorMessage && (
                <>
                    <Link className="btn btn-primary btn-sm mb-2" to={"/user/dashboard/add-new-employee-button"}>Add new employee</Link>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>JMBG</th>
                                <th>Employment(%)</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee?.map(employee => <EmployeeListRow key={'employee-row' + employee.employeeId} employee={employee}/>)}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}