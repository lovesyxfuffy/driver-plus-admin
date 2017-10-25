import React from 'react';
import {connect} from 'react-redux'
import {Table} from 'antd';
import {get, post} from '../http/http'
import BreadcrumbCustom from '../BreadcrumbCustom';
import SelectTable from './StudentSelect';
import {Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd';
import StudentSearchCondition from './StudentSearchCondition';

const FormItem = Form.Item;
const Option = Select.Option;


const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class StudentFrom extends React.Component {
    state = {
        confirmDirty: false,
        driverLicenseType: [],
        studentStatus: []
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleInputChange(event, type) {
        let actions = this.props.dispatch.actions.getAction();
        let value = event.target.value;
        actions.changeStudentInfo(value, type);

    }

    handleSelectChange(data, type) {
        let actions = this.props.dispatch.actions.getAction();
        actions.changeStudentInfo(data, type);
    }

    handleSubmit() {
        let id = this.props.params.id;
        let {studentInfoPost} = this.props.indexReducer;

        if (id == null || id == undefined) {
            post("/manage/student/create", studentInfoPost, (data)=> {
                alert("创建成功")
            })
        } else {
            studentInfoPost.id = id;
            post("/manage/student/changeStudentStatus", studentInfoPost, (data)=> {
                alert("更新成功")
            })
        }
    }

    componentDidMount() {
        let actions = this.props.dispatch.actions.getAction();
        post("/manage/order/getTypeEnum", {}, (res)=> {
            console.log(111111);

            console.log(res.data.data);
            this.setState({
                driverLicenseType: res.data.data
            })
        });
        post("/manage/student/getStatusEnum", {}, (res)=> {
            this.setState({
                studentStatus: res.data.data
            })
        });
        post("/manage/student/getInfo/" + this.props.params.id, {}, (res)=> {
            actions.setStudentInfo(res.data.data)
        })

    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        console.log(this.props.params.id);
        let driverLicenseType = this.state.driverLicenseType;
        let studentStatus = this.state.studentStatus;
        let {studentInfo} = this.props.indexReducer;
        let studentStatusKey, driverLicenseTypeKey =["",""];
        let studentStatusOptions = studentStatus.map((value, index)=> {
            if (studentInfo != null && studentInfo != undefined && value.name == studentInfo.statusStr)
                studentStatusKey = value.id+"";
            return (<Option key={value.id+""} value={value.id+""}>{value.name}</Option>)
        });
        let driverLicenseTypeOptions = driverLicenseType.map((value, index)=> {
            if (studentInfo != null && studentInfo != undefined && value.name == studentInfo.classTypeStr)
                driverLicenseTypeKey = value.name+"";
            return <Option key={value.name+""} value={value.name}>{value.name}</Option>
        });
        console.log(studentStatusKey+"   "+driverLicenseTypeKey);
        return (
            //TODO 完成学生信息提交表单
            <div className="gutter-example">
                <BreadcrumbCustom first="表单" second="基础表单"/>
                <Row >
                    <Col className="gutter-row" span={8} offset={8}>
                        <div className="gutter-box">
                            <Card title="编辑表单" bordered={false}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                        <span>
                                            姓名&nbsp;
                                        </span>
                                    )}
                                        hasFeedback
                                    >

                                        <Input onChange={(event)=>this.handleInputChange(event,"name")}
                                               value={studentInfo!=null?studentInfo.name:""}/>
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                        <span>
                                            身份证号&nbsp;
                                        </span>
                                    )}
                                        hasFeedback
                                    >

                                        <Input onChange={(event)=>this.handleInputChange(event,"idcard")}
                                               value={studentInfo!=null?studentInfo.idcard:""}/>

                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                        <span>
                                            手机号&nbsp;
                                        </span>
                                    )}
                                        hasFeedback
                                    >

                                        <Input onChange={(event)=>this.handleInputChange(event,"telephone")}
                                               value={studentInfo!=null?studentInfo.telephone:""}/>

                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                        <span>
                                            驾照类型&nbsp;
                                        </span>
                                    )}
                                    >
                                        {getFieldDecorator('classTypeStr', { initialValue: driverLicenseTypeKey })(
                                            <Select className="icp-selector"
                                                onChange={(value)=>this.onSelectChange(value,"classId")}
                                                style={{width: '160px'}}
                                                onChange={(value)=>this.handleSelectChange(value,"classTypeStr")}
                                        >
                                            {driverLicenseTypeOptions}
                                        </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label={(
                                        <span>
                                            学员状态&nbsp;
                                        </span>)}
                                    >
                                        {getFieldDecorator('status', { initialValue: studentStatusKey })(

                                            <Select className="icp-selector"
                                                onChange={(value)=>this.onSelectChange(value,"classId")}
                                                style={{width: '160px'}}
                                                onChange={(value)=>this.handleSelectChange(value,"status")}
                                        >
                                            {studentStatusOptions}
                                        </Select>
                                        )}

                                    </FormItem>

                                    <FormItem {...tailFormItemLayout}>
                                        <Button size="large" onClick={()=>this.handleSubmit()}>提交</Button>
                                    </FormItem>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const StudentFromAfterCreate = Form.create()(StudentFrom);

function select(state) {
    return state
}
export default connect(select)(StudentFromAfterCreate)