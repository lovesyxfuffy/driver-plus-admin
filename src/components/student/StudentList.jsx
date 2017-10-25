import React from 'react';
import {connect} from 'react-redux'
import {Table} from 'antd';
import {get, post} from '../http/http'
import BreadcrumbCustom from '../BreadcrumbCustom';
import SelectTable from './StudentSelect';
import {Row, Col, Card, message, Form, Upload, Button, Radio, Icon, Menu, Dropdown} from 'antd';
import StudentSearchCondition from './StudentSearchCondition';

const FormItem = Form.Item;

class StudentSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        console.log(this.props.dispatch.actions.getAction())
    }

    componentDidMount() {
        
    }


    render() {
        let actions = this.props.dispatch.actions.getAction();
        let {orderStatistic} = this.props.indexReducer;
        let data = {
            ...(orderStatistic[0]),
            key: 1
        };
        const uploadProps = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            defaultFileList:{}
        };

        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="表格" second="订单列表"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="搜索条件" bordered={false}>
                                <StudentSearchCondition />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="学生列表" extra={
                            <div>
                            <Button >创建</Button>
                            <Button >导出</Button>
                            <Upload props={uploadProps}>
                                <Button>
                                  <Icon type="upload" /> 导入
                                </Button>
                            </Upload>
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
export default connect(select)(StudentSelect)