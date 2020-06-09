import React, {useState, useEffect} from 'react';
import {Button, Col, Input, Row, Switch, Table, Tooltip} from "antd";
import style from "../../../components/FormComponents/ZoteroSearch/ZoteroItems.module.css";
import api from '../../../services/api';
import document from '../../../services/document';
import { EditOutlined, FolderViewOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";
import searchStyle from './DocumentList.module.css';

const DocumentList = () => {
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});
  const [data, setData] = useState([]);

  const { Search } = Input;

  useEffect(() => {
    const source = api.CancelToken.source();
    fetchData(params, source.token);
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const fetchData = (params, cancelToken) => {
    document.search(params, cancelToken).then((response) => {
      setLoading(false);
      setData(response.data.results);
    }).catch(error => {
      setLoading(false);
    })
  };

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
      sorter: true,
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

  const handleSearch = (value) => {
    setLoading(true);

    if (value) {
      setParams(Object.assign({}, params, {'query': value}));
    } else {
      setParams({});
    }
  };

  const loadSorter = (sorter) => {
    const {columnKey, order, column} = sorter;
    if (columnKey && column) {
      if (column.hasOwnProperty('sortKeys')) {
        return {ordering: order === 'ascend' ? `${column.sortKeys.join(',')}` : `-${column.sortKeys.join(',')}`}
      } else {
        return {ordering: order === 'ascend' ? `${columnKey}` : `-${columnKey}`}
      }
    }
  };

  const loadPagination = (pagination) => {
    const {pageSize, current} = pagination;
    return {
      limit: pageSize,
      offset: (current - 1) * pageSize
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let paginationParams, sorterParams = {};

    // Pagination
    const {current} = pagination;
    if (current) {
      paginationParams = loadPagination(pagination);
    }

    // Sorting
    if (Object.entries(sorter).length > 0) {
      const {columnKey} = sorter;
      if (columnKey) {
        sorterParams = loadSorter(sorter);
      }
    } else {
      sorterParams = {};
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
              loading={loading}
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
        size={'small'}
        onChange={handleTableChange}
        footer={getFooter}
      />
    </Col>
  )
};

export default DocumentList;
