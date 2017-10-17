import React from 'react';
import {connect} from 'react-redux'
import {Table} from 'antd';
import {get, post} from '../http/http'
import BreadcrumbCustom from '../BreadcrumbCustom';
import SelectTable from './OrderSelect';
import {Row, Col, Card, Button, Radio, Icon, Menu, Dropdown} from 'antd';
import OrderSearchCondition from './OrderSearchCondition';


const columns = [{
    title: '今日订单统计',
    dataIndex: 'orderCountToday',
    key: 'orderCountToday',
}, {
    title: '今日确认订单',
    dataIndex: 'orderConfirmed',
    key: 'orderConfirmed',
}, {
    title: '今日待确认订单',
    dataIndex: 'orderWaitForConfirmed',
    key: 'orderWaitForConfirmed',
},
    {
        title: '今日取消订单',
        dataIndex: 'orderCanceled',
        key: 'orderCanceled',
    },
    {
        title: '支付总额',
        dataIndex: 'payAmount',
        key: 'payAmount',
    },
    {
        title: '在线支付金额',
        dataIndex: 'onlinePayAmount',
        key: 'onlinePayAmount',
    },
    {
        title: '线下支付金额',
        dataIndex: 'offlinePayAmount',
        key: 'offlinePayAmount',
    }
];

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        console.log(this.props.dispatch.actions.getAction())
    }

    componentDidMount() {
        let actions = this.props.dispatch.actions.getAction()
        post("/manage/order/getStatistic", {}, (res) => {
            actions.getOrderStatistic(res.data.data)
        })


    }

    handleAction(actionStr) {
        let {orderKeys} = this.props.indexReducer;
        let actions = this.props.dispatch.actions.getAction()

        post("/manage/order/" + actionStr, {
                idList: orderKeys
            },
            (res)=> {
                if (res.data.status = 1) {
                    alert("操作成功")
                    post('/manage/order/searchOrderList', {
                        pageNo: 1,
                        pageSize: 20
                    }, (res)=> {
                        actions.getOrderList(res.data.data.content);
                        actions.pageAction(res.data.data.page)
                    })
                }
            }
        )
    }

    render() {
        let actions = this.props.dispatch.actions.getAction();
        let {orderStatistic} = this.props.indexReducer;
        let data = {
            ...(orderStatistic[0]),
            key: 1
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="表格" second="订单列表"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="订单统计" bordered={false}>
                                <Table pagination={false} columns={columns} dataSource={[data]}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="搜索条件" bordered={false}>
                                <OrderSearchCondition />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="订单列表" extra={
                            <div>
                            <Button onClick={()=>this.handleAction("confirm")}>确认</Button>
                            <Button onClick={()=>this.handleAction("cancel")}>取消</Button>
                            <Button >导出</Button>

                            </div>
                            } bordered={false}>
                                <SelectTable {...this.props} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

function select(state) {
    return state
}
export default connect(select)(OrderList)