import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { api } from '../../../api/api';
import './UserEdit.sass';


export interface IUserUrlParams extends Record<string, string | undefined> {
    uid: string,
}


export default function UserEdit(){
    const [ password, setPassword ] = useState<string>("");
    const [ passwordAgain, setPasswordAgain ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");

    const params = useParams<IUserUrlParams>();
    const location = useLocation();
    const [ stateLocation, setStateLocation ] = useState<any>(location.state);
    const [ employee, setEmployee ] = useState({name: stateLocation.employee.name, employment: stateLocation.employee.employment});


    const doEdit = () => {

        let paragraf = document.getElementById('message');

        if(password !== passwordAgain){
            paragraf?.classList.add('alert');
            paragraf?.classList.add('alert-danger');
            setMessage('Passwords do not match!');
            return setTimeout(() => {
                paragraf?.classList.remove('alert');
                paragraf?.classList.remove('alert-danger');
                setMessage("");
            }, 3000);   
        }

        api('put', '/api/user/' + params.uid, 'user', {password: password})
        .then(apiResponse => {
            if(apiResponse.status === 'error'){
                return setMessage(apiResponse.data + "");
            }

            paragraf?.classList.add('alert');
            paragraf?.classList.add('alert-success');
            setPassword("");
            setPasswordAgain("");
            setMessage("Password successfully changed");
            setTimeout(() => {
                setMessage("");
                paragraf?.classList.remove('alert');
                paragraf?.classList.remove('alert-success');
            }, 2000)
            
        })
    }




    return(
        <div className="row">
            <div className="col col-xs-12 col-md-6 offset-md-3 mt-3">
                <h1 className="h3">Password changing</h1>
                <div className="form-group mb-2">
                    <div id="password-info">Password must be at least 6 characters, contain at least one upper case letter and a number</div>
                    <div className="input-group">
                        <input className="form-control" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" placeholder="Enter new password again" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)}/>
                    </div>
                </div>
                {(password !== passwordAgain) && (passwordAgain !== "") && (password !== "") && <p className="alert alert-warning mb-3">Passwords do not match!</p>}
                <div className="form-group text-center">
                    <button className="btn btn-primary px-5 mb-3" onClick={() => doEdit()}>
                        Change password
                    </button>
                </div>
                <div>
                    <p id="message">{message}</p>
                </div>    
            </div>
        </div>
    );
}