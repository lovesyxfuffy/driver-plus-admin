import React from 'react';
import {connect} from 'react-redux'
import {Table} from 'antd';
import {get, post} from '../http/http'
import BreadcrumbCustom from '../BreadcrumbCustom';
import SelectTable from './StudentSelect';
import {Row, Col, Card, Button, Radio, Icon, Menu, Dropdown} from 'antd';
import StudentSearchCondition from './StudentSearchCondition';




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
export default connect(select)(StudentSelect)