import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import { GithubOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import '../../style/homePage.css'
import ReportForm from './ReportForm'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

class HomePage extends Component {

    render() {

        return (
            <Router>
                <Layout>
                    <Header style={{ zIndex: 2 }}>
                        <h1 style={{ align: 'center', color: 'white', fontFamily: '黑体', fontWeight: '900', fontSize: '28px', paddingTop: '5px' }}>
                            乌海市扬尘监控系统
                    </h1>
                    </Header>
                    <Layout>
                        <Sider width='69'>

                            <Menu style={{ height: '840px', width: '70px', background: 'transparent' }}>
                                <Menu.Item>
                                    <Link to="/statics" style={{ color: 'white' }}>统计</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="/casae" style={{ color: 'white' }}>案件</Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link to="/reports" style={{ color: 'white' }}>报告</Link>
                                </Menu.Item>
                                <Menu.Item style={{ color: 'white', position: 'relative', top: '68%' }}>
                                    <GithubOutlined style={{ fontSize: '28px' }} />
                                </Menu.Item>
                                <Menu.Item style={{ color: 'white', position: 'relative', top: '69%', paddingLeft: '19px' }}>
                                    <SettingOutlined style={{ fontSize: '20px' }} />
                                </Menu.Item>
                                <Menu.Item style={{ color: 'white', position: 'relative', top: '70%', paddingLeft: '19px' }}>
                                    <LogoutOutlined style={{ fontSize: '20px' }} />
                                </Menu.Item>
                            </Menu>

                        </Sider>
                        <Content>
                            <div>
                                <Switch>
                                    <Route path='/' component={null} exact />
                                    <Route path='/statics' component={null} />
                                    <Route path='/cases' component={null} />
                                    <Route path='/reports' component={ReportForm} />
                                </Switch>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        )
    }
};

export default HomePage;