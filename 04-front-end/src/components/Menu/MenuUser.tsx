import { Link, useNavigate } from 'react-router-dom';
import AuthStore from "../../stores/AuthStore";


export default function MenuUser() {
    const navigate = useNavigate();

    function doUserLogout(){
        AuthStore.dispatch({type: "reset"} );
        navigate("/auth/user/login");
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <Link className="navbar-brand" to="/">Hi, { AuthStore.getState().identity }</Link>
            <Link className="navbar-brand" to="/user/dashboard">Dashboard</Link>
            <div className="navbar-brand" style={{cursor: "pointer"}} onClick={() => doUserLogout()}>Logout</div>
        </nav>
    );
}