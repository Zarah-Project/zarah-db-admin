import React from "react";
import {Card, Col} from "antd";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Typography } from 'antd';
import UserDetailsForm from "./forms/UserDetailsForm";
import UserPasswordChangeForm from "./forms/UserPasswordChangeForm";
import {shallowEqual, useSelector} from "react-redux";

const { Title, Text } = Typography;

const UserProfileForm = () => {
  const user = useSelector(state => state.user, shallowEqual);

  return (
    <React.Fragment>
      <Col span={10}>
        <Card size="small">
          <div style={{textAlign: 'center'}}>
            <UserAvatar
              size={80}
            />
          <Title level={4}>{user.lastName}, {user.firstName}</Title>
          <Text>{user.username}</Text>
          </div>
        </Card>
      </Col>
      <Col span={14}>
        <UserDetailsForm />
        <UserPasswordChangeForm />
      </Col>
    </React.Fragment>
  )
};

export default UserProfileForm;
