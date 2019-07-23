import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUser } from "../actions/userActions";

class User extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        {this.props.loading ? (
          <h2>Loading...</h2>
        ) : (
          <h2>Hello {this.props.user}</h2>
        )}
      </div>
    );
  }
}
User.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  user: PropTypes.string,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.users.user,
  loading: state.users.loading
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(User);
