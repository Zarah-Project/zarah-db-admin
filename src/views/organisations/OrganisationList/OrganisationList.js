import React, {useState, useEffect} from 'react';
import {Button, Col, Table, Tooltip} from "antd";
import style from "../../../components/FormComponents/ZoteroSearch/ZoteroItems.module.css";
import organisation from '../../../services/organisation';
import { EditOutlined, FolderViewOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";

const OrganisationList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    organisation.list().then((response) => {
      setData(response.data);
    })
  }, []);

  const renderActionButtons = (row) => {
    return (
      <Button.Group>
        <Link to={`/organisation/view/${row.id}`}>
          <Tooltip title={'View Full Record'}>
            <Button size="small" icon={<FolderViewOutlined/>} />
          </Tooltip>
        </Link>
        {
          row.is_editable &&
          <Link to={`/organisation/edit/${row.id}`}>
            <Tooltip title={'Edit Record'}>
              <Button size="small" icon={<EditOutlined/>}/>
            </Tooltip>
          </Link>
        }
      </Button.Group>
    )
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: false,
    }, {
      title: 'Acronym',
      dataIndex: 'acronym',
      key: 'acronym',
      ellipsis: false,
    }, {
      title: 'Actions',
      render: renderActionButtons,
      width: 100,
      className: style.ActionColumn
    }
  ];

  const getFooter = () => (
    <Link to={'/person/create'}>
      <Button
        type={'primary'}
      >
        Create
      </Button>
    </Link>
  );

  return (
    <Col span={24}>
      <Table
        style={{marginTop: '20px'}}
        bordered={true}
        rowKey={record => record.id}
        dataSource={data}
        columns={columns}
        size={'small'}
      />
    </Col>
  )
};

export default OrganisationList;
