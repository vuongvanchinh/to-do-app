import React, { Component} from  'react';

class TaskItem extends Component {

  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  }

  statusHandle =(status) => {
    let trust = {
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
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  }
  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  }

  render() {
    var {task, index} = this.props;

    return (

      <tr className="d-flex">
          <td className="col-1" scope="row">{index + 1}</td>
          <td className="col-7">{ task.name }</td>
          <td className="col-2">
            {this.statusHandle(task.status)}
          </td>
          <td className="col-2">
            <button className="btn-ed btn btn-warning "
              style={{marginRight:"5px"}}
              onClick={ this.onUpdate }
            >
            <i className="far fa-edit"></i> Edit
            </button>
            <button 
              onClick={ this.onDelete }
              className="btn-ed btn btn-danger">
              <i className="far fa-trash-alt"></i> DeLete
            </button>
          </td>
      </tr>
    );
  }
}

export default TaskItem;