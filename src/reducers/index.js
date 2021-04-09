import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
// import filter from './filterTaskList';
import search from './searchTask';
import sort from './sortTask';

const myReducer = combineReducers ({
    tasks, // tasks: tasks
    isDisplayForm,
    taskEditing,
    // filter,
    search,
    sort
    
});

export default myReducer;
