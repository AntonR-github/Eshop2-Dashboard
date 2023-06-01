import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useState, useEffect } from 'react';
import { userRequest } from "../../constants/requestMethods";

export default function WidgetSm() {

  const [ users, setUsers ] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  });
  

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"}
            alt="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
