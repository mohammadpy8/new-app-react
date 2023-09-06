import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./ContactList.css";

const ContactList = ({ contactList, removeContactHandler }) => {
  console.log(contactList);

  return (
    <>
      
    <div className="add">
      <h1>Contacts</h1>
        <Link to="/add">
          <button className="add-btn">Add</button>
        </Link>
    </div>

      {contactList.length
        ? contactList.map((contact) => {
            const { name, email, id } = contact;
            return (
              <div key={id} className="contact-list">
                <div className="details">
                  <p>name:{name}</p>
                  <p>email:{email}</p>
                </div>
                <button onClick={() => removeContactHandler(id)}>delete</button>
              </div>
            );
          })
        : ""}
    </>
  );
};

export default ContactList;
