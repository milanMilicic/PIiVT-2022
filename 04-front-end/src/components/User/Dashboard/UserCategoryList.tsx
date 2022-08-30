import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../api/api";
import ICategory from '../../../models/ICategory.model';
import "./UserCategoryList.sass"

interface IUserCategoryListRowProperties {
    category: ICategory,
}

export default function UserCategoryList(){
    const [ categories, setCategories ] = useState<ICategory[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    function UserCategoryListRow(props: IUserCategoryListRowProperties) {
        const [ name, setName ] = useState<string>(props.category.name);

        const nameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
        }

        const doEditCategory = () => {
            api("put", "/api/category/" + props.category.categoryId, "user", {name: name})
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage('Could not edit this category!');
                }

                loadCategories();
            })
        }

        return (
            <tr>
                <td>{props.category.categoryId}</td>
                <td>
                    <div className="input-group">
                        <input className="form-control form-control-sm" type="text" value={name} onChange={e => nameChanged(e) }/>
                        {props.category.name !== name ? <button className="btn btn-primary btn-sm" onClick={() => doEditCategory()}>Save</button> : ""}
                    </div>
                </td>
                <td>{props.category.hourlyPrice}</td>
                <td>
                    <Link className="btn btn-primary btn-sm" to={"/user/dashboard/category/" + props.category.categoryId + "/employees"}>List of employees</Link>
                </td>
            </tr>
        )
    }

    const loadCategories = () => {
        api("get", "/api/category", "user")
        .then(apiResponse => {
            if(apiResponse.status === 'ok'){
                return setCategories(apiResponse.data);
            }

            throw{
                message: 'Unknown error while loading categories',
            }
        })
        .catch(error => {
            setErrorMessage(error.message ?? 'Unknown error while loading categories');
        });
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return(
        <div>
            { errorMessage && <p>Error: {errorMessage}</p> }
            {!errorMessage && 
                <>
                    <Link className="btn btn-primary btn-sm mb-2" to={"/user/dashboard/add-new-button"}>Add new category</Link>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="category-row-id">ID</th>
                                <th className="category-row-name">Name</th>
                                <th className="category-row-price">Hourly price</th>
                                <th className="category-row-options">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            { categories.map(category => <UserCategoryListRow key={"category-row-" + category.categoryId} category={ category } /> )}
                        </tbody>
                    </table>
                </>
            }
        </div>
    );
}
