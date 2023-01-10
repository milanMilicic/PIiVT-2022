import "./UserAddSalary.sass"
import { useState, useEffect } from 'react';
import IEmployee from "../../../models/IEmployee.model";
import { api } from '../../../api/api';



export default function UserAddSalary(){
    let currentMonth = new Date().getMonth() + 1;
    const [ employees, setEmployees ] = useState<IEmployee[]>([]);
    const [ employee, setEmployee ] = useState<string>();
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const [ workHours, setWorkHours ] = useState<number>(0);
    const [ year, setYear ] = useState<number>(2022);
    const [ month, setMonth ] = useState<number>(currentMonth);
    
    let currentYear = new Date().getFullYear();


    interface EmployeeListSelectProps {
        employee: IEmployee
    }

    useEffect(() => {
        api("get", "/api/employee", "user")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                setErrorMessage("Unknown problem occured")
            }

            setEmployees(apiResponse.data)
        })
    }, []);


    const add = () => {
        api("post", `/api/salary/year/${year}/month/${month}/employee/${employee}`, "user", {workHours: workHours})
        .then(apiResponse => {
            if (apiResponse.status === 'error') {
                return setErrorMessage(apiResponse.data);
            }

            setMessage("Salary successfully added");
            setTimeout(() => {
                setMessage("");
            }, 2000);

        })
    }


    function EmployeeListSelect(props: EmployeeListSelectProps){
        return (
            <option value={props.employee.employeeId}>{props.employee.name}</option>
        );
    }


    return (
        <>
            <h1 className="h3 mb-3">Add new salary for an employee</h1>

            <div className="input-group input-group-md mb-3">
                <label className="input-group-text">Employee</label>
                <select value={employee} className="form-select" onChange={(e) => setEmployee(e.target.value)}>
                    <option disabled selected>Choose...</option>
                    {employees.map(employee => <EmployeeListSelect key={'employee-select-row' + employee.employeeId} employee={employee}/>)}
                </select>
            </div>

            <div className="input-group input-group-md mb-3">
                <label className="input-group-text" htmlFor="input-group-1">Year</label>
                <select className="form-select" id="input-group-1" onChange={(e) => setYear(+e.target.value)}>
                    <option value="2022" selected>{currentYear}</option>
                </select>
            </div>
            <div className="input-group input-group-md mb-3">
                <label className="input-group-text" htmlFor="input-group-2">Month</label>
                <select className="form-select" id="input-group-2" onChange={(e) => setMonth(+e.target.value)}>
                    <option selected>Choose...</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>

            <div className="input-group input-group-md mb-3">
                <label>Work hours</label>
                <div className="input-group">
                    <input className="form-control" type="number" placeholder="Work hours" value={workHours} onChange={e => setWorkHours(+e.target.value)} />
                </div>
            </div>
            <div className="text-center">{(workHours < 8 || workHours > 160) ? <p className="alert alert-info">Work hours must be between 8 and 160</p> : <button className="btn btn-primary text-center" onClick={() => add()}>Add salary</button>}</div>
            { errorMessage && <p className="alert alert-danger mt-3">Error: {errorMessage}</p> }
            { message && <p className="alert alert-success mt-3">{message}</p> }
        </>
    );
}