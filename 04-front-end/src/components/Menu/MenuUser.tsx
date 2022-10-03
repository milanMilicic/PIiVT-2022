import { Link } from "react-router-dom";
import AuthStore from "../../stores/AuthStore";

export default function MenuUser() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <Link className="navbar-brand" to="/">Hi, { AuthStore.getState().identity }</Link>
            <Link className="navbar-brand" to="/user/dashboard">Dashboard</Link>
            <Link className="navbar-brand" to="/auth/user/logout">Logout</Link>
        </nav>
    );
}