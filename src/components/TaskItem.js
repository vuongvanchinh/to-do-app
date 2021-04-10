import React, { Component} from  'react';
import { connect} from 'react-redux';
import * as actions from '../actions/index';


class TaskItem extends Component {

  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id)
  }

  statusHandle =(status) => {
    const trust = {
      active:{title:"Active", class:"badge badge-info"}, 
      hiden:{title:"Hiden", class:"badge badge-danger"},
      complete:{title:"Completed", class:"badge badge-success"},
    }
    let info = trust[status];
    
    return <span
      style = {{cursor: "pointer"}} 
      onClick={ this.onUpdateStatus } 
      className={info.class}>{ info.title }</span>
    
  }

  onDeleteTask = () => {
    this.props.onDeleteTask(this.props.task.id);
    this.props.onSetNullTaskEditing();
    this.props.onCloseForm();

  }
  
  onUpdateTask = () => {
    this.props.onOpenForm();
    this.props.onUpdateTask(this.props.task);
  }

  render() {
    var {task, index} = this.props;

    return (

      <tr className="d-flex">
          <td className="col-sm-2 col-md-1" >{index + 1}</td>
          <td className="col-sm-6 col-md-7">{ task.name }</td>
          <td className="col-sm-2 col-md-2">
            {this.statusHandle(task.status)}
          </td>
          <td className="col-sm-2 col-md-2" style = {{padding:"5px"}}>
            <button className="btn-ed btn btn-warning "
              style={{marginRight:"5px"}}
              onClick={ this.onUpdateTask }
            >
            <i className="far fa-edit"></i> Edit
            </button>
            <button 
              onClick={ this.onDeleteTask }
              className="btn-ed btn btn-danger">
              <i className="far fa-trash-alt"></i> Delete
            </button>
          </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus : (id) => {
      return dispatch(actions.updateStatus(id));
    },
    onDeleteTask: (id) => {
      return dispatch(actions.deleteTask(id));
    },
    onCloseForm: ()=> {
      return dispatch(actions.closeForm());
    },
    onOpenForm: () => {
      return dispatch(actions.openForm());
    },
    onUpdateTask: (task) => {
      return dispatch(actions.updateTask(task));
    },
    onSetNullTaskEditing: () => {
      return dispatch(actions.setNullTaskEditing());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (TaskItem);