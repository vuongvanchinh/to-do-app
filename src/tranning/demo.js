import { createStore } from 'redux';
import {status, sort} from './actions/index';
import myReducer from './reducers/index';


const store = createStore(myReducer);
//  toggle status.



store.dispatch(status());


store.dispatch(sort({
    by: 'name', value: -1
}));


