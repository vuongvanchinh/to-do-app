import * as types from '../constants/ActionTypes';



let initialState = {
                    by:'name',
                    value: 1
                }; // default is not display.

let myReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.SORT_TASK:
            return action.sort;            
        default: return state;
    }
}

export default myReducer;
