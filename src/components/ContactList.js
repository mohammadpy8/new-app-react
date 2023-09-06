import React, { useState } from "react";

import "./ContactList.css";

const ContactList = ({ contactList, removeContactHandler }) => {
  console.log(contactList);

  return (
    <>
      {contactList.length
        ? contactList.map((contact) => {
            const { name, email, id } = contact;
            return (
              <div key={id}>
                    <p>name:{name}</p>
                    <p>email:{email}</p>
                    <button onClick={() => removeContactHandler(id)}>delete</button>
              </div>
            );
          })
        : ""}
    </>
  );
};

export default ContactList;
