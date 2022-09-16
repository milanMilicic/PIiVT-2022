import React from "react";
/* import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; */
import { Link } from "react-router-dom";

export default function UserDashboard() {
    return (
        <div className="row">
            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Categories</h2>
                        </div>
                        <div className="card-text d-grid gap-3">
                            <Link className="btn btn-primary" to="/user/dashboard/category/list">List all categories</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Employees</h2>
                        </div>
                        <div className="card-text d-grid gap-3">
                            <Link className="btn btn-primary" to="/user/dashboard/employee/list">List all employees</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Salaries</h2>
                        </div>
                        <div className="card-text d-grid gap-3">
                        <div className="btn-group w-100">
                                <Link className="btn btn-primary" to="/user/dashboard/salary/list">List salaries</Link>
                                <Link className="btn btn-success" to="/user/dashboard/salary/add">Add new salary</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Calculation</h2>
                        </div>
                        <div className="card-text d-grid gap-3">
                            <div className="btn-group w-100">
                                <Link className="btn btn-primary" to="/user/dashboard/calculation/list">Get calculations</Link>
                                <Link className="btn btn-success" to="/user/dashboard/calculation/add">Calculate</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-xl-3 p-3">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h2 className="h5">Users</h2>
                        </div>
                        <div className="card-text">
                            <div className="btn-group w-100">
                                <Link className="btn btn-primary" to="/user/dashboard/user/list">List all users</Link>
                                <Link className="btn btn-success" to="/user/dashboard/user/add">
                                    Add new user
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}