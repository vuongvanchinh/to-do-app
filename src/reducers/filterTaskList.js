import * as types from '../constants/ActionTypes';

let initialState = { filterName:'', filterStatus: 'all'};


let myReducer = (state= initialState, action) => {
    switch (action.type) {
        case types.FILTER_TASK_LIST:
            return state;

        default: return state;

    }
}

export default myReducer;
