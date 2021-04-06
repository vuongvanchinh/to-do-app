import React, { Component} from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends Component {

  render() {
      
    return (
      <div className="row" style={{ padding: "10px 0"}}>
        {/*Serch*/}
        <Search onSearch ={ this.props.onSearch }/>
        {/*Sort*/}
        <Sort sortBy = { this.props.sortBy }/>
      </div>
    );
  }
}

export default Control;
