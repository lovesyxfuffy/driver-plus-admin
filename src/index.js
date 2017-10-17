import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/lib/animate.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

import CRouter from './routes';
import Action from "./utils/Action";


// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));
console.log(store.getState());

class Main extends React.Component {

    constructor(props) {
        super(props)
        store.dispatch.actions = new Action(store.dispatch)
    }

    render() {
        return (
            <Provider store={store}>
                <CRouter store={store} />
            </Provider>
        )
    }
}
ReactDOM.render(<Main />, document.getElementById('root')); //使用组件并渲染到界面

registerServiceWorker();