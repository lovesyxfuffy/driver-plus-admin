import http from 'axios';
import logError from './logError';
import gritter from "./gritter";

let exports = {
    get: function (url, callback,failCallback) {
        http.get(url)
            .then((res) => {
                if(res.data.status && res.data.status == 4){
                    gritter.error(res.data.msg);
                    failCallback&&failCallback(res);
                    return ;
                }

                if(res.data.status && res.data.status == 5){
                    failCallback&&failCallback(res);
                    return;
                }
                if(res.data.status && res.data.status !== 1){
                    failCallback&&failCallback(res);
                    gritter.error(res.data.msg);
                    return;
                }
                callback(res);
            })
            .catch(logError);
    },

    post: function (url,data , callback,failCallback) {
        http.post(url, data)
            .then((res) => {

                if(res.data.status && res.data.status == 4){
                    gritter.error(res.data.msg);
                    failCallback&&failCallback(res);
                    return;
                }
                if(res.data.status && res.data.status == 5){
                    failCallback&&failCallback(res);
                    gritter.error(res.data.msg);
                    return;
                }
                if(res.data.status && res.data.status !== 1){
                    failCallback&&failCallback(res);
                    gritter.error(res.data.msg);
                    return;
                }
                callback(res);
            })
            .catch(logError);
    }

};

export const get =  exports.get;
export const post =  exports.post;