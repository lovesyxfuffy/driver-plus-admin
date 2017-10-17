/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Table} from 'antd';
import {connect} from 'react-redux'
import { Link } from 'react-router';
import {get, post} from '../http/http'

const columns = [{
    title: '学生姓名',
    dataIndex: 'name',
}, {
    title: '身份证号',
    dataIndex: 'idcard',
}, {
    title: '手机号',
    dataIndex: 'telephone',
}, {
    title: '驾照类型',
    dataIndex: 'classTypeStr',
},{
    title: '操作', dataIndex: '',
    key: 'id', render: (text,record) => <Link to={"/student/edit/"+record.key}>编辑</Link>}];

class SelectTable extends React.Component {
    state = {
        selectedRowKeys: []  // Check here to configure the default column
    };

    componentDidMount() {
        let actions = this.props.dispatch.actions.getAction();
        post('/manage/student/getStudentList', this.props.indexReducer.orderSearchCondition, (res)=> {
            actions.setStudentList(res.data.data.content);
            actions.pageAction(res.data.data.page)
        })
    }

    onSelectChange = (selectedRowKeys) => {
        let actions = this.props.dispatch.actions.getAction();
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        actions.selectOrderList(selectedRowKeys)

    };


    render() {
        let {studentList, page, orderKeys} = this.props.indexReducer;
        const rowSelection = {
            selectedRowKeys: orderKeys,
            onChange: this.onSelectChange,

            onSelection: this.onSelection
        };
        let pagination = {
            onChange: (page, pageSize)=> {
                let actions = this.props.dispatch.actions.getAction();
                actions.setStudentCondition(page, "pageNo");
                post('/manage/student/getStudentList', this.props.indexReducer.studentSearchCondition, (res)=> {
                    actions.setStudentList(res.data.data.content)
                })
            },
            ...page
        };
        return (
            <Table rowSelection={rowSelection} rowKey="id" pagination={pagination} columns={columns}
                   dataSource={studentList}/>
        );
    }
}

function select(state) {
    return state
}
export default connect(select)(SelectTable)