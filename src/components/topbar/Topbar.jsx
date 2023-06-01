import React from "react";
import "./topbar.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/apiCalls";
import { NotificationsNone, Language, Settings, LogoutOutlined, LoginOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Topbar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user?.currentUser)


  const logOut = () => {
    logoutUser(dispatch)
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Page</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          { user ? 
            <div className="topbarIconContainer">
              <LogoutOutlined onClick={() => logOut()} />
              Logout
            </div>

            : <div className="topbarIconContainer">
              <LoginOutlined onClick={() => navigate(('/login'))} />
              Login
            </div>
          }
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
