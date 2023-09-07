import React from "react";

import { Link } from "react-router-dom";

const Contact = ({ removeContactHandler, contact }) => {
  const { name, id, email } = contact;

  return (
    <div className="contact-list">
      <div className="details">
        <Link to={{pathname:`/user/${id}`, state: {contact}}}>
          <p>name:{name}</p>
          <p>email:{email}</p>
        </Link>
      </div>
      <button onClick={() => removeContactHandler(id)}>delete</button>
    </div>
  );
};

export default Contact;
