/**
 * Created by 叶子 on 2017/7/30.
 */
import * as type from './type';
import * as http from '../axios/index';

const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};

export const getOrderStatistic = (data)=>({
    type: "ORDER_STATISTIC",
    data: data
});

export const getOrderList = (data)=>({
    type: "ORDER_LIST",
    data: data
});

export const pageAction = (data)=>({
    type: "PAGE",
    data: data
});

export const selectOrderList = (data)=>({
    type: "ORDER_SELECTED",
    data: data
});

export const setFieldList = (data)=>({
    type: "FIELD_LIST",
    data: data
});

export const setClassList = (data)=>({
    type: "CLASS_LIST",
    data: data
});

export const setSearchCondition = (data, colName)=>({
    type: "SEARCH_CONDITION",
    data: data,
    colName: colName
});

export const setStudentCondition = (data, colName)=>({
    type: "STUDENT_SEARCH_CONDITION",
    data: data,
    colName: colName
});

export const setStudentList = (data)=>({
    type: "STUDENT_LIST",
    data: data
})