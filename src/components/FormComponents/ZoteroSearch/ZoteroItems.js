import React, {useState} from 'react';
import {Button, Drawer, Modal, Input, Table, Tooltip} from "antd";
import ReactJson from 'react-json-view'

import { UnorderedListOutlined, ImportOutlined, CloseOutlined } from "@ant-design/icons";
import style from './ZoteroItems.module.css'
import {FormItem, Input as FormikInput} from "formik-antd";
import getLabel from "../../../utils/getLabel";

const ZoteroItems = ({zoteroItems, values, setFieldValue, onSelect, action}) => {
  const [selectedRecord, setSelectedRecord] = useState({});
  const [drawerShown, setDrawerShown] = useState(false);

  const onViewClick = (row) => {
    setSelectedRecord(row);
    setDrawerShown(true)
  };

  const showImportConfirm = (row) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like import this record?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onSelect(row)
      }
    });
  };

  const renderActionButtons = (row) => {
    return (
      <Button.Group>
        <Tooltip title={'View Full Record'}>
          <Button size="small" icon={<UnorderedListOutlined/>} onClick={() => onViewClick(row)} style={{alignItems: 'center'}} />
        </Tooltip>
        <Tooltip title={'Import'}>
          <Button size="small" icon={<ImportOutlined/>} onClick={() => showImportConfirm(row)} style={{alignItems: 'center'}} />
        </Tooltip>
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
      title: 'Item Type',
      dataIndex: 'itemType',
      key: 'itemType',
      width: 150,
    }, {
      title: 'Actions',
      render: renderActionButtons,
      width: 100,
      className: style.ActionColumn
    }
  ];

  const onOpenZoteroRecord = () => {
    setDrawerShown(true);
    setSelectedRecord(JSON.parse(values['zotero_data']))
  };

  const onRemoveZoteroRecord = () => {
    setFieldValue("zotero_id", "");
    setFieldValue("zotero_data", "");
  };

  return (
    <React.Fragment>
      {
        zoteroItems.length > 0 &&
        <Table
          style={{marginTop: '20px'}}
          bordered={true}
          rowKey={record => record.key}
          dataSource={zoteroItems}
          columns={columns}
          size={'small'}
        />
      }
      {
        values['zotero_id'] &&
        <FormItem label={getLabel('zotero_id', values)} name={'zotero_id'} style={{marginTop: '10px'}}>
          <Input.Group compact style={{ width: "100%" }}>
            <FormikInput name={'zotero_id'} disabled={true} style={{ width: "calc(100% - 92px)" }} />
            <Button
              onClick={onOpenZoteroRecord}
              type={'default'}
              style={{alignItems: 'center'}}
            >
              <UnorderedListOutlined/>
            </Button>
            {
              action !== 'view' &&
              <Button
                onClick={onRemoveZoteroRecord}
                type={'default'}
                style={{alignItems: 'center'}}
              >
                <CloseOutlined/>
              </Button>
            }
          </Input.Group>
        </FormItem>
      }
      <Drawer
        title={selectedRecord.title}
        width={'50%'}
        onClose={() => setDrawerShown(false)}
        visible={drawerShown}
        destroyOnClose={true}
      >
        <ReactJson
          name={false}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          src={selectedRecord}
        />
      </Drawer>
    </React.Fragment>
  );
};

export default ZoteroItems;
