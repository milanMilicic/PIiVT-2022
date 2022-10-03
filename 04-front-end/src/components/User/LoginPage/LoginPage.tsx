import { useState } from "react";
import { api } from "../../../api/api";
import AuthStore from "../../../stores/AuthStore";
import './LoginPage.sass';
import { type } from 'os';
import { useNavigate } from "react-router-dom";

export default function LoginPage(){

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const doLogin = () => {
        api("post", "/api/auth/user/login", "user", {username, password })
        .then(res => {
            if(res.status !== "ok"){
                throw new Error("Could not log in. Reason: " + JSON.stringify(res.data));
            }

            return res.data;
        })
        .then(data => {
            AuthStore.dispatch( { type: "update", key: "authToken", value: data?.authToken } );
            AuthStore.dispatch( { type: "update", key: "refreshToken", value: data?.refreshToken } );
            AuthStore.dispatch( { type: "update", key: "identity", value: username } );
            AuthStore.dispatch( { type: "update", key: "role", value: "user" } );

            navigate("/user/dashboard", {
                replace: true,
            });
        })
        .catch(error => {
            setError(error?.message ?? "Could not log in!");

            setTimeout(() => {
                setError("");
            }, 3500);
        });
    };

    return (
        <div className="row">
            <div className="col col-xs-12 col-md-6 offset-md-3 mt-3">
                <h1 className="h3 mb-3">Log into your account</h1>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className="form-group mb-3">
                    <div className="input-group">
                        <input className="form-control" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group text-center mb-3">
                    <button className="btn btn-primary px-5" onClick={() => doLogin()}>
                        Log In
                    </button>
                </div>

                {error && <p className="alert alert-danger">{error}</p>}
            </div>
        </div>
    );
}