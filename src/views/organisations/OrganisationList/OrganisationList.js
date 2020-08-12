import React, {useState, useEffect} from 'react';
import {Button, Col, Drawer, Modal, Table, Tooltip} from "antd";
import style from "../../../components/FormComponents/ZoteroSearch/ZoteroItems.module.css";
import organisation from '../../../services/organisation';
import { EditOutlined, FolderViewOutlined, DeleteOutlined } from "@ant-design/icons";
import OrganisationForm from "../OrganisationForm/OrganisationForm";
import person from "../../../services/person";

const OrganisationList = () => {
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [action, setAction] = useState('view');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    organisation.list().then((response) => {
      setData(response.data);
    })
  };

  const onDelete = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to delete this organisation?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        organisation.delete(id).then((response) => {
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
        title={'View Organisation'}
        width={'50%'}
        destroyOnClose={true}
        onClose={(e) => onDrawerClose()}
        visible={drawerOpen}
      >
        <OrganisationForm
          action={action}
          formType={'drawer'}
          recordID={selectedValue}
          onClose={afterFormSubmit}
        />
      </Drawer>
    </Col>
  )
};

export default OrganisationList;
