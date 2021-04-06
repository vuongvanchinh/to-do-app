import React, { Component} from 'react';

import './App.css';
import Control from './components/Control';
import Form from './components/Form';
import TaskList from './components/TaskList';
import { findIndex, filter } from 'lodash';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      tasks:[],
      isDisplayForm: false,
      taskIsEditingIndex: -1,
      keyword:"",
      sort : {
        by: "name",
        value: 1
      }
    };
    
  }
  
  componentDidMount() {
    try {
      var t = localStorage.getItem('tasks');
      this.setState({tasks: JSON.parse(t)});
      
    } catch (e) {
      console.log(e.message);
    }
  }
  
 
  makeid(length = 5) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  
  onToggleForm = () => {
    if (this.state.taskIsEditingIndex !== -1) {
      this.setState({ taskIsEditingIndex: -1});
      return;
    }
    this.setState({ isDisplayForm: !this.state.isDisplayForm });
  }

  onSubmit = (params) => {
    var {tasks, taskIsEditingIndex} = this.state;
    // Update
    if(taskIsEditingIndex !== -1) {
      tasks[taskIsEditingIndex].name = params.name;
      tasks[taskIsEditingIndex].status = params.status;
      this.setState({ taskIsEditingIndex: -1});
    } else {
      // Create 
      params.id = this.makeid(5);
      tasks.push(params);
    }
    
    this.setState({
      tasks: tasks
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskIsEditingIndex: -1
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true,
    });
  }

  onUpdateStatus = (id) => {
    var index = findIndex(this.state.tasks, (task)=> {
      return task.id === id
    });
    console.log("found", index);
    if (index === -1) {
      return 
    }
    var {tasks} = this.state;
    console.log(tasks[index].status);
    if (tasks[index].status === "hiden") {
      tasks[index].status = "active";
    } else if (tasks[index].status === "active") {
      tasks[index].status = "complete";
    } else {
      tasks[index].status = "hiden";
    }
    
    this.setState({ tasks: tasks});
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  onDelete = (id) => {
    console.log(id);
    var index = this.findIndex(id);
    if (index === -1) {
      return ;
    }
    var { tasks } = this.state;
    console.log(index, tasks);

    tasks.splice(index, 1);
    this.setState({tasks: tasks});
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.onCloseForm();
  }
  
  onUpdate = (id) => {
    var index = findIndex(this.state.tasks, (task)=> {
      return task.id === id
    });
    if(index === -1) {
      return;
    }
    this.setState({ taskIsEditingIndex: index });   
    this.onShowForm();
  }


  // findIndex = (id) => {
  //   var {tasks} = this.state;
  //   // for (let i= 0; i < tasks.length; i++) {
  //   //   if (tasks[i].id === id) return i; 
  //   // }
  //   // return -1;
  //   return 
  // }

  onSearch = (keyword) => {
    this.setState({ keyword: keyword});
  }
   
  // resultFilter = (task) => {
  //   if (this.state.keyword ==='') {
  //     return true;
  //   }
  //   return task.name.trim().toLowerCase().indexOf(this.state.keyword) !==-1;
  // }

  sortBy = (sortBy, value) => {
    
    var sort = { by: sortBy, value: value };

    this.setState( {
      sort: sort
    });

  }

  render() {
    var {tasks, isDisplayForm, taskIsEditingIndex, sort, keyword } = this.state;
    var elementForm =  isDisplayForm ? <Form
      onHiden={this.onCloseForm }
      onSubmit= {this.onSubmit }
      taskEdit = {taskIsEditingIndex !== -1? this.state.tasks[taskIsEditingIndex]: null}
      /> : '';
    
    // tasks = tasks.filter(this.resultFilter);
    tasks = filter(tasks, (task) => {
      return task.name.toLowerCase().indexOf(keyword) !== -1
    });
    tasks = tasks.sort((a, b) => {
      if (a[sort.by] == b[sort.by]) {
        return 0;
      } 
      return (a[sort.by].toLowerCase() > b[sort.by].toLowerCase()) ? sort.value: -sort.value;
    });
  
    return (
      <div className="container-fluid" style={{marginTop:"20px"}}>
        <div className="row">
          <div className={ isDisplayForm ? "col-sm-4 col-md-4 col-lg-4 col-xl-4":"w-0" }
            style ={{ transition:"all 1s"}}
          >
            { elementForm }
          </div>
          <div className={ isDisplayForm ? "col-sm-8 col-md-8 col-lg-8 col-xl-8" : 
                                        "col-sm-12 col-md-12 col-lg-12 col-xl-12"}
            // style ={{transition: "all 1s"}}
                                        
            >
              <button 
              
                className="btn btn-primary  mr-5"
                onClick={this.onToggleForm }
                
                >
                <span className="fa fa-plus"></span>Add new task
              </button>
             
              <Control onSearch ={ this.onSearch } sortBy={ this.sortBy }/>

              <TaskList tasks = {tasks} 
                onUpdate = { this.onUpdate }
                onDelete={ this.onDelete }
                onUpdateStatus={ this.onUpdateStatus } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
