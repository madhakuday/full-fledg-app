import React, { Component } from 'react';
import { Box, Container } from '@mui/material';
import axios from 'axios';
import { withRouter } from 'react-router';

//como
import Header from '../Header';

//css
import '../../stylesheet/Singelcard.css';
import { Badge, Button, Typography } from 'antd';

const { Title } = Typography;

const imagelink = 'https://image.tmdb.org/t/p/w300';

export class Singelcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      carddata: [],
      media_type: '',
      videolink: '',
    };
  }
  componentDidMount() {
    this.fetchmovedata();
    setTimeout(() => {
      this.fetchvideo();
    }, 500);
  }

  async fetchmovedata() {
    const { id, page } = this.props.match.params;

    const { data } = await axios.post('/api/singmovieapi', {
      page: page,
    });

    this.setState({ data: data.results });

    const test = this.state.data.filter((x) => {
      return x.id.toString() == id;
    });

    this.setState({ carddata: test, media_type: test[0].media_type });
  }

  async fetchvideo() {
    const { id, page } = this.props.match.params;

    const { data } = await axios.post('/api/singmovievideoapi', {
      id: id,
      page: page,
      media_type: this.state.media_type,
    });

    this.setState({ videolink: data.results[0].key });
  }

  render() {
    return (
      <>
        <Container>
          <Header />
          {this.state.carddata.map((x) => {
            return (
              <React.Fragment key={x.id}>
                <Box className="scard_box_main">
                  <Box className="scard_box_1">
                    <img
                      src={`${imagelink}${x.poster_path}`}
                      height="100%"
                      style={{ borderRadius: '15px' }}
                      className="card_img"
                      loading="lazy"
                    />
                    <Box className="card_img_box_1">
                      <img
                        src={`${imagelink}${x.poster_path}`}
                        height="60%"
                        width="60%"
                        loading="lazy"
                      />
                    </Box>
                  </Box>

                  <Box className="scard_box_2">
                    <Box className="scard_badge">
                      <Badge.Ribbon text={x.vote_average} color="red" />
                    </Box>

                    <Box
                      className="card_box_title"
                      style={{ width: '80%', padding: '15px 0' }}
                    >
                      <Title
                        level={3}
                        style={{
                          color: 'white',
                          fontFamily: 'Tiro Devanagari Sanskrit, serif',
                        }}
                      >
                        {x.name ? x.original_name : x.original_title}
                      </Title>
                      <Title level={5} style={{ color: 'white' }}>
                        {x.release_date}
                      </Title>

                      <Title level={5} style={{ color: 'white' }}>
                        {x.overview}
                      </Title>

                      <ul>
                        <li>Popularity : {x.popularity} </li>
                        <li>Vote : {x.vote_count}</li>
                      </ul>

                      <Button
                        target={`_blank`}
                        href={`https://www.youtube.com/watch?v=${this.state.videolink}`}
                        type="primary"
                      >
                        watch trailer
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </React.Fragment>
            );
          })}
        </Container>
      </>
    );
  }
}

export default withRouter(Singelcard);
