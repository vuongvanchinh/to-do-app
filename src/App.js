import React, { Component} from 'react';

import './App.css';
import Control from './components/Control';
import Form from './components/Form';
import TaskList from './components/TaskList';
import { connect} from 'react-redux';
import * as actions from './actions/index';

// import demo from './tranning/demo';

class App extends Component {
 
  onToggleForm = () => {
    if (this.props.taskEditing.id) {
      this.props.onSetNullEditingTask();
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
  }

  render() {
    let { isDisplayForm } = this.props;

    return (
      <div className="container-fluid" style={{marginTop:"20px"}}>
        <h1 className="text-center">TO DO APP</h1>

        <div className="row">
          <div className={ isDisplayForm ? "col-sm-4 col-md-4 col-lg-4 col-xl-4":"w-0" }
            style ={{ transition:"all 1s"}}>
            <Form />
          </div>
          <div className={ isDisplayForm ? "col-sm-8 col-md-8 col-lg-8 col-xl-8" : 
                            "col-sm-12 col-md-12 col-lg-12 col-xl-12"}>
              <button 
                className="btn btn-primary  mr-5"
                onClick={this.onToggleForm }>                
                <span className="fa fa-plus"></span>Add new task
              </button>
              <Control/>
              <TaskList/>
          </div>
        </div>
      </div>
    );;
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing,
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onOpenForm: () => {
      return dispatch(actions.openForm());
    },
    onSetNullEditingTask: () => {
      dispatch(actions.setNullTaskEditing());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
