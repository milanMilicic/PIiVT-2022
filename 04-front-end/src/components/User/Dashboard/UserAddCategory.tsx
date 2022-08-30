import { useState } from 'react';
import { api } from '../../../api/api';

export default function UserAddCategory() {
    const [ name, setName ] = useState<string>("");
    const [ price, setPrice ] = useState<string | number>("");
    const [ errorMessage, setErrorMesssage ] = useState<string>("");
    const [ message, setMesssage ] = useState<string>("");

    const add = () => {
        api("post", "/api/category", "user", {
            name: name,
            hourlyPrice: price
        })
        .then(apiResponse => {
            if (apiResponse.status === 'error') {
                return setErrorMesssage('Could not add this category!');
            }

            setName("");
            setPrice("");
            setMesssage('Category successfully added!')

            setTimeout(() => {
                setMesssage('')
            }, 2000);
        })
    }

    return(
        <div>
            { errorMessage && <p>Error: {errorMessage}</p> }
            {!errorMessage && 
                <div className="row">
                    <div className="col col-xs-12 col-md-6 offset-md-3 mt-3">
                        <h1 className="h5 mb-3">Add new category</h1>
                        <div className="form-group mb-3">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Category name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <div className="input-group">
                                <input className="form-control" type="number" placeholder="Hourly price" value={price} onChange={e => setPrice(+(e.target.value))}/>
                            </div>
                        </div>
                        <div className="form-group text-center">
                            {(name.trim().length >= 3 && name.trim().length <= 32) && price >= 300
                            ?  <button className="btn btn-primary px-5" onClick={() => add()}>
                                    Add category
                                </button>
                            : ''}
                            
                        </div>
                    </div>
                    {message && <p className='alert alert-success'>{message}</p>}
                </div>
            }
            
        </div>
    );
}