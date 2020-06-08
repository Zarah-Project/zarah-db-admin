import React from "react";
import {Dropdown, Menu} from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import {clearAuthTokens} from "axios-jwt";
import { useHistory } from "react-router-dom";

import style from "./UserProfileMenu.module.css";
import UserAvatar from "../UserAvatar/UserAvatar";

const UserProfileMenu = (props) => {
  let history = useHistory();

  const menuClick = ({ key }) => {
    switch (key) {
      case 'logout':
        clearAuthTokens();
        history.push('/login');
        break;
      case 'profile':
        history.push('/profile');
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={menuClick}>
      <Menu.Item key="profile">
        <UserOutlined />
          Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined/>
          Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
    >
      <div className={style.Profile}>
        <UserAvatar
          displayUsername={true}
        />
      </div>
    </Dropdown>
  )
};

export default UserProfileMenu;
