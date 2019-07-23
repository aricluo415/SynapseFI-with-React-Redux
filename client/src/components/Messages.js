import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./messages.css";

class Messages extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.newMessage) {
      console.log("Message.js componentWillRecieve", nextProps);
      this.props.messages.push(nextProps.newMessage);
    }
  }
  componentDidUpdate(prevProps) {
    console.log("ComponentDidUpdate messages.js", prevProps);
  }
  render() {
    const messages = this.props.messages.map((mes, index) => {
      return (
        <div key={index}>
          <p className="right">{mes.question}</p>
          <p className="left">{mes.answer}</p>
        </div>
      );
    });
    return (
      <div>
        <h1>Chat</h1>
        <ul>{messages}</ul>
      </div>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
  newMessage: PropTypes.object
};

const mapStateToProps = state => ({
  messages: state.messages.messages,
  newMessage: state.messages.message
});

export default connect(
  mapStateToProps,
  {}
)(Messages);
