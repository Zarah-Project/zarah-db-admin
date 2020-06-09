import {Breadcrumb} from "antd";
import React from "react";
import {withRouter} from "react-router-dom";

const breadcrumbs = {
  '/documents': ['Documents'],
  '/documents/view': ['Documents', 'View'],
  '/documents/edit': ['Documents', 'Edit'],
  '/documents/create': ['Documents', 'Create'],
  '/people': ['People'],
  '/organisations': ['Organisations'],
  '/places': ['Places']
};

const BreadcrumbMenu = (props) => {
  const { location } = props;
  let path = location.pathname;

  if (path.split('/').length > 2) {
    path = path.substring(0, path.lastIndexOf('/'))
  }

  const renderBreadcrumbItem = () => {
    if (breadcrumbs.hasOwnProperty(path)) {
      return breadcrumbs[path].map((breadcrumb, idx) => (
        <Breadcrumb.Item key={idx}>{breadcrumb}</Breadcrumb.Item>
      ))
    } else {
      return ''
    }
  };

  return (
    <Breadcrumb style={{ margin: '16px 0', padding: '0 24px' }}>
      {renderBreadcrumbItem()}
    </Breadcrumb>
  )
};

export default withRouter(BreadcrumbMenu);
