import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newMessage, newQuestion } from "../actions/messageActions";
import "./messageform.css";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const question = {
      question: this.state.question
    };
    this.props.newQuestion(question);
    this.props.newMessage(question);
    this.setState({ question: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <br />
          <div>
            <br />
            <input
              name="question"
              onChange={this.onChange}
              value={this.state.question}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  newMessage: PropTypes.func.isRequired,
  newQuestion: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
const mapStateToProps = state => ({
  loading: state.messages.loading
});
export default connect(
  mapStateToProps,
  { newMessage, newQuestion }
)(PostForm);
