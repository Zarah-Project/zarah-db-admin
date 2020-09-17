import React from 'react';
import AuthorityList from "../../../components/AuthorityList/AuthorityList";
import place from "../../../services/place";

const PlaceList = (props) => {
  const columns = [
    {
      title: 'Place',
      dataIndex: 'place_name',
      key: 'place_name',
      ellipsis: false,
    }, {
      title: 'Country / Kindgom',
      dataIndex: 'country',
      key: 'country',
      ellipsis: false,
    }
  ];

  return (
    <AuthorityList
      serviceClass={place}
      dataKey={'place_name'}
      columns={columns}
      formType={'place'}
      {...props}
    />
  )
};

export default PlaceList;
