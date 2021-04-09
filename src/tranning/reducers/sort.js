import {SORT} from '../constants/ActionTypes';

var initialState = {by: 'name', value: 1};

var myReducer = (state=initialState, action) => {

    if(action.type === SORT) {
        let {by, value} = action.sort;
        
        return {
                by: by,
                value: value
            }
        
    }
    return state;
}

export default myReducer;
