import { useState, useEffect } from 'react';
import { api } from '../../../api/api';
import ICategory from '../../../models/ICategory.model';
export default function UserAddEmployee(){

    const [ categories, setCategories ] = useState<ICategory[]>([]);
    const [ category, setCategory ] = useState<number>();
    const [ name, setName ] = useState<string>("");
    const [ employment, setEmployment ] = useState<number>();
    const [ jmbg, setJmbg ] = useState<string>("");
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ message, setMessage ] = useState<string>("");
    const [ nameMessage, setNameMessage ] = useState<string>();
    const [ jmbgMessage, setJmbgMessage ] = useState<string>();
    const [ categoryMessage, setCategoryMessage ] = useState<string>();

    interface CategoryListSelectProps {
        category: ICategory
    }


    useEffect(() => {
        api("get", "/api/category", "user")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                setErrorMessage("Unknown problem occured");
            }

            setCategories(apiResponse.data);
        })
    }, []);


    function CategoryListSelect(props: CategoryListSelectProps){
        return (
            <option value={props.category.categoryId}>{props.category.name}</option>
        );
    }

    function add(){
        if(name.length < 3 || name.length > 32){
            let nameParagraf = document.getElementById('name-p');
            nameParagraf?.classList.add('alert');
            nameParagraf?.classList.add('alert-danger');
            setNameMessage('Name must be between 3 and 32 letters!');
            return;
        }

        let nameParagraf = document.getElementById('name-p');
        nameParagraf?.classList.remove('alert');
        nameParagraf?.classList.remove('alert-danger');
        setNameMessage("");

        if(jmbg.length !== 13 ){
            let jmbgParagraf = document.getElementById('jmbg-p');
            jmbgParagraf?.classList.add('alert');
            jmbgParagraf?.classList.add('alert-danger');
            setJmbgMessage('JMBG number not valid!');
            return;
        }

        let jmbgParagraf = document.getElementById('jmbg-p');
        jmbgParagraf?.classList.remove('alert');
        jmbgParagraf?.classList.remove('alert-danger');
        setJmbgMessage('');

        if(category === undefined ){
            let categoryParagraf = document.getElementById('category-p');
            categoryParagraf?.classList.add('alert');
            categoryParagraf?.classList.add('alert-danger');
            setCategoryMessage('You did not choose any category!');
            return;
        }

        let categoryParagraf = document.getElementById('category-p');
        categoryParagraf?.classList.remove('alert');
        categoryParagraf?.classList.remove('alert-danger');
        setCategoryMessage('');

        api("post", `/api/category/${category}/employee`, "user", {name, employment: employment ?? 100, jmbg})
        .then(apiResponse => {
            if(apiResponse.status === "error"){
               return setErrorMessage(apiResponse.data);
            }
            
            setMessage("Employee successfully added");
            setTimeout(() => {
                setMessage("");
            }, 2000);
        })



    }



    return(
        <>
             <h1 className="h3 mb-3">Add new employee</h1>
            {!errorMessage && 
                <div className="row">
                    <div className="col col-xs-12 col-md-6 offset-md-3 mt-3">
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name:</label>
                            <div>
                                <input id="name" className="form-control" type="text" placeholder="Employees name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <p className='mt-3' id="name-p">{nameMessage}</p>
                        </div>


                        <div className="form-group mb-3">
                            <label htmlFor="jmbg" >JMBG:</label>
                            <div>
                                <input id="jmbg" className="form-control" type="text" placeholder="Employees jmbg" value={jmbg} onChange={e => setJmbg(e.target.value)} />
                            </div>
                            <p className='mt-3' id="jmbg-p">{jmbgMessage}</p>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="employment" >Employment(%):</label>
                            <div>
                                <input min={10} max={100} id="employment" className="form-control" type="number" placeholder="Default value is 100%" value={employment} onChange={e => setEmployment(+e.target.value)} />
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label>Category:</label>
                            <select value={category} className="form-select" onChange={(e) => setCategory(+e.target.value)}>
                                <option disabled selected>Choose...</option>
                                {categories.map(category => <CategoryListSelect key={'category-select-row' + category.categoryId} category={category}/>)}
                            </select>
                            <p className='mt-3' id="category-p">{categoryMessage}</p>
                        </div>
                        <button className="btn btn-primary text-center" onClick={() => add()}>Confirm</button>
                    </div>

                    { errorMessage && <p className="alert alert-danger mt-3">Error: {errorMessage}</p> }
                    {message && <p className='alert alert-success'>{message}</p>}
                </div>
            }
        </>
    );
}