import * as React from 'react';
import './App.css';
import { ConnectedNav } from './components/nav/Nav';
import { Provider } from 'react-redux';
import store from './store';
import { history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import { Popover, Button, Row, Col } from 'antd';
import { ConnectedSocketChatroom } from './components/chat/Socket';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Row>
              <Col span={20} >
                <ConnectedNav />
              </Col>
              <Col span={4}>
                <Popover placement="bottom" className='popover' content={<ConnectedSocketChatroom />} trigger="click" >
                  <Button>Chatroom</Button>
                </Popover>
              </Col>
            </Row>
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

export default App;

