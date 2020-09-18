import React from 'react';
import AuthorityList from "../../../components/AuthorityList/AuthorityList";
import event from "../../../services/event";

const EventList = (props) => {
  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      ellipsis: false,
    }, {
      title: 'Date From',
      dataIndex: 'date_from',
      key: 'date_from',
      width: 200,
      ellipsis: false,
    }, {
      title: 'Date To',
      dataIndex: 'date_to',
      key: 'date_to',
      width: 200,
      ellipsis: false,
    }
  ];

  return (
    <AuthorityList
      serviceClass={event}
      dataKey={'event'}
      columns={columns}
      formType={'event'}
      {...props}
    />
  )
};

export default EventList;
