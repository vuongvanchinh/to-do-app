import React, { Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Form extends Component {

  constructor(props) {

    super(props);
    
    this.state={
      id:'',
      name:"",
      status: "active"
    
    };
    
  }
  
  componentDidMount() {
    
    var {taskEditing} = this.props;
    if (taskEditing) {
      this.setState({ 
        id: taskEditing.id,
        name: taskEditing.name,
        status: taskEditing.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps) {
      return;
    }
    var taskEdit = nextProps.taskEditing;
    if (taskEdit) {
      // console.log("edit", taskEdit);
      this.setState({ 
        id: taskEdit.id,
        name: taskEdit.name,
        status: taskEdit.status
      });
    }  else {
      this.setState({
        id: '', 
        name: '',
        status: 'active'
      });
    }
  }


  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.props.taskEditing);
  //   if(prevProps.taskEditing !==this.props.taskEditing && this.props.taskEditing){
  //      this.setState ({
  //       id: this.props.taskEditing.id,
  //       name: this.props.taskEditing.name,
  //       status: this.props.taskEditing.status
  //     });
  //   } else {
     
  //   }

  //  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });

  }
  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.name ==='') {
      return;
    }
    this.props.onSaveTask(this.state);
    this.resetForm();
    this.props.onSetNullEditingTask();
  }
  resetForm = () => {
    this.setState({
      name:'', 
      status:'active'
    });
    
  }

  onCloseForm = () => {
    this.props.onCloseForm();
    this.props.onSetNullEditingTask();
  }

  render() {
    if (!this.props.isDisplayForm) return '';
    
    return (
      
    <div className="card">
      <div className="card-header bg-info">{ this.state.id ? "Update task": "Create new task"}
      <button type="button" className="close" aria-label="Close"
        onClick={ this.onCloseForm }
      >
          <span aria-hidden="true" style={{ color: "white"}}>&times;</span>
      </button>
      </div>
      <div className="card-body">
          <form onSubmit={ this.onSubmit }>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name"
                className="form-control" id="name"
                value={ this.state.name }
                onChange={ this.onChange }
                />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select className="form-control" 
                name="status"id="status"
                value={this.state.status }
                onChange={ this.onChange }
                >
                <option value="active">Active</option>
                <option value="hiden">Hiden</option>
                <option value="complete">Complele</option>
              </select>
            </div>
            <div className="card-footer">
              <button disabled={ this.state.name ===''} type="submit" className="btn btn-primary mr-2">Save</button>
              <button
                  type="reset" 
                  className="btn btn-info mr-2"
                  onClick={ this.resetForm }
                  >Reset</button>
                  
            </div>
          </form>
      </div>
    </div>
     
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing

  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: ()=> {
      dispatch(actions.closeForm());
    },
    onSetNullEditingTask: () => {
      dispatch(actions.setNullTaskEditing());
    }
  }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Form);
