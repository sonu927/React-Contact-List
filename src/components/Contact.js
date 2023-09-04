import React, { useState } from "react";
import { deleteUser, updateUser } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = ({ user, onContactDeletion }) => {
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const setEditMode = () => {
    setUpdate(true);
  };

  const updateContact = async () => {
    const body = {
      name,
      email,
      phone,
    };

    const updatedContact = await updateUser(user.id, body);
    const contacts = JSON.parse(localStorage.getItem("myContacts"));
    //console.log(contacts);
    const index = contacts.findIndex((obj) => obj.id === user.id);
    contacts[index] = updatedContact.data;
    localStorage.setItem("myContacts", JSON.stringify(contacts));
    //console.log(updatedContact);

    setName(updatedContact.data.name);
    setEmail(updatedContact.data.email);
    setPhone(updatedContact.data.phone);
    setUpdate(false);
    toast.success("Contact Updated", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      theme: "dark",
    });
  };

  const deleteContact = async () => {
    const deletedContact = await deleteUser(user.id);
    console.log(deletedContact);
    const contacts = JSON.parse(localStorage.getItem("myContacts"));
    const index = contacts.findIndex((obj) => obj.id === user.id);
    if (index !== -1) {
      contacts.splice(index, 1);
    }
    localStorage.setItem("myContacts", JSON.stringify(contacts));

    if (onContactDeletion) {
      toast.success("Contact Deleted", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 800,
        theme: "dark",
        icon: "🗑️",
      });
      setTimeout(() => {
        onContactDeletion();
      }, 1000);
    }
  };
  return (
    <div className="contact-container">
      <div className="img-container">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3899/3899618.png"
          alt={user.username}
          width={50}
          height={50}
        />
      </div>
      <div className="details-container">
        <div>
          {update ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            name
          )}
        </div>
        <div>
          {update ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          ) : (
            phone
          )}
        </div>
        <div>
          {update ? (
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            email
          )}
        </div>
        <div>
          {update ? (
            <button onClick={updateContact}>Save</button>
          ) : (
            <>
              <button onClick={setEditMode}>Edit</button>
              <button onClick={deleteContact}>Delele</button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
