import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";


interface HeaderProps {
  toggleSideBar: () => void;
  closeSideBar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideBar, closeSideBar }) => {
  const navigate = useNavigate();


  const handleMain = () => {
    navigate("/");
    closeSideBar()
  }

  return (
    <div id="header-container">
      <div className="header-area">
        <div className="logo-container">
          <div onClick={handleMain}>
            <img className="logo" src="/icons/Easy_Travel.png" alt="로고" />
          </div>
        </div>

        <div className="text-container">

          <p className="member-nickname">
            <span>관리자</span>
          </p>
          <img
            className="side-menu-btn"
            src="/icons/hamburger_menu.png"
            alt="메뉴"
            onClick={toggleSideBar}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
