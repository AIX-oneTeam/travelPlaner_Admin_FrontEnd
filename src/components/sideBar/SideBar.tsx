import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import axios from "axios";

interface SideBarProps {
  closeSideBar: () => void;
  isSideBarVisible: boolean;
  navigateAndCloseSideBar: (path: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  isSideBarVisible,
  closeSideBar,
  navigateAndCloseSideBar,
}) => {
 
  if (!isSideBarVisible) {
    return null;
  }

  return (
    <aside id="sideBar-container">
      <h2 className="none">sideBar</h2>
      <ul className="sideBar-contents">
        <li onClick={() => navigateAndCloseSideBar("/agent")}>
          에이전트 관리
        </li>
        <li onClick={() => navigateAndCloseSideBar("/graph/member")}>
          멤버 관리
        </li>
        <li onClick={() => navigateAndCloseSideBar("/question")}>
          문의글 관리
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
