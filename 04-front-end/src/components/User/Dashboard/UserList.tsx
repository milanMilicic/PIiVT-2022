import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api';
import IUser from '../../../models/IUser.model';

export default function UserList(){

    const [ users, setUsers ] = useState<IUser[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    interface UserListRowProperties {
        user: IUser
    }

    function loadUsers(){
        api("get", "/api/user", "user")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                throw{
                    message: 'Unknown error while loading users',
                }
            }

            setUsers(apiResponse.data);
        })
        .catch(error => {
            setErrorMessage(error.message ?? 'Unknown error while loading users');
        });
    }

    useEffect(() => {
        loadUsers();
    }, []);

    function UserListRow(props: UserListRowProperties){
        const [ username, setUsername ] = useState<string>(props.user.username);

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value);
        }

        const doEditUsername = () => {
            api("put", "/api/user/" + props.user.userId, "user", {username: username})
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage('Could not edit this category!');
                }

                loadUsers();
            })
        }

        return(
            <tr>
                <td>{props.user.userId}</td>
                <td>
                    <div className="input-group">
                        <input className="form-control form-control-sm" type="text" value={username} onChange={e => nameChanged(e) }/>
                        {props.user.username !== username ? <button className="btn btn-primary btn-sm" onClick={() => doEditUsername()}>Save</button> : ""}
                    </div>
                </td>
                <td>
                    <Link className="btn btn-primary btn-sm me-3" to={"/api/user/" + props.user.userId} state={{employee: props.user}}>Change password</Link>
                </td>
            </tr>
        );
    }

    return(
        <div>
            { errorMessage && <p>Error: {errorMessage}</p> }
            {!errorMessage && (
                <>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th id="username">Username</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map(user => <UserListRow key={'user-row' + user.userId} user={user}/>)}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );   
}