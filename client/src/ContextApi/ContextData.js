import React from 'react';
import DataContext from './ContextCreeter';

export class ContextCreeter extends React.Component {
  constructor(props) {
    super(props);
  }
  value = {
    name: 'uday',
    sname: 'madhak',
    aage: 18,
  };
  render() {
    return (
      <DataContext.Provider value={this.value}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default ContextCreeter;
