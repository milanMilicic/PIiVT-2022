import "./UserAddSalary.sass"
import { useState, useEffect } from 'react';
import { api } from '../../../api/api';



export default function UserAddCalculation(){
    let currentMonth = new Date().getMonth() + 1;
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const [ year, setYear ] = useState<number>(2022);
    const [ monthId, setMonth ] = useState<number>(currentMonth);




    function add() {
        api("post", '/api/calculation', "user", {year, monthId})
        .then(apiResponse => {
            if (apiResponse.status === 'error') {
                return setErrorMessage(apiResponse.data);
            }

            setMessage("Calculation successfully added");
            setTimeout(() => {
                setMessage("");
            }, 2000);

        })
    }



    return (
        <>
            <h1 className="h3 mb-3">Add new Calculation</h1>

            <div className="input-group input-group-md mb-3">
                <label className="input-group-text" htmlFor="input-group-1">Year</label>
                <select className="form-select" id="input-group-1" onChange={(e) => setYear(+e.target.value)}>
                    <option value="2022" selected>2022</option>
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

            <div className="text-center">
                <button className="btn btn-primary text-center" onClick={() => add()}>
                    Add calculation
                </button>
            </div>
            { errorMessage && <p className="alert alert-danger mt-3">Error: {errorMessage}</p> }
            { message && <p className="alert alert-success mt-3">{message}</p> }
        </>
    );
}