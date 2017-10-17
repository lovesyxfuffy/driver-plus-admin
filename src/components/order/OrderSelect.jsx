/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux'
import {get, post} from '../http/http'

const columns = [{
    title: '支付状态',
    dataIndex: 'payStatusStr',
}, {
    title: '订单状态',
    dataIndex: 'statusStr',
}, {
    title: '学生姓名',
    dataIndex: 'studentName',
},{
    title: '身份证号',
    dataIndex: 'studentIdcard',
},{
    title: '代理人',
    dataIndex: 'refereeName',
},{
    title: '班型',
    dataIndex: 'className',
},{
    title: '场地',
    dataIndex: 'fieldName',
},{
    title: '添加时间',
    dataIndex: 'addTime',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

class SelectTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
    };
    componentDidMount() {
        let actions = this.props.dispatch.actions.getAction()
        post('/manage/order/searchOrderList', this.props.indexReducer.studentSearchCondition, (res)=> {
            actions.getOrderList(res.data.data.content);
            actions.pageAction(res.data.data.page)
        })
    }
    onSelectChange = (selectedRowKeys) => {
        let actions = this.props.dispatch.actions.getAction()
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        actions.selectOrderList(selectedRowKeys)

    };



    render() {
        let {orderList,page,orderKeys} = this.props.indexReducer;
        let actions = this.props.dispatch.actions.getAction()
        const rowSelection = {
            selectedRowKeys:orderKeys,
            onChange: this.onSelectChange,

            onSelection: this.onSelection
        };
        let pagination = {
            onChange: (page, pageSize)=> {
                let actions = this.props.dispatch.actions.getAction();
                actions.setSearchCondition(page,"pageNo")
                post('/manage/order/searchOrderList', this.props.indexReducer.studentSearchCondition, (res)=> {
                    actions.getOrderList(res.data.data.content)
                })
            },
            ...page
        }
        return (
            <Table rowSelection={rowSelection} rowKey="id" pagination={pagination} columns={columns} dataSource={orderList}/>
        );
    }
}

function select(state) {
    return state
}
export default connect(select)(SelectTable)