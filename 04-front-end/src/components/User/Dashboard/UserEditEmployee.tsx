import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { api } from '../../../api/api';

export interface IUserEmployeeUrlParams extends Record<string, string | undefined> {
    cid: string,
    eid: string
}

export default function UserEditEmployee(){

    const params = useParams<IUserEmployeeUrlParams>();
    const [ message, setMessage ] = useState<string>("");
    const location = useLocation();
    const [ stateLocation, setStateLocation ] = useState<any>(location.state);
    const [ employee, setEmployee ] = useState({name: stateLocation.employee.name, employment: stateLocation.employee.employment});


    const doEdit = () => {

        api('put', '/api/category/' + params.cid + '/employee/' + params.eid, 'user', {name: employee.name, employment: +(employee.employment)})
        .then(apiResponse => {
            if(apiResponse.status === 'error'){
                return setMessage(apiResponse.data + "");
            }

            setMessage("Employee successfully changed");
            setTimeout(() => {
                setMessage("");
            }, 2000)
            
        })
    }


    return(
        <div className="row">
            <div className="col col-xs-12 col-md-6 offset-md-3 mt-3">
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <div className="input-group">
                        <input id="name" className="form-control" type="text" value={employee.name} onChange={(e) => setEmployee({name: e.target.value, employment: employee.employment})}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="employment">Employment(%)</label>
                    <div className="input-group">
                        <input id="employment" max={100} className="form-control" type="number" value={employee.employment} onChange={(e) => setEmployee({name: employee.name, employment: e.target.value})}/>
                    </div>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="status" id="active" value="active" />
                    <label className="form-check-label">
                        Active
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="status" id="inactive" value="inactive" />
                    <label className="form-check-label">
                        Inactive
                    </label>
                </div>
                <div className="form-group text-center">
                    <button className="btn btn-primary px-5" onClick={() => doEdit()}>
                        Save changes
                    </button>
                    {message && <p className="alert alert-success mt-3">{message}</p>}
                </div>
                </div>
        </div>
    );
}