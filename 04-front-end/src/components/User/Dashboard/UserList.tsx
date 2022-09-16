import { useState, useEffect } from 'react';
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
        return(
            <tr>
                <td>{props.user.userId}</td>
                <td>{props.user.username}</td>
            </tr>
        );
    }

    return(
        <div>
            { errorMessage && <p>Error: {errorMessage}</p> }
            {!errorMessage && (
                <>
                    <table className="table table-sm table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
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