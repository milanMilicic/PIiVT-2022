import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import ISalary from "../../../models/ISalary.model";
import { api } from "../../../api/api";

export interface IUserEmployeeSalaryListUrlParams extends Record<string, string | undefined> {
    eid: string
}

export default function UserSalaryEmployee(){
    const params = useParams<IUserEmployeeSalaryListUrlParams>();
    const [ salaryData, setSalaryData ] = useState<ISalary[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    interface EmployeeSalaryProps {
        salary: ISalary
    }

    function loadSalaryData(employeeId: number){
        if(!employeeId){
            return;
        }

        api("get", "/api/employee/" + employeeId + "/salary", "user")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                return setErrorMessage(apiResponse.data + "");
            }

            setSalaryData(apiResponse.data);
        });
    }

    useEffect(() => {
        loadSalaryData(+(params.eid ?? 0))
    }, []);


    function EmployeeSalaryList(props: EmployeeSalaryProps){
        return (
            <tr>
                <td>{props.salary.salaryId}</td>
                <td>{props.salary.year}</td>
                <td>{props.salary.monthId}</td>
                <td>{props.salary.workHours}</td>
                <td>{props.salary.healthCare}</td>
                <td>{props.salary.socialCare}</td>
                <td>{props.salary.pio}</td>
                <td>{props.salary.tax}</td>
                <td>{props.salary.grossWorth}</td>
                <td>{props.salary.netWorth}</td>
            </tr>
        );
    }

    return (
        <div>
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {salaryData && (
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Work hours</th>
                            <th>Health care</th>
                            <th>Social care</th>
                            <th>PIO</th>
                            <th>Tax</th>
                            <th>Gross worth</th>
                            <th>Net worth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salaryData.map(salary => <EmployeeSalaryList key={'employee-salary-row' + salary.employeeId + "-" + salary.salaryId } salary={salary}/>)}
                    </tbody>
            </table>
            )}
        </div>
    );
}