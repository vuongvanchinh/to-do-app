import * as types from '../constants/ActionTypes';

let initialState = null;

let myReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.UPDATE_TASK:
            return action.task;
        case types.SET_NULL_EDIT_TASK:
            return null;
        default: return state;

    }
}

export default myReducer;
