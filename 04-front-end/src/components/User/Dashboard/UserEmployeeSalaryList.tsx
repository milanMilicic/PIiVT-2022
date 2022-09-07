import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import ISalary from '../../../models/ISalary.model';
export default function UserEmployeeSalaryList(){

    const [ salaryList, setSalaryList ] = useState<ISalary[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");


    interface SalaryListProps {
        salary: ISalary
    }

    function loadSalaryList(){
        api("get", "/api/salary", "user")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                return setErrorMessage(apiResponse.data + "");
            }

            setSalaryList(apiResponse.data);
        });
    }



    useEffect(() => {
        loadSalaryList();
    }, []);

    function SalaryList(props: SalaryListProps){
        return (
            <tr>
                <td>{props.salary.salaryId}</td>
                <td>{props.salary.employeeId}</td>
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
            {salaryList && (
                <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Salary no.</th>
                        <th>Employee ID</th>
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
                    {salaryList.map(salary => <SalaryList key={'salary-row' + salary.salaryId } salary={salary}/>)}
                </tbody>
            </table>
            )}
        </div>
    );
}