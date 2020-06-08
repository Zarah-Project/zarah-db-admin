import React, {useState, useEffect} from 'react';
import {Button, Col, Table, Tooltip} from "antd";
import style from "../../../components/FormComponents/ZoteroSearch/ZoteroItems.module.css";
import document from '../../../services/document';
import { EditOutlined, FolderViewOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";

const DocumentList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    document.list().then((response) => {
      setData(response.data.results);
    })
  }, []);

  const renderActionButtons = (row) => {
    return (
      <Button.Group>
        <Link to={`/documents/view/${row.id}`}>
          <Tooltip title={'View Full Record'}>
            <Button size="small" icon={<FolderViewOutlined/>} />
          </Tooltip>
        </Link>
        {
          row.is_editable &&
          <Link to={`/documents/edit/${row.id}`}>
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: false,
    }, {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by'
    }, {
      title: 'Actions',
      render: renderActionButtons,
      width: 100,
      className: style.ActionColumn
    }
  ];

  const getFooter = () => (
    <Link to={'/documents/create'}>
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
        footer={getFooter}
      />
    </Col>
  )
};

export default DocumentList;
