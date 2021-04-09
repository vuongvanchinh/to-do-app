import * as types from '../constants/ActionTypes';


export const listAll = () =>{
    return {
        type: types.LIST_ALL
    }
};

export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task
    }
};

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM
    }
};

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM,
    }
};

export const openForm = () => {
    return {
        type: types.OPEN_FORM,
    }
};
export const updateStatus = (id) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        id//id:id
    }
}

export const deleteTask = (id) => {
    return {
        type: types.DELETE_TASK,
        id//id:id
    }
}

export const updateTask = (task) => {
    return {
        type: types.UPDATE_TASK,
        task
    }
}

export const setNullTaskEditing = () => {
    return {
        type: types.SET_NULL_EDIT_TASK,
    }
}

export const filterTaskList = (filter) => {
    return {
        type: types.FILTER_TASK_LIST,
        filter // { filterName, filterStatus }

    }
}

export const searchTask = (keyword) => {
    return {
        type: types.SEARCH_TASK,
        keyword // { filterName, filterStatus }
    }
}

export const sortTask = (sort) => {
    return {
        type: types.SORT_TASK,
        sort // sort: sort
    }
}
