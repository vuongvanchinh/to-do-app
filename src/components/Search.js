import React, { Component} from 'react';
import { connect} from 'react-redux';
import * as actions from '../actions/index';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword.trim().toLowerCase());
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
      
    return (
      <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
        <div className="input-group mb-3">
          <input type="text" name="keyword"
            className="form-control border border-primary"
            onChange = { this.onChange }
            placeholder="Search"/>
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit"
              onClick={this.onSearch }
            >Search</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSearch : (keyword) => {
      return dispatch(actions.searchTask(keyword));
    } 
  };
}

export default connect(null, mapDispatchToProps)(Search);
