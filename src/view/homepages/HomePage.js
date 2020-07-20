import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { GithubOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import '../../style/homePage.css'
import ReportForm from './ReportForm'
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuKey:''
        }
    }

    componentDidMount(){
        let a = window.location.hash
        if (a ==='#/statics') {
            this.setState({menuKey:'1'})
        }
        else if (a === '#/cases' ){
            this.setState({ menuKey: '2' })
        }
        else if (a === '#/reports') {
            this.setState({ menuKey: '3' })
        }
    }

    keyChange=(e)=>{
        this.setState({
            menuKey:e.key
        })
    }

    render() {
        const {menuKey} = this.state

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
                            <Menu style={{ height: '880px', width: '70px', background: 'transparent' }} selectedKeys={menuKey} >
                                <Menu.Item key='1' onClick={this.keyChange}>
                                    <Link to="/statics" style={{ color: 'white' }}>统计</Link>
                                </Menu.Item>
                                <Menu.Item key='2' onClick={this.keyChange}>
                                    <Link to="/cases" style={{ color: 'white' }}>案件</Link>
                                </Menu.Item>
                                <Menu.Item key='3' onClick={this.keyChange}>
                                    <Link to="/reports" style={{ color: 'white' }}>报告</Link>
                                </Menu.Item>
                                <Menu.Item key='4' style={{ color: 'white', position: 'relative', top: '65%' }}>
                                    <GithubOutlined style={{ fontSize: '28px',paddingTop:'6px' }} />
                                </Menu.Item>
                                <Menu.Item key='5' style={{ color: 'white', position: 'relative', top: '66%', paddingLeft: '19px' }}>
                                    <SettingOutlined style={{ fontSize: '20px', paddingTop: '10px' }} />
                                </Menu.Item>
                                <Menu.Item key='6' style={{ color: 'white', position: 'relative', top: '67%', paddingLeft: '19px' }}>
                                    <LogoutOutlined style={{ fontSize: '20px', paddingTop: '10px' }} />
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