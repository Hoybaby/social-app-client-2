import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {
    
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        // need to spread it so it just doesnt overwrite it
        setValues({...values, [event.target.name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}