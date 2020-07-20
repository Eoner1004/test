import React, { Component } from 'react';
import { Form, Input, Drawer, Button, PageHeader, Pagination, DatePicker, Radio, Row, Col, Divider } from 'antd';
import alarmdata from '../../script/alarmdata';
import filterResults from '../../script/filterResults'
import '../../style/reportForm.css';
import { StarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment'
import qs from 'qs';
const { RangePicker } = DatePicker;

class ReportForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            currPage: 1,
            data: []
        }
    }

    componentDidMount() {
        let newdata = filterResults;
        let page = this.state.currPage;
        let dataSlice = newdata.slice((page - 1) * 15, page * 15);
        this.setState({ data: dataSlice })
    }

    showDrawer = () => {
        this.setState({ visible: true });
    };

    onClose = () => {
        this.setState({ visible: false });
    };

    onFinish = (values) => {
        let a = moment(values.period[0]).format('YYYY-MM-DD')
        let b = moment(values.period[1]).format('YYYY-MM-DD')
        let formData=values;
        formData.startDate=a;
        formData.endDate=b;
        console.log(formData)

        let formatDta = qs.stringify(formData)
        console.log(formatDta)
    }

    pageChange = (page) => {
        let newdata = filterResults;
        let dataSlice = newdata.slice((page - 1) * 10, page * 10)

        this.setState({
            data: dataSlice,
            currPage: page
        })
    }

    back = () => {
        this.props.history.push('/')
    }

    render() {
        const { visible, data } = this.state;
        let area = alarmdata.alarmArea
        let industry = alarmdata.industry
        let level = alarmdata.alarmLevel
        let dataTotal = filterResults.length

        return (
            <div style={{ backgroundImage: "url(" + require("../../public/bgpic.jpg") + ")" }}>
                <div className='formZone'>
                    <Form onFinish={this.onFinish}>
                        <div style={{paddingTop:'20px',paddingLeft:'16px'}}>
                            <ArrowLeftOutlined style={{ float: 'left', fontSize: '16px' }} onClick={this.back}/>
                            <p style={{float:'left',marginLeft:'8px',marginBottom:'8px',paddingBottom:'8px'}}>生成报告</p>
                        </div>
                        <Divider style={{ margin: '8px' }} />
                        <h4>查询案件：</h4>
                        <Form.Item label='告警企业' name='company'>
                            <Input placeholder='请输入企业名称搜索'></Input>
                        </Form.Item>
                        <Form.Item label='告警时间' name='period'>
                            <RangePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label='告警地区' name='area'>
                            <Radio.Group>
                                {
                                    area.map((it) => {
                                        return (
                                            <Radio.Button style={{ marginRight: '10px', borderRadius: '5px', width: '88px' }} key={it.id} value={it.area}>{it.area}</Radio.Button>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;行业' name='industry'>
                            <Radio.Group>
                                {
                                    industry.map((it) => {
                                        return (
                                            <Radio.Button style={{ marginRight: '10px', borderRadius: '5px', width: '88px' }} key={it.id} value={it.industry}>{it.industry}</Radio.Button>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label='告警级别' name='level'>
                            <Radio.Group>
                                {
                                    level.map((it) => {
                                        return (
                                            <Radio.Button style={{ marginRight: '10px', borderRadius: '5px', width: '88px' }} key={it.id} value={it.level}>{it.level}</Radio.Button>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label='告警点位' name='position'>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={this.showDrawer} style={{ width: '98px', height: '40px', marginTop: '20px', position: 'relative', left: '32%', background: '#2773E5', borderColor: '#2773E5', borderRadius: '5px' }}>
                                查询
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                    maskStyle={{ background: 'transparent' }}
                    width='500'
                    zIndex='1'
                    style={{ marginTop: '30px' }}
                >
                    <PageHeader>
                        <div className='drawerheader'>
                            <p style={{ float: 'left', padding: '6px' }}>筛选结果</p>
                            <Button type="primary" style={{ position: 'relative', left: '60%', borderRadius: '5px', background: '#2773E5', borderColor:'#2773E5' }}>生成报告</Button>
                        </div>
                    </PageHeader>
                    <Divider style={{ margin: '12px' }} />
                    <div className='caseheader'>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
                            <Col className="gutter-row" span={6}>
                                <div>案件点</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div>监测时间</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div>告警点</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div>告警级别</div>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ height: '650px', overflowY: 'auto', overflowX: 'hidden'}}>
                       
                            {
                                data.map((it) => {
                                    return (
                                        <div className='casewrapper' key={it.id}>
                                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}>
                                                <Col className="gutter-row" span={6}>
                                                    <div style={{ fontWeight: 'bold' }}>{it.name}</div>
                                                </Col>
                                                <Col className="gutter-row" span={6}>
                                                    <div className='pWrapper'>
                                                        <p>{it.date}</p>
                                                        <p>{it.time}</p>
                                                    </div>
                                                </Col>
                                                <Col className="gutter-row" span={6}>
                                                    <div>{it.location}</div>
                                                </Col>
                                                <Col className="gutter-row" span={6}>
                                                    <div className='pWrapper'>
                                                        <p style={{ textAlign: 'center' }}>{it.level}</p>
                                                        {it.levelnum === 1 ? (
                                                            <div style={{ textAlign: 'center' }}><StarOutlined style={{ color: '#F09835' }} />
                                                                <StarOutlined />
                                                                <StarOutlined /></div>) :
                                                            (it.levelnum === 2 ? (<div style={{ textAlign: 'center' }}><StarOutlined style={{ color: '#F09835' }} />
                                                                <StarOutlined style={{ color: '#F09835' }} />
                                                                <StarOutlined /></div>) :
                                                                (<div style={{ textAlign: 'center' }}><StarOutlined style={{ color: '#F09835' }} />
                                                                    <StarOutlined style={{ color: '#F09835' }} />
                                                                    <StarOutlined style={{ color: '#F09835' }} /></div>))
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }                        
                    </div>
                    <Pagination
                        defaultCurrent={1}
                        total={dataTotal}
                        showTotal={(total) => `总共 ${total} 个案件`}
                        onChange={this.pageChange}
                        style={{ position: 'fixed', top: '93%' }}
                    />
                </Drawer>
            </div>

        )
    }
};

export default ReportForm;