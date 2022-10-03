import {Link } from 'react-router-dom';
import { useState } from 'react';
import AuthStore from '../../stores/AuthStore';
import MenuVisitor from './MenuVisitor';
import MenuUser from './MenuUser';
export default function Menu(){
    const [ role, setRole ] = useState<"visitor" | "user">(AuthStore.getState().role);

    AuthStore.subscribe(() => {
        setRole(AuthStore.getState().role)
    });

    return (
        <>
            {role === "visitor" && <MenuVisitor />}
            {role === "user" && <MenuUser />}
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className="navbar-brand">Welcome, {role}</div>
                <Link className="navbar-brand" to="/">Home</Link>
                <Link className="navbar-brand" to="/user/dashboard">Dashboard</Link>
                <Link className="navbar-brand" to="/auth/user/login">User login</Link>
            </nav> */}
        </>
    );
}