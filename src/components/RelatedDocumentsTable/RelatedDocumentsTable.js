import React, {useEffect, useState} from 'react';
import document from "../../services/document";
import {Table} from "antd";
import api from "../../services/api";
import style from "./RelatedDocumentsTable.module.css";
import {useDidMountEffect} from "../../utils/useDidMountEffect";
import {initPagination} from "../../utils/tableUtils";

const RelatedDocumentTable = ({formType, recordID, ...props}) => {
  const [params, setParams] = useState({});
  const [pagination, setPagination] = useState(initPagination());
  const [data, setData] = useState([]);

  useEffect(() => {
    if (recordID) {
      switch (formType) {
        case 'person':
          setParams({'people': recordID});
          break;
        case 'organisation':
          setParams({'organisations': recordID});
          break;
        case 'place':
          setParams({'places': recordID});
          break;
        case 'event':
          setParams({'events': recordID});
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidMountEffect(() => {
    const source = api.CancelToken.source();
    fetchData(params, source.token);
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const fetchData = (params) => {
    document.list(params).then((response) => {
      setData(response.data.results);
      setPagination(prevPagination => {
        return {
          ...prevPagination,
          total: response.data.count
        }
      })
    });
  };

  const onClick = (id) => {
    props.onClick(id);
  };

  const renderTitle = (row) => {
    return (
      <span
        onClick={() => onClick(row.id)}
        className={style.Title}
      >
        {row.title}
      </span>
    )
  };

  const columns = [
    {
      title: 'Title',
      key: 'title',
      ellipsis: false,
      sorter: true,
      render: renderTitle
    }, {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      width: 120
    }
  ];

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
    <Table
      bordered={true}
      rowKey={record => record.id}
      dataSource={data}
      columns={columns}
      size={'small'}
      pagination={pagination}
      onChange={handleTableChange}
    />
  )
};

export default RelatedDocumentTable;
