import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch, IRootState } from "../../store";
import { logout } from "../../redux/auth/actions";
import { Button } from "antd";

interface ILogoutProps {
  isAuthenticated: boolean;
  logout: () => void;
}

class Logout extends React.Component<ILogoutProps, {}> {

  private logout = () => {
    this.props.logout();
  };

  public render() {
    return (
      <div className="logout-bar">
        <Button type="danger" onClick={this.logout}>
          Logout
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
