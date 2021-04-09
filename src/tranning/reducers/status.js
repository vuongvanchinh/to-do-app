import {TOGGLE_STATUS} from '../constants/ActionTypes';

var initialState = false;

var myReducer = (state=initialState, action) => {
    if(action.type == TOGGLE_STATUS) {
        state = !state;
    }
    return state;
}

export default myReducer;
