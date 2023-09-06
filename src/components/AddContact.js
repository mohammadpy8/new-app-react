import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import "./AddContact.css";

const AddContact = ({ addContact }) => {
    
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        email:"",
    });

    const changeHandler = event => setContact({ ...contact, [event.target.name]: event.target.value });

    const submitForm = event => {

        if (!contact.name || !contact.email) {
            alert("khalie");
            return;
        };

        event.preventDefault();
        addContact(contact);
        setContact({ name: "", email: "" });

        navigate("/");
    };

    return (
        <form onSubmit={submitForm}>
            <div className='form-control'>
                <label>name</label>
                <input type="text" name='name' value={contact.name} onChange={changeHandler} placeholder='enter your name'/>
            </div>
            <div className='form-control'>
                <label>email</label>
                <input type="text" name='email' value={contact.email} onChange={changeHandler} placeholder='enter your email'/>
            </div>
            <button type='submit'>Add Contact</button>
        </form>
    );
};

export default AddContact;