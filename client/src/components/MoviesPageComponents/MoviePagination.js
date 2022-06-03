import { Pagination } from 'antd';
import React, { Component } from 'react';

//csss
import '../../stylesheet/Pagination.css';
export class MoviePagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div style={{ padding: '30px 0' }} className="pagination_main">
          {this.props.num_page > 1 && (
            <Pagination
              defaultCurrent={this.props.page}
              total={this.props.num_page}
              onChange={(e) => this.props.handlePageChange(e)}
              showSizeChanger={false}
              showLessItems={true}
              style={{ white: 'white' }}
            />
          )}
        </div>
      </>
    );
  }
}

export default MoviePagination;
