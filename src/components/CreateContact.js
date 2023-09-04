import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUser } from "../api";
import "font-awesome/css/font-awesome.min.css";
import "../CreateContact.css";

const CreateContact = ({ onContactCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [creating, setCreating] = useState(false);
  const [add, setAdd] = useState(false);
  useEffect(() => {}, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      email,
      phone,
    };

    const newContact = await createUser(body);
    const contacts = JSON.parse(localStorage.getItem("myContacts"));
    contacts.push(newContact.data);
    localStorage.setItem("myContacts", JSON.stringify(contacts));
    setCreating(true);
    setAdd(false);
    if (onContactCreated) {
      toast.success("New Contact Created", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
        theme: "dark",
      });
      setTimeout(() => {
        onContactCreated();
      }, 1000);
    }
    //console.log("contacts:", contacts);

    //console.log(newContact.data);
  };

  const addClick = () => {
    setAdd(true);
  };

  if (!add) {
    return (
      <div className="enable-add-contact">
        <button onClick={addClick}>
          <i class="fas fa-plus"></i>
          {"  "} Add Contact
        </button>
      </div>
    );
  }

  return (
    <div className="create-contact-container">
      <form className="contact-form" onSubmit={handleContactSubmit}>
        <div className="left">
          <div>
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name">Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name">Phone No. :</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="right">
          <input type="submit" value="+  Add" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateContact;
