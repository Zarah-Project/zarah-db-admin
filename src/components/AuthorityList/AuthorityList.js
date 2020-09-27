import React, {useState, useEffect} from 'react';
import {Button, Col, Drawer, Table, Tooltip, Modal} from "antd";
import style from "../../components/FormComponents/ZoteroSearch/ZoteroItems.module.css";
import { EditOutlined, FolderViewOutlined, DeleteOutlined } from "@ant-design/icons";
import PeopleForm from "../../views/people/PeopleForm/PeopleForm";
import RelatedDocumentTable from "../../components/RelatedDocumentsTable/RelatedDocumentsTable";
import history from "../../utils/history";
import listStyle from './AuthorityList.module.css';
import OrganisationForm from "../../views/organisations/OrganisationForm/OrganisationForm";
import PlaceForm from "../../views/places/PlaceForm/PlaceForm";
import EventForm from "../../views/events/EventForm/EventForm";

const AuthorityList = ({formType, columns, dataKey, serviceClass, ...props}) => {
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerRelatedOpen, setDrawerRelatedOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(undefined);
  const [selectedData, setSelectedData] = useState(undefined);
  const [action, setAction] = useState('view');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    serviceClass.list().then((response) => {
      setData(response.data);
    });
  };

  const onDelete = (id) => {
    const { confirm } = Modal;

    confirm({
      title: `Are you sure you would like to delete this ${formType}?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        serviceClass.delete(id).then((response) => {
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

  const renderUsed = (row) => {
    switch (parseInt(row.used)) {
      case 0:
        return 'N/A';
      case 1:
        return (
          <span className={listStyle.RelatedDocument} onClick={() => onRelatedDrawerOpen(row)}>{row.used} document</span>
        );
      default:
        return (
          <span className={listStyle.RelatedDocument} onClick={() => onRelatedDrawerOpen(row)}>{row.used} documents</span>
        )
    }
  };

  const columnsConfig = [
    {
      title: 'Appears in',
      width: 200,
      ellipsis: false,
      render: renderUsed
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

  const onRelatedDrawerOpen = (row) => {
    setSelectedValue(row.id);
    setSelectedData(row[dataKey]);
    setDrawerRelatedOpen(true);
  };

  const onRelatedDrawerClose = () => {
    setDrawerRelatedOpen(false);
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

  const getForm = () => {
    switch (formType) {
      case 'person':
        return (
          <PeopleForm
            action={action}
            formType={'drawer'}
            recordID={selectedValue}
            onClose={afterFormSubmit}
          />
        );
      case 'organisation':
        return (
          <OrganisationForm
            action={action}
            formType={'drawer'}
            recordID={selectedValue}
            onClose={afterFormSubmit}
          />
        );
      case 'place':
        return (
          <PlaceForm
            action={action}
            formType={'drawer'}
            recordID={selectedValue}
            onClose={afterFormSubmit}
          />
        );
      case 'event':
        return (
          <EventForm
            action={action}
            formType={'drawer'}
            recordID={selectedValue}
            onClose={afterFormSubmit}
          />
        );
      default:
        break;
    }
  };

  return (
    <Col span={24}>
      <Table
        style={{marginTop: '20px'}}
        bordered={true}
        rowKey={record => record.id}
        dataSource={data}
        columns={[...columns, ...columnsConfig]}
        size={'small'}
        footer={getFooter}
      />
      <Drawer
        title={`${action.charAt(0).toUpperCase() + action.slice(1)} ${formType} record`}
        width={'50%'}
        destroyOnClose={true}
        onClose={(e) => onDrawerClose()}
        visible={drawerOpen}
      >
        {getForm()}
      </Drawer>
      <Drawer
        title={`Documents related to '${selectedData}'`}
        width={'50%'}
        destroyOnClose={true}
        onClose={(e) => onRelatedDrawerClose()}
        visible={drawerRelatedOpen}
      >
        <RelatedDocumentTable
          formType={formType}
          recordID={selectedValue}
          onClick={(id) => {
            onRelatedDrawerClose();
            history.push(`/documents/view/${id}`);
          }}
        />
      </Drawer>
    </Col>
  )
};

export default AuthorityList;
