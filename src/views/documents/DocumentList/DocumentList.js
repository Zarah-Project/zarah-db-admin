import React, {useState, useEffect} from 'react';
import {Badge, Button, Col, Input, Modal, Row, Table, Tooltip} from "antd";
import style from "../../../components/FormComponents/ZoteroSearch/ZoteroItems.module.css";
import api from '../../../services/api';
import document from '../../../services/document';
import { CopyOutlined, EditOutlined, FolderViewOutlined, DeleteOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";
import history from "../../../utils/history";
import searchStyle from './DocumentList.module.css';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import setTableSorter from "../../../store/actions/setTableSorter";
import setTablePagination from "../../../store/actions/setTablePagination";
import setTableTotal from "../../../store/actions/setTableTotal";
import {initPagination, loadPagination, loadSorter} from "../../../utils/tableUtils";
import setTableSearch from "../../../store/actions/setTableSearch";
import { FlagTwoTone } from '@ant-design/icons';

const DocumentList = () => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [data, setData] = useState([]);

  // Redux Hooks
  const tableProps = useSelector(state => state.tableSettings['documents'], shallowEqual);
  const dispatch = useDispatch();

  const { Search } = Input;

  // componentDidMount
  useEffect(() => {
    if (tableProps) {
      setParams(loadParamsFromRedux(tableProps));
    } else {
      dispatch(setTableSorter({}, 'documents'));
      dispatch(setTablePagination(initPagination(), 'documents'));
      setParams({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const source = api.CancelToken.source();
    fetchData(params, source.token);
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const fetchData = (params, cancelToken) => {
    setLoading(true);
    document.search(params, cancelToken).then((response) => {
      setLoading(false);
      dispatch(setTableTotal(response.data.count, 'documents'));
      setData(response.data.results);
    }).catch(error => {
      setLoading(false);
    })
  };

  const onDelete = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to delete this document?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        document.delete(id).then((response) => {
          fetchData();
        })
      }
    });
  };

  const handleClone = (id) => {
    const { confirm } = Modal;

    confirm({
      title: 'Are you sure you would like to clone this document?',
      okText: 'Yes',
      okType: 'warning',
      cancelText: 'No',
      onOk() {
        document.clone(id).then((response) => {
          fetchData();
        })
      }
    });
  };

  const renderPrivacy = (text) => {
    switch (text) {
      case 'default':
        return (
          <div style={{textAlign: 'center'}}>
            <FlagTwoTone twoToneColor={'#45a321'}/>
          </div>
        );
      case 'team':
        return (
          <div style={{textAlign: 'center'}}>
            <FlagTwoTone twoToneColor={'#c8b800'}/>
          </div>
        );
      case 'individual':
        return (
          <div style={{textAlign: 'center'}}>
            <FlagTwoTone twoToneColor={'#ed4600'}/>
          </div>
        );
      default:
        break;
    }
  };

  const renderActionButtons = (row) => {
    return (
      <React.Fragment>
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
          {
            row.is_editable &&
            <Tooltip title={'Delete Record'}>
              <Button size="small" icon={<DeleteOutlined/>} onClick={() => onDelete(row.id)}/>
            </Tooltip>
          }
        </Button.Group>
        <Tooltip title={'Clone'}>
          <Button size="small" icon={<CopyOutlined/>} style={{marginLeft: '15px'}} onClick={() => handleClone(row.id)}/>
        </Tooltip>
      </React.Fragment>
    )
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: false,
      sorter: true,
      sortKeys: ['title_sort'],
    }, {
      title: 'Item Type',
      dataIndex: 'item_type',
      key: 'item_type',
      sorter: true
    }, {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      sorter: true
    }, {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: true,
      sortKeys: ['date_sort'],
    }, {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 120,
      sorter: true,
      sortKeys: ['created_by_sort', 'title_sort']
    }, {
      title: 'Actions',
      render: renderActionButtons,
      width: 130,
      className: style.ActionColumn
    }, {
      title: 'Meta',
      render: renderPrivacy,
      dataIndex: 'metadata_privacy',
      key: 'metadata_privacy',
    }, {
      title: 'PDF',
      render: renderPrivacy,
      dataIndex: 'document_privacy',
      key: 'document_privacy',
    }
  ];

  const getCreateEmptyButton = () => {
    const clickCreateEmpty = () => {
      localStorage.removeItem('document-create-form');
      history.push('/documents/create');
    };

    if (localStorage.hasOwnProperty('document-create-form')) {
      return (
        <Button
          type={'secondary'}
          style={{marginLeft: '10px'}}
          onClick={clickCreateEmpty}
        >
          Create Empty
        </Button>
      )
    }
  };

  const getFooter = () => (
    <React.Fragment>
      <Link to={'/documents/create'}>
        <Button
          type={'primary'}
        >
          Create
        </Button>
      </Link>
      {getCreateEmptyButton()}
    </React.Fragment>
  );

  const loadParamsFromRedux = (tableProps) => {
    let paginationParams, sorterParams, searchParams;

    // Load pagination from redux
    paginationParams = loadPagination(tableProps['pagination']);

    // Load sorting from redux
    sorterParams = loadSorter(tableProps['sorter']);

    // Load search from redux
    searchParams = tableProps ? {query: tableProps['search']} : {};

    // Load filters from redux
    const filterParams = tableProps['filter'];
    return Object.assign({}, filterParams, paginationParams, sorterParams, searchParams);
  };

  const handleSearch = (value) => {
    if (value) {
      setParams(Object.assign({}, params, {'query': value}));
    } else {
      setParams({});
    }
    dispatch(setTableSearch(value, 'documents'))
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let paginationParams, sorterParams = {};

    // Pagination
    const {current} = pagination;
    if (current) {
      paginationParams = loadPagination(pagination);
      dispatch(setTablePagination(pagination, 'documents'));
    }

    // Sorting
    // loadColumns(sorter);
    if (Object.entries(sorter).length > 0) {
      const {columnKey} = sorter;
      if (columnKey) {
        sorterParams = loadSorter(sorter);
        dispatch(setTableSorter(sorter, 'documents'));
      }
    } else {
      dispatch(setTableSorter({}, 'documents'));
    }

    setParams(Object.assign({}, params, paginationParams, sorterParams))
  };

  return (
    <Col span={24}>
      <div className={searchStyle.SearchBox}>
        <Row>
          <Col span={24}>
            <Search
              placeholder="Search..."
              onSearch={handleSearch}
              defaultValue={tableProps ? tableProps['search'] : undefined}
              allowClear
              enterButton
            />
          </Col>
        </Row>
      </div>
      <Table
        style={{marginTop: '20px'}}
        bordered={true}
        rowKey={record => record.id}
        dataSource={data}
        columns={columns}
        loading={loading}
        size={'small'}
        pagination={tableProps ? tableProps['pagination'] : {}}
        onChange={handleTableChange}
        footer={getFooter}
      />
    </Col>
  )
};

export default DocumentList;
