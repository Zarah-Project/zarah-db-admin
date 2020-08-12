import React, {useState, useEffect} from 'react';
import {Button, Col, Drawer, Table, Tooltip, Modal} from "antd";
import style from "../../../components/FormComponents/ZoteroSearch/ZoteroItems.module.css";
import person from '../../../services/person';
import { EditOutlined, FolderViewOutlined, DeleteOutlined } from "@ant-design/icons";
import PeopleForm from "../PeopleForm/PeopleForm";

const PeopleList = () => {
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [action, setAction] = useState('view');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    person.list().then((response) => {
      setData(response.data);
    })
  };

  const onDelete = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to delete this person?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        person.delete(id).then((response) => {
          fetchData();
        })
      }
    });
  };

  const renderActionButtons = (row) => {
    return (
      <Button.Group>
        <Tooltip title={'View Full Record'}>
          <Button size="small" icon={<FolderViewOutlined/>} onClick={() => onDrawerOpen(row.id, 'view')}/>
        </Tooltip>
        <Tooltip title={'Edit Record'}>
          <Button size="small" icon={<EditOutlined/>} onClick={() => onDrawerOpen(row.id, 'edit')}/>
        </Tooltip>
        {
          row.is_removable &&
          <Tooltip title={'Delete Record'}>
            <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(row.id)}/>
          </Tooltip>
        }
      </Button.Group>
    )
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
      ellipsis: false,
    }, {
      title: 'Actions',
      render: renderActionButtons,
      width: 100,
      className: style.ActionColumn
    }
  ];

  const onDrawerOpen = (id, action) => {
    setAction(action);
    setSelectedValue(id);
    setDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const afterFormSubmit = () => {
    fetchData();
    setDrawerOpen(false);
  };

  const getFooter = () => {
    return (
      <Button
        type={'primary'}
        onClick={() => onDrawerOpen(undefined, 'create')}
      >
        Create
      </Button>
    )
  };

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
      <Drawer
        title={'View Person'}
        width={'50%'}
        destroyOnClose={true}
        onClose={(e) => onDrawerClose()}
        visible={drawerOpen}
      >
        <PeopleForm
          action={action}
          formType={'drawer'}
          recordID={selectedValue}
          onClose={afterFormSubmit}
        />
      </Drawer>
    </Col>
  )
};

export default PeopleList;
