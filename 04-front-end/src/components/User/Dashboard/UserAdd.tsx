import { useState } from "react";
import { api } from "../../../api/api";
import './UserAdd.sass';

export default function UserAdd(){

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordAgain, setPasswordAgain] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const addNewUser = () => {
        var re = new RegExp("^[a-z0-9\-]{5,32}$");
        let paragraf = document.getElementById('message');

        if(!re.test(username)){
            paragraf?.classList.add('alert');
            paragraf?.classList.add('alert-danger');
            setMessage('Data provided is not correct!');
            return setTimeout(() => {
                paragraf?.classList.remove('alert');
                paragraf?.classList.remove('alert-danger');
                setMessage("");
            }, 3000);   
        }

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


        api("post", "/api/user", "user", {username, password})
        .then(apiResponse => {
            if(apiResponse.status === "error"){
               return setMessage(apiResponse.data);
            }
            paragraf?.classList.add('alert');
            paragraf?.classList.add('alert-success');
            setMessage("User successfully added");
            setTimeout(() => {
                paragraf?.classList.remove('alert');
                paragraf?.classList.remove('alert-success');
                setMessage("");
                setUsername("");
                setPassword("");
                setPasswordAgain("");
            }, 2000);
        });
    }
    

    return (
        <div className="row">
            <div className="col col-xs-12 col-md-6 offset-md-3 mt-3">
                <h1 className="h3 mb-3">Add new user</h1>
                <div className="form-group mb-1">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div id="username" className="paragraphs">Username must be between 5 and 32 characters and can have lower case letters, <br /> numbers and character '-'</div>
                </div>
                <div className="form-group mb-1">
                    <div className="input-group">
                        <input className="form-control" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <div title="Show password" className="btn btn-warning">Show</div>
                    </div>
                    <div id="password" className="paragraphs">Password must be at least 6 characters, contain at least one upper case letter and a number</div>
                </div>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="password" placeholder="Enter your password again" value={passwordAgain} onChange={e => setPasswordAgain(e.target.value)}/>
                        <div title="Show password" className="btn btn-warning">Show</div>
                    </div>
                </div>
                {(password !== passwordAgain) && (passwordAgain !== "") && (password !== "") && <p className="alert alert-warning mb-3">Passwords do not match!</p>}
                <div className="form-group text-center">
                    <button className="btn btn-primary px-5 mb-3" onClick={() => addNewUser()}>
                        Create account
                    </button>
                </div>
                <p id="message">{message}</p>
                </div>
        </div>
    );
}