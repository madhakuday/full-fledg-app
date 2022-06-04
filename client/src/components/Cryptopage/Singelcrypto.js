import { Container, Box } from '@mui/material';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import { List, Typography, Divider } from 'antd';

//components
import Header from '../Header';

//css
import '../../stylesheet/singelcriptocard.css';

const { Title } = Typography;
export class Singelcrypto extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    const data = await axios.get('/api/cryptoapi');
    const test = data.data.filter((x) => {
      return x.id.toString() === id;
    });

    this.setState({ data: test });
  }
  render() {
    return (
      <>
        <Container>
          <Header />
          {this.state.data.map((x) => {
            return (
              <React.Fragment key={x.id}>
                <Box className="ccard_box_main">
                  <Box className="ccard_box_1">
                    <img src={x.image} className="ccars_img_1" />

                    <Box className="ccard_box_typo">
                      <Title
                        level={4}
                        style={{ margin: 'auto', color: 'white' }}
                      >
                        name : {x.name}
                      </Title>
                      <Divider
                        style={{
                          backgroundColor: 'white',
                          height: '2rem',
                        }}
                        type="vertical"
                      />

                      <Title level={4} style={{ color: 'white' }}>
                        Current Price :
                        <li
                          style={
                            x.current_price <= 0
                              ? {
                                  color: 'red',
                                  margin: 'auto',
                                  display: 'inline-block',
                                  listStyle: 'none',
                                }
                              : {
                                  color: 'white',
                                  margin: 'auto',
                                  display: 'inline-block',
                                  listStyle: 'none',
                                }
                          }
                        >
                          {x.current_price}
                        </li>
                      </Title>
                    </Box>
                  </Box>
                  <Divider style={{ backgroundColor: 'white' }} />

                  <Box className="ccard_box_2">
                    <List>
                      {x.roi === null ? (
                        ''
                      ) : (
                        <Title style={{ color: 'white' }} level={4}>
                          currency : {x.roi.currency}
                        </Title>
                      )}
                      <Title style={{ color: 'white' }} level={4}>
                        market cap : {x.market_cap}
                      </Title>

                      <Title style={{ color: 'white' }} level={4}>
                        price change in 24h :
                        <li
                          style={
                            x.price_change_24h <= 0
                              ? {
                                  color: 'red',
                                  margin: 'auto',
                                  display: 'inline-block',
                                  listStyle: 'none',
                                }
                              : {
                                  color: 'white',
                                  margin: 'auto',
                                  display: 'inline-block',
                                  listStyle: 'none',
                                }
                          }
                        >
                          {x.price_change_24h}
                        </li>
                      </Title>

                      <Title style={{ color: 'white' }} level={4}>
                        Last updated : {x.last_updated.slice(0, 10)}
                      </Title>
                    </List>
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

export default withRouter(Singelcrypto);
