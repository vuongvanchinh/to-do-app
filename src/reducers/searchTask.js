import * as types from '../constants/ActionTypes';



let initialState = ''; // default is not display.

let myReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.SEARCH_TASK:
            return action.keyword;
            
        default: return state;
    }
}

export default myReducer;
