import React, { Component } from 'react';
import Container from '@mui/material/Container';
import { Card, Divider, Row, Col } from 'antd';
import { Box } from '@mui/material';
import axios from 'axios';

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import MoviePagination from './MoviePagination';
import MovieMenubar from './MovieMenubar';
import { Link } from 'react-router-dom';
//const

const { Meta } = Card;
const imagelink = 'https://image.tmdb.org/t/p/w300';

export class MoviesMain extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      num_page: '',
      page: 1,
      fulldata: [],
      type: 'all',
      cardloding: true,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getvalue = this.getvalue.bind(this);
  }

  async getmoviesdata() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${this.state.type}/day?api_key=96eb55edd584f0e95c33280b79b8468b&page=${this.state.page}`
    );

    console.log('data is ', data);

    this.setState({
      data: data.results,
      fulldata: data,
      num_page: data.total_pages,
    });
  }

  handlePageChange(e) {
    this.setState({ page: e }, () => {
      this.getmoviesdata();
    });
  }

  componentDidMount() {
    this.getmoviesdata();
    this.setState({ cardloding: false });

    setTimeout(() => {
      const test = this.state.data.map((x) => x.video);
      console.log('video is', test);
    }, 1000);
  }

  getvalue(val) {
    this.setState({ type: val }, () => {
      console.log('type is', this.state.type);
      this.getmoviesdata();
    });
  }
  render() {
    return (
      <>
        <Container>
          <Divider style={{ backgroundColor: 'white' }} />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MovieMenubar data={this.state.data} getvalue={this.getvalue} />
          </Box>
          <Divider style={{ backgroundColor: 'white' }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

              '& > *': {
                m: 1,
              },
            }}
          >
            <Row
              gutter={[16, 16]}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {this.state.data.map((m, ind) => {
                return (
                  <React.Fragment key={ind}>
                    <Link to={`/scard/${this.state.page}/${m.id}`}>
                      {/* <Box> */}
                      <Col span={8}>
                        <Card
                          hoverable={true}
                          style={{
                            width: 250,
                            margin: 'auto',
                          }}
                          loading={this.state.cardloding}
                          cover={
                            <img
                              alt="example"
                              src={`${imagelink}/${m.poster_path}`}
                            />
                          }
                          actions={[
                            <Link
                              to={`/scard/${this.state.page}/${m.id}`}
                              style={{
                                width: '100%',
                                display: 'flex',
                                height: '30%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <ReadMoreIcon />
                              Show
                            </Link>,
                          ]}
                        >
                          <Meta
                            title={m.name ? m.original_name : m.original_title}
                            description={`${m.overview.slice(0, 25)}...`}
                          />
                        </Card>
                      </Col>
                      {/* </Box> */}
                    </Link>
                  </React.Fragment>
                );
              })}
            </Row>
          </Box>

          <Divider />
          <MoviePagination
            page={this.state.page}
            num_page={this.state.num_page}
            handlePageChange={this.handlePageChange}
          />
        </Container>
      </>
    );
  }
}

export default MoviesMain;
