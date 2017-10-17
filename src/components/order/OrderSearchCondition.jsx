/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Form, Icon, Input, Button,Select } from 'antd';
import {get, post} from '../http/http'

const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class OrderSearchCondition extends Component {
    componentDidMount() {
        let actions = this.props.dispatch.actions.getAction();
        console.log(actions);
        this.props.form.validateFields();
        post("/manage/order/getFieldEnum",{},(res)=>{
            actions.setFieldList(res.data.data)
        });
        post("/manage/order/getClassEnum",{},(res)=>{
            actions.setClassList(res.data.data)
        })
    }
    onSearchChange(event,type){
        let actions = this.props.dispatch.actions.getAction();
        actions.setSearchCondition(event.target.value,type);
        console.log(this.props.indexReducer.orderSearchCondition)
    }
    onSelectChange(value,type){
        let actions = this.props.dispatch.actions.getAction();
        actions.setSearchCondition(value,type);
        console.log(this.props.indexReducer.orderSearchCondition)

    }
    handleSubmit = (e) => {
        e.preventDefault();
        let actions = this.props.dispatch.actions.getAction();
        post('/manage/order/searchOrderList', this.props.indexReducer.orderSearchCondition, (res)=> {
            actions.getOrderList(res.data.data.content)
        })
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        let {classList,fieldList} = this.props.indexReducer;
        console.log(fieldList);
        let renderClass = [];
        let renderField = [];
        classList.forEach(function(value,index){
            renderClass.push(<Option key={index} value={value.id+""}>{value.name}</Option>)
        });
        fieldList.forEach((value,index)=>{
            renderField.push(<Option key={index} value={value.id+""}>{value.name}</Option>)
        });
        // Only show error after a field is touched.
        return (
            <Form layout="inline">
                <FormItem
                >
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} onChange={(event)=>this.onSearchChange(event,"studentName")} placeholder="学生姓名" />
                </FormItem>
                <FormItem>
                        <Input prefix={<Icon type="credit-card" style={{ fontSize: 13 }} />} onChange={(event)=>this.onSearchChange(event,"studentIdcard")} placeholder="身份证号" />
                </FormItem>
                <FormItem>
                        <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} onChange={(event)=>this.onSearchChange(event,"telephone")} placeholder="电话号码" />
                </FormItem>
                <FormItem>
                        <Select className="icp-selector" placeholder="班型" onChange={(value)=>this.onSelectChange(value,"fieldId")} style={{width: '160px'}}>
                            {renderClass}
                        </Select>

                </FormItem>
                <FormItem>
                        <Select placeholder="场地" className="icp-selector" onChange={(value)=>this.onSelectChange(value,"classId")}  style={{width: '160px'}}>
                            {renderField}
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