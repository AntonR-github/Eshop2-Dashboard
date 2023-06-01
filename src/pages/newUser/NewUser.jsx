import "./newUser.css";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from "../../redux/apiCalls";

export default function NewUser() {

  const [input, setInput] = useState({});
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(input, dispatch);
  };

  



  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input name="username" type="text" placeholder="username" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input name="email" type="email" placeholder="email" onChange={handleChange} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input name="password" type="password" placeholder="password" onChange={handleChange} />
        </div>
        <button onClick={handleSubmit} className="newUserButton">Create</button>
      </form>
    </div>
  );
}
