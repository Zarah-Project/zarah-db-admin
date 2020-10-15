import React from 'react';
import AuthorityList from "../../../components/AuthorityList/AuthorityList";
import organisation from "../../../services/organisation";

const OrganisationList = (props) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: false,
      sorter: true
    }, {
      title: 'Acronym',
      dataIndex: 'acronym',
      key: 'acronym',
      ellipsis: false,
      sorter: true
    }
  ];

  return (
    <AuthorityList
      serviceClass={organisation}
      dataKey={'name'}
      columns={columns}
      formType={'organisation'}
      {...props}
    />
  )
};

export default OrganisationList;
