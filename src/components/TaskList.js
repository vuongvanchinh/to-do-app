import React, { Component} from  'react';
import TaskItem from './TaskItem';
import { filter } from 'lodash';
import { connect } from 'react-redux';
// import * as actions from '../actions/index';

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
    var {tasks, keyword, sort} = this.props;
    var {filterStatus, filterName} = this.state;
    // filter handle.
    if (filterStatus !== 'all') {
      tasks = filter(tasks, (a) => {
        return filterStatus === a.status;
      });
    }
    if (filterName.trim() !== '') {
      tasks = filter(tasks, (a) => {
        return a.name.toLowerCase().indexOf(filterName.toLowerCase().trim()) !== -1
      });
    }
   
    // search handle
    if (keyword !== '') {
      tasks = filter(tasks, (task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    // sort handle
    if (sort.by) {

      tasks.sort((a, b) => {
        if(a[sort.by].toLowerCase() === b[sort.by].toLowerCase()) return 0;
        return (a[sort.by].toLowerCase() > b[sort.by].toLowerCase()) ? sort.value : -sort.value;
      });
    }


    var elems = tasks.map((task, index) => {
          return <TaskItem key={index} 
            task={task} index={index}
          />
    });
    const style = {
      textAlign: "center"
    };
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr className="d-flex">
            <th className="col-sm-2 col-md-1" style={style}> Index</th>
            <th className="col-sm-6 col-md-7" style={style}>Name</th>
            <th className="col-sm-2 col-md-2" style={style}>Status</th>
            <th className="col-sm-2 col-md-2" style={style}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="d-flex">
            <td className="col-sm-2 col-md-1"></td>
            <td className="col-sm-6 col-md-7">
                <input
                  type="text" className="form-control"
                  name="filterName"
                  placeholder="Filter by name"
                  onChange = { this.onChange }
                />
            </td>
            <td className="col-sm-2 col-md-2">
              <select className="form-control"
                name="filterStatus"
                onChange = { this.onChange }
                value={ this.state.filterStatus }
              >
                <option value="all">All</option>
                <option value ="active">Active</option>
                <option value="hiden">Hiden</option>
                <option value="complete">Completed</option>
              </select>
            </td>
            <td className="col-sm-2 col-md-2"></td>
          </tr>
          {elems}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    keyword: state.search,
    sort: state.sort,
  };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    // onFilterTaskList: (filter) => {
    //   return dispatch(actions.filterTaskList(filter));
    // }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);