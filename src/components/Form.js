import React, {useState} from 'react';
import Error from './Error'
import PropTypes from 'prop-types';


    const Form = ({saveSearch}) => {

        const [ term, saveTerm] = useState('');
        const [error, saveError] = useState(false);

        const Search = e =>{

        e.preventDefault();

        //Validate

        if(term.trim() === ''){

            saveError(true);
            return;
        }

        saveError(false);

        saveSearch(term);

        }



        return ( 
            <form
            onSubmit={Search}>
                <div className="row">
                    <div className="form-group col-md-8">
                        <input
                            type="text"
                            className="form-control form-control-md"
                            placeholder="Search image"
                            onChange= {e => saveTerm(e.target.value)}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <input
                            type="submit"
                            className="btn btn-md btn-info  btn-block btn-t"
                            value="Search"
                        />
                    </div>

                </div>
                {error ? <Error message="Please. Add a term" /> :null}
            </form>
        );
    }

Form.propTypes = {
    saveSearch:PropTypes.func.isRequired
}
 
export default Form;