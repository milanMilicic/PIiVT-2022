import { Link } from "react-router-dom";

export default function MenuVisitor() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <Link className="navbar-brand" to="/">Home</Link>
            <Link className="navbar-brand" to="/auth/user/login">User login</Link>
        </nav>
    );
}