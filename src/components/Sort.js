import React, { Component} from 'react';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: 'name',
        value: 1
      }
    };
  }
  
  sortBy = (sortBy, value) => {
  
    var sort = {by: sortBy, value: value};
    this.setState({
      sort:sort
    });

    this.props.sortBy(sortBy, value);
  }

  render() {
    var {sort} = this.state;

    return (
      <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <div className="btn-group">
          <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort
            {/* <i className="far fa-caret-square-down"></i> */}
          </button>
          <div className="dropdown-menu">
            <a role="button" className={(sort.by ==='name'&& sort.value ===1)? "dropdown-item sort-selected": "dropdown-item"} 
              onClick={ () => this.sortBy("name", 1)}
            >
              <i className="sort-icon fas fa-sort-alpha-down"></i> A - Z
            </a>
            <a role="button" className={(sort.by ==='name'&& sort.value ===-1)? "dropdown-item sort-selected": "dropdown-item"} 
              onClick={ () => this.sortBy("name", -1)}
            >
              <i className="sort-icon fas fa-sort-alpha-down-alt"></i>  Z - A
            </a>
            <div className="dropdown-divider"></div>
            <a role="button"className={(sort.by ==='status'&& sort.value ===1)? "dropdown-item sort-selected": "dropdown-item"} 
              onClick={ () => this.sortBy("status", 1)}
            >Active</a>
            <a role="button" className={(sort.by ==='status'&& sort.value ===-1)? "dropdown-item sort-selected": "dropdown-item"} 
              onClick={ () => this.sortBy("status", -1)}
            >Hidden</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Sort;
