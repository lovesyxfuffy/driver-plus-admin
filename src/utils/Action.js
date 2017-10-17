import * as catActions from '../action/index'
import {bindActionCreators} from 'redux';

export default class Action {
    constructor(dispatch) {
        this.actions = null
        this.dispatch = dispatch
    }

    getAction() {
        let {actions} = this
        if (actions == null) {
            this.actions = bindActionCreators(catActions, this.dispatch)
        }
        return this.actions

    }
}