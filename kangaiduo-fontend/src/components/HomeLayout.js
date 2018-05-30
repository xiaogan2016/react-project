import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {//引入路由
  Route,
  Switch,
  NavLink
} from 'react-router-dom'

//读token
import WebStorageCache from 'web-storage-cache';

import AdminTable from './AdminTable';
import UserTable from './UserTable';
import DrugsList from './DrugsList';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Home extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
  render() {
    let wsCache = new WebStorageCache();
    let username = wsCache.get('username');
    return (
      <div>
          <Layout>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className="logo" />
              <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
                <SubMenu
                  key="sub1"
                  title={<span><Icon type="user" /><span className="nav-text">用户管理</span></span>}
                >
                  <Menu.Item key="1"><NavLink to="/home">管理员</NavLink></Menu.Item>
                  <Menu.Item key="2"><NavLink to="/home/user">普通用户</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={<span><Icon type="gift"/><span className="nav-text">药品管理</span></span>}
                >
                  <Menu.Item key="5"><NavLink to="/home/drugslist">药品列表</NavLink></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                    康爱多后台管理系统  <span><Icon type="user" />&nbsp;&nbsp;你好！{username}</span>
              </Header>
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '12px 0' }}>
                  <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                  <Breadcrumb.Item>管理员</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: 500 }}>
                    <Switch>
                      <Route exact path="/home" component={AdminTable} />
                      <Route path="/home/user" component={UserTable} />
                      <Route path="/home/drugslist" component={DrugsList} />
                    </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                ©2010-2016 广东康爱多网上药店版权所有，并保留所有权利
              </Footer>
            </Layout>
          </Layout>
         
      </div>
      
    );
  }
}


export default Home;