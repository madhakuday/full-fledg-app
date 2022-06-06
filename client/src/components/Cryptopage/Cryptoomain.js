import { Container } from '@mui/material';
import React, { Component } from 'react';
import axios from 'axios';
import { List, Avatar, Divider, Input, Typography } from 'antd';

//Component
import Header from '../Header';

//css
import '../../stylesheet/criyptomain.css';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export class Criptomain extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filter: '',
    };
  }

  ContainerHeight = 800;

  appendData = async () => {
    const data = await axios.get('/api/cryptoapi');

    this.setState({ data: data.data });
  };

  onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      this.ContainerHeight
    ) {
      this.appendData();
    }
  };

  hendelchange(e) {
    this.setState({ filter: e });
  }

  componentDidMount() {
    this.appendData();
  }

  render() {
    return (
      <>
        <Container>
          <Header />

          <Divider style={{ background: 'white' }} />

          <Title
            level={4}
            style={{
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            click on list to show full info.
          </Title>
          <Divider style={{ backgroundColor: 'white' }} />

          <Input onChange={(e) => this.hendelchange(e.target.value)} />

          <Divider style={{ background: 'white' }} />
          <List>
            {this.state.data
              .filter((x) => {
                return x.name
                  .toLowerCase()
                  .includes(this.state.filter.toLowerCase());
              })
              .map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <Link to={`scripto/${item.id}`}>
                      <List.Item style={{ color: 'white' }}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.image} />}
                          title={item.name}
                          style={{ color: 'white' }}
                          className="criypto_color"
                        />
                        <div
                          style={
                            item.price_change_percentage_24h <= 0
                              ? { color: 'red' }
                              : { color: 'white' }
                          }
                        >
                          {item.price_change_percentage_24h}
                        </div>
                      </List.Item>
                    </Link>
                  </React.Fragment>
                );
              })}
          </List>
        </Container>
      </>
    );
  }
}

export default Criptomain;
