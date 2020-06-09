import React, {useState, useEffect} from 'react';
import {Button, Col, Drawer, Table, Tooltip} from "antd";
import style from "../../../components/FormComponents/ZoteroSearch/ZoteroItems.module.css";
import place from '../../../services/place';
import { EditOutlined, FolderViewOutlined } from "@ant-design/icons";
import PlaceForm from "../PlaceForm/PlaceForm";

const PlaceList = () => {
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [action, setAction] = useState('view');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    place.list().then((response) => {
      setData(response.data);
    })
  };

  const renderActionButtons = (row) => {
    return (
      <Button.Group>
        <Tooltip title={'View Full Record'}>
          <Button size="small" icon={<FolderViewOutlined/>} onClick={() => onDrawerOpen(row.id, 'view')}/>
        </Tooltip>
        {
          row.is_editable &&
          <Tooltip title={'Edit Record'}>
            <Button size="small" icon={<EditOutlined/>} onClick={() => onDrawerOpen(row.id, 'edit')}/>
          </Tooltip>
        }
      </Button.Group>
    )
  };

  const columns = [
    {
      title: 'Place',
      dataIndex: 'place_name',
      key: 'place_name',
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
      />
      <Drawer
        title={'View Place'}
        width={'50%'}
        destroyOnClose={true}
        onClose={(e) => onDrawerClose()}
        visible={drawerOpen}
      >
        <PlaceForm
          action={action}
          formType={'drawer'}
          recordID={selectedValue}
          onClose={afterFormSubmit}
        />
      </Drawer>
    </Col>
  )
};

export default PlaceList;
