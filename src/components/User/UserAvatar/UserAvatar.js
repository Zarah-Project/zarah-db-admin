import {Avatar} from "antd";
import React, {useEffect} from "react";
import auth from "../../../services/auth";
import style from "./UserAvatar.module.css";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import setUser from "./actions/setUser";
import history from "../../../utils/history";

const UserAvatar = ({displayUsername, ...rest}) => {
  const ColorHash = require('color-hash');
  const colorHash = new ColorHash();

  const user = useSelector(state => state.user, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.username) {
      auth.getUser().then((response) => {
        dispatch(setUser(response.data));
      }).catch((error) => {
        history.push('/login');
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const getInitials = () => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const nameParts = fullName.split(' ');
    return nameParts.map(part => part[0]).join('');
  };

  return (
    <React.Fragment>
      <Avatar
        style={{backgroundColor: colorHash.hex(user ? user.username : '')}}
        {...rest}
      >
        { getInitials() }
      </Avatar>
      {displayUsername && <span className={style.ProfileText}>{user.firstName} {user.lastName} ({user.username})</span>}
    </React.Fragment>
  )
};

export default UserAvatar;
