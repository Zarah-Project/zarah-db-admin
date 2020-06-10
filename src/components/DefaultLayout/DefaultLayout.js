import React, {Suspense} from 'react';
import {Layout, Menu, Row} from 'antd';
import style from './DefaultLayout.module.css';
import BreadcrumbMenu from "../BreadcrumbMenu/BreadcrumbMenu";
import {Link, Route, Switch} from "react-router-dom";
import routes from '../../config/routes';
import UserProfileMenu from "../User/UserProfileMenu/UserProfileMenu";
import logo from '../../assets/image/zarah-logo.png';

const { Header, Content, Footer } = Layout;

const DefaultLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 100, width: '100%', padding: '0 25px' }}>
        <Link to={'/'}>
          <div className={style.Logo}>
            <img alt={'ZARAH'} src={logo}/>
          </div>
        </Link>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to={'/documents'}>Documents</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={'/people'}>People</Link>
            </Menu.Item>
          <Menu.Item key="3">
            <Link to={'/organisations'}>Organisations</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={'/places'}>Places</Link>
          </Menu.Item>
          <UserProfileMenu/>
        </Menu>
      </Header>
      <Content style={{ marginTop: 64 }}>
        <BreadcrumbMenu />
        <div className={style.Content}>
          <Row gutter={[32, 16]}>
            <Suspense fallback={<span>Loading...</span>}>
              <Switch>
                {routes.map((route, idx) => (
                  route.component ?
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      render={(props) => <route.component {...props} action={route.action}/>}
                    /> : null
                ))}
              </Switch>
            </Suspense>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>ZARAH Project © 2020</Footer>
    </Layout>
  )
};

export default DefaultLayout;
