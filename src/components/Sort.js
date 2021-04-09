import React, { Component} from 'react';
import { connect} from 'react-redux';
import * as actions from '../actions/index';

class Sort extends Component {
  
  sortBy = (sortBy, value) => {
    let sort = {by: sortBy, value: value};
    this.props.onSortTask(sort);
  }

  render() {
    var {sort} = this.props;
    return (
      <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <div className="btn-group">
          <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort
            {/* <i className="far fa-caret-square-down"></i> */}
          </button>
          <div className="dropdown-menu">
            <button  className={(sort.by ==='name'&& sort.value ===1)? "dropdown-item sort-selected": "dropdown-item"} 
              onClick={ () => this.sortBy("name", 1)}
            >
              <i className="sort-icon fas fa-sort-alpha-down"></i> A - Z
            </button>
            <button  className={(sort.by ==='name'&& sort.value ===-1)? "dropdown-item sort-selected": "dropdown-item"} 
              onClick={ () => this.sortBy("name", -1)}
            >
              <i className="sort-icon fas fa-sort-alpha-down-alt"></i>  Z - A
            </button>
            <div className="dropdown-divider"></div>
            <button className={(sort.by ==='status'&& sort.value ===1)? "dropdown-item sort-selected": "dropdown-item"} 
              onClick={ () => this.sortBy("status", 1)}
            >Active</button>
            <button  className={(sort.by ==='status'&& sort.value ===-1)? "dropdown-item sort-selected": "dropdown-item"} 
              onClick={ () => this.sortBy("status", -1)}
            >Hidden</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    sort: state.sort
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSortTask: (sort) => {
      return dispatch(actions.sortTask(sort));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps) (Sort);
