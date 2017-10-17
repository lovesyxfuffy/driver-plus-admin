/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Form, Icon, Input, Button,Select } from 'antd';
import {get, post} from '../http/http'

const FormItem = Form.Item;
const Option = Select.Option;



class OrderSearchCondition extends Component {
    componentDidMount() {
        let actions = this.props.dispatch.actions.getAction();
        console.log(actions);
        this.props.form.validateFields();
        post("/manage/order/getClassEnum",{},(res)=>{
            actions.setClassList(res.data.data)
        })
    }
    //TODO condition没进reducer
    onSearchChange(event,type){
        let actions = this.props.dispatch.actions.getAction();
        actions.setStudentCondition(event.target.value,type);
    }
    onSelectChange(value,type){
        let actions = this.props.dispatch.actions.getAction();
        actions.setStudentCondition(value,type);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        let actions = this.props.dispatch.actions.getAction();
        post('/manage/student/getStudentList', this.props.indexReducer.studentSearchCondition, (res)=> {
            actions.setStudentList(res.data.data.content)
        })
    };
    render() {
        let {classList} = this.props.indexReducer;
        let renderClass = [];
        classList.forEach(function(value,index){
            renderClass.push(<Option key={index} value={value.id+""}>{value.name}</Option>)
        });

        // Only show error after a field is touched.
        return (
            <Form layout="inline">
                <FormItem
                >
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} onChange={(event)=>this.onSearchChange(event,"name")} placeholder="学生姓名" />
                </FormItem>
                <FormItem>
                        <Input prefix={<Icon type="credit-card" style={{ fontSize: 13 }} />} onChange={(event)=>this.onSearchChange(event,"idcard")} placeholder="身份证号" />
                </FormItem>
                <FormItem>
                        <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} onChange={(event)=>this.onSearchChange(event,"telephone")} placeholder="电话号码" />
                </FormItem>
                <FormItem>
                        <Select className="icp-selector" placeholder="班型" onChange={(value)=>this.onSelectChange(value,"classType")} style={{width: '160px'}}>
                            {renderClass}
                        </Select>

                </FormItem>

                <FormItem>
                    <Button
                        type="primary"
                        onClick={(event)=>this.handleSubmit(event)}
                    >
                        搜索
                    </Button>
                </FormItem>

            </Form>
        );
    }
}


function select(state) {
    return state
}
export default connect(select)(Form.create()(OrderSearchCondition))