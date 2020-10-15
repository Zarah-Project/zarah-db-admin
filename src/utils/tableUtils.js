export const initPagination = () => {
  return {
    showQuickJumper: true,
    showSizeChanger: true,
    total: 0,
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    showTotal: (total, range) => {return `${range[0]}-${range[1]} of ${total} items`}
  }
};

export const loadSorter = (sorter) => {
  const {columnKey, order, column} = sorter;
  if (columnKey && column) {
    if (column.hasOwnProperty('sortKeys')) {
      return {ordering: order === 'ascend' ? `${column.sortKeys.join(',')}` : `-${column.sortKeys.join(',')}`}
    } else {
      return {ordering: order === 'ascend' ? `${columnKey}` : `-${columnKey}`}
    }
  }
};

export const loadPagination = (pagination) => {
  const {pageSize, current} = pagination;
  return {
    limit: pageSize ? pageSize : 10,
    offset: current ? (current - 1) * pageSize : 0
  }
};
