import React, { useState } from "react";

import { Link } from "react-router-dom";
import Contact from "./Contact";

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
            return (
              <Contact removeContactHandler={removeContactHandler} contact={contact} key={contact.id} />
            );
          })
        : ""}
    </>
  );
};

export default ContactList;
