import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../App.css";
import { getUsers } from "../api";
import Contact from "./Contact";
import Loader from "./Loader";
import CreateContact from "./CreateContact";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateContact = () => {
    setLoading(true);
  };

  const fetchUsers = async () => {
    const contacts = await getUsers();
    //console.log(contacts.data);
    //setUsers([...contacts.data]);
    if (localStorage.getItem("myContacts") !== null) {
      const arr = JSON.parse(localStorage.getItem("myContacts"));
      setUsers([...arr]);
    } else {
      localStorage.setItem("myContacts", JSON.stringify(contacts.data));
      setUsers([...contacts.data]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    console.log(users);
    console.log(loading);
  }, [loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Contact-List</h1>
      </div>

      <CreateContact onContactCreated={handleCreateContact} />

      <div className="contacts-list">
        {users.map((user) => {
          return (
            <Contact
              user={user}
              key={user.id + user.name}
              onContactDeletion={handleCreateContact}
            />
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
