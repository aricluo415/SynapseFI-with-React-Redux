import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";

import Messages from "./components/Messages";
import MessageForm from "./components/MessageForm";
import User from "./components/User";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Budget App</h1>
          </header>
          <hr />
          <User />
          <div className="chatbox">
            <Messages />
            <MessageForm />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
