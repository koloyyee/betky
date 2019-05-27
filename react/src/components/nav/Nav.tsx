import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import * as React from "react";
import { Layout, Menu, Icon } from "antd";
import { ConnectedTwitch } from "../twitch/Twitch";
import { ConnectedLogin } from "../auth/Login";
import Logout from "../auth/Logout";
import { PrivateRoute } from "../../PrivatRoute";
import { ConnectedMemberPage } from "../../pages/MemberPage";
import "./Nav.css";
import { IRootState } from "../../store";
import { connect } from "react-redux";
import { IChannel } from "../../redux/channel/state";
import { loadAllChannel } from "../../redux/channel/thunk";
import { Shop } from "../../pages/Shop";
const BetkyLogo = require('../../picture/Betky_logo-1-01.png');

const { SubMenu } = Menu;
const {  Sider, Content } = Layout;

interface INavState {
  collapsed: boolean;
}

interface INavProps {
  isAuthenticated: boolean;
  channels: IChannel[];
  loadAllChannel: () => void;
}

export class Nav extends React.Component<INavProps, INavState> {
  constructor(props: INavProps) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

  private toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  public componentDidMount() {
    this.props.loadAllChannel();
    
  }

  public render() {
    return (
      <div>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="toggle-switch">
                <Icon 
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
              </Menu.Item>
              <SubMenu
                
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    Live
                  </span>
                }
              >
                {this.props.channels.map(game => (
                  <Menu.Item className={'game-menu'} key={game.id}>
                    <NavLink
                      exact={true}
                      to={`/channel/${game.id}`}
                      className="link"
                      style={{
                        fontWeight: "lighter",
                        fontSize: "0.8em",
                        textDecoration: "none",
                        
                      }}
                    >
                      <Icon  type="video-camera" />
                      {game.game}
                    </NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
              <Menu.Item key="shop">
                <NavLink
                  exact={true}
                  to="/shop"
                  className="link"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    textDecoration: "none"
                  }}
                >
                  <Icon type="gift" />
                  <span>Shop</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="account">
                <NavLink
                  exact={true}
                  to="/member"
                  className="link"
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.1em",
                    textDecoration: "none"
                  }}
                >
                  <Icon type="user" />
                  <span>Account</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                {this.props.isAuthenticated ? <Logout /> : ""}
              </Menu.Item>
        <img id = 'Betky_logo' src={BetkyLogo} alt='Betky: Gaming with Benefit' />

            </Menu>
          </Sider>
          <Layout>

            <Content>
              <div className="App col-6-md">
                <Switch>
                  <Route path='/' exact={true} render={()=>!this.props.channels[0]?<h4>"Loading..."</h4>:<Redirect to={`/channel/${this.props.channels[0].id}`} />}/>
                  <Route path="/channel/:id" exact={true} component={ConnectedTwitch} />
                  <Route path="/login" exact={true} component={ConnectedLogin} />
                  <PrivateRoute path="/shop" exact={true} component={Shop}/>
                  <PrivateRoute path="/member" exact={true} component={ConnectedMemberPage} />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>

      </div>
    );
  }
}

const mapsStateToProps = (state: IRootState) => {
  const { isAuthenticated } = state.auth;
  const channels = state.channel.channels;
  return { isAuthenticated, channels };
};

const mapDispatchToProps = {
  loadAllChannel
};

export const ConnectedNav = connect(
  mapsStateToProps,
  mapDispatchToProps
)(Nav);
