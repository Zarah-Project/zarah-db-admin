import React from 'react';
import AuthorityList from "../../../components/AuthorityList/AuthorityList";
import person from "../../../services/person";

const PeopleList = (props) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      ellipsis: false,
    },
  ];

  return (
    <AuthorityList
      serviceClass={person}
      dataKey={'full_name'}
      columns={columns}
      formType={'person'}
      {...props}
    />
  )
};

export default PeopleList;
