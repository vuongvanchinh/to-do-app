import React, { Component} from  'react';
import TaskItem from './TaskItem';

class TaskList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterName : '',
      filterStatus  : "all"
    };
  }
  
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });

  }

  render() {
    var {tasks} = this.props;
    
   
    var elems = tasks.map((task, index) => {
      var rs = '';
      var {filterStatus, filterName} = this.state;

      if (filterStatus === "all" || filterStatus === task.status) {
        if (filterName === '' || task.name.toLowerCase().indexOf(filterName.toLowerCase().trim()) !== -1 ) {
          return <TaskItem key={task.id} 
            task={task} index={index}
            onDelete = { this.props.onDelete }
            onUpdate = { this.props.onUpdate }
            onUpdateStatus={ this.props.onUpdateStatus }/>
        }
        
      } 
      
      return rs;

    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr className="d-flex">
            <th className="col-1">Index</th>
            <th className="col-7">Name</th>
            <th className="col-2">Status</th>
            <th className="col-2 col-sm-4">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="d-flex">
            <td className="col-1"scope="row"></td>
            <td className="col-7">
                <input
                  type="text" className="form-control"
                  name="filterName"
                  onChange = { this.onChange }
                />
            </td>
            <td className="col-2">
              <select className="form-control"
                name="filterStatus"
                onChange = { this.onChange }
              >
                <option value="all">All</option>
                <option value ="active">Active</option>
                <option value="hiden">Hiden</option>
                <option value="complete">Completed</option>
              </select>
            </td>
            <td className="col-2"></td>
          </tr>
          {elems}
        </tbody>
      </table>
    );
  }
}

export default TaskList;