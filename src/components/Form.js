import React, { Component} from 'react';

class Form extends Component {


  constructor(props) {

    super(props);
    
    this.state={
      name:"",
      status: "active"
    
    };
    
  }
  
  componentDidMount() {
    var {taskEdit} = this.props;
    if (taskEdit) {
      console.log("edit");
      this.setState({ 
        name: taskEdit.name,
        status: taskEdit.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps) {
      return;
    }

    var taskEdit = nextProps.taskEdit;
    if (taskEdit) {
      console.log("edit", taskEdit);
      this.setState({ 
        name: taskEdit.name,
        status: taskEdit.status
      });
    }  else {
      this.setState({ 
        name: '',
        status: 'active'
      });
    }
  }

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
    this.props.onSubmit(this.state);
    this.resetForm();
  }
  resetForm = () => {
    this.setState({
      name:'', 
      status:'active'
    });
  }

  render() {
    
    return (
    <div className="card">
      <div className="card-header bg-info">{ this.props.taskEdit ? "Update task": "Create new task"}
      <button type="button" className="close" aria-label="Close"
        onClick={ this.props.onHiden }
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

export default Form;
