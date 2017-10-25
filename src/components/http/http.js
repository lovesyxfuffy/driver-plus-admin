import http from 'axios';
import logError from './logError';

let exports = {
    get: function (url, callback,failCallback) {
        http.get(url)
            .then((res) => {
                if(res.data.status && res.data.status == 4){
                    failCallback&&failCallback(res);
                    return ;
                }

                if(res.data.status && res.data.status == 5){
                    failCallback&&failCallback(res);
                    return;
                }
                if(res.data.status && res.data.status !== 1){
                    failCallback&&failCallback(res);
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
                    failCallback&&failCallback(res);
                    return;
                }
                if(res.data.status && res.data.status == 5){
                    failCallback&&failCallback(res);
                    return;
                }
                if(res.data.status && res.data.status !== 1){
                    failCallback&&failCallback(res);
                    return;
                }
                callback(res);
            })
            .catch(logError);
    }

};

export const get =  exports.get;
export const post =  exports.post;