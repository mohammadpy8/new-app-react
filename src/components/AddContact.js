import React, { useState } from 'react';

import "./AddContact.css";

const AddContact = () => {

    const [contact, setContact] = useState({
        name: "",
        email:"",
    });

    const changeHandler = event => setContact({ ...contact, [event.target.name]: event.target.value });

    const submitHandler = event => {
        event.preventDefault();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='form-control'>
                <label>name</label>
                <input type="text" name='name' value={contact.name} onChange={changeHandler}/>
            </div>
            <div className='form-control'>
                <label>email</label>
                <input type="text" name='email' value={contact.email} onChange={changeHandler}/>
            </div>
            <button type='submit'>Add Contact</button>
        </form>
    );
};

export default AddContact;