/**
 * Created by 叶子 on 2017/7/30.
 */
import {combineReducers} from 'redux';
import * as type from '../action/type';

const initData = {
    orderStatistic: [],
    orderList: [],
    studentList:[],
    page: {
        pageNo: 1,
        pageSize: 10,
        total: 3
    },
    orderKeys: [],
    orderSearchCondition: {
        pageNo: 1,
        pageSize: 10,
    },
    studentSearchCondition:{
        pageNo: 1,
        pageSize: 10,
    },
    classList: [],
    fieldList: []
};

const indexReducer = (state = initData, action) => {
    switch (action.type) {
        case "ORDER_STATISTIC":
            return {
                ...state,
                orderStatistic: [action.data]
            };
        case "ORDER_LIST":
            return {
                ...state,
                orderList: action.data,
                orderKeys: []
            };
        case "PAGE":
            return {
                ...state,
                page: action.data
            };
        case "ORDER_SELECTED":
            return {
                ...state,
                orderKeys: action.data
            };
        case "CLASS_LIST":
            return {
                ...state,
                classList: action.data
            };

        case "FIELD_LIST":
            return {
                ...state,
                fieldList: action.data
            };
        case "SEARCH_CONDITION":
            return {
                ...state,
                orderSearchCondition: {
                    ...state.orderSearchCondition,
                    [action.colName]: action.data
                }
            };
        case "STUDENT_LIST":
            return {
                ...state,
                studentList:action.data
            };
        default:
            return {...state};
    }
};

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.data};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

export default combineReducers({
    httpData, indexReducer
});
