import * as types from '../constants/ActionTypes';
import { findIndex } from 'lodash';

var data = JSON.parse(localStorage.getItem('tasks'));

var initialState = data ? data: [];

var makeid = (length = 5) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const STATUS_CHANGE = {active: 'complete', complete:'hiden', hiden:'active'};

var myReducer = (state = initialState, action) => {
    let index = -1;

    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            // edit

            if (action.task.id) {
                index = findIndex(state, (task) => {
                    return task.id === action.task.id
                });

                if (index !== -1) {
                    state[index] = action.task;
                }
            } else {
                let newTask = {
                    id: makeid(5),
                    name: action.task.name,
                    status: action.task.status
                }
                state = [newTask, ...state];

            }
            
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK:
            index = findIndex(state, (task)=> {
                return task.id === action.id;
            });
            if(index !== -1) {
                state[index] = {
                    ...state[index],
                    status:STATUS_CHANGE[state[index].status]
                }
               
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            index = findIndex(state, (task)=> {
                return task.id === action.id;
            });
            if(index !== -1) {
                state.splice(index, 1);
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        default: return state;
            
    }
    // return state;
}

export default myReducer;
