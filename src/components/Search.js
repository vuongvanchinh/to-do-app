import React, { Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  onSearch = () => {
    if (this.state.keyword.trim() !== '') {
      this.props.onSearch(this.state.keyword.trim().toLowerCase());
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

export default Search;
