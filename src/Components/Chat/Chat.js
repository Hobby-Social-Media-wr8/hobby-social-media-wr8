import { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import "./chat.scss";

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      messages: [],
      room: "",
    };
  }

  componentDidMount() {
    this.setSocketListeners();
    this.startChat();
    this.socket.on("startChat", (messages) => {
      this.chatStarted(messages);
    });
  }

  chatStarted = (messages) => {
    this.setState({
      messages: messages,
    });
  };

  setSocketListeners = () => {
    this.socket = io();

    this.socket.on("sendMsg", (messages) => {
      this.setState({
        messages,
        message: "",
      });
    });
  };

  startChat = () => {
    this.socket.emit("endChat", this.state.chat);
    const viewedUserId = +this.props.match.params.id;
    const { id } = this.props;

    let greater;
    let lesser;

    if (viewedUserId > id) {
      greater = viewedUserId;
      lesser = id;
    } else {
      greater = id;
      lesser = viewedUserId;
    }

    const chatRoomId = greater + ":" + lesser;
    this.setState({
      room: chatRoomId,
    });

    this.socket.emit("startChat", { chatRoomId, viewedUserId, id });
  };

  handleMessage = (value) => {
    this.setState({
      message: value,
    });
  };

  sendMsg = () => {
    this.socket.emit("sendMsg", {
      room: this.state.room,
      message: this.state.message,
      user1: this.props.id,
    });
    this.setState({ message: "" });
  };

  render() {
    const messages = this.state.messages.map((obj) => (
      <Box className="messages" key={obj.message_id}>
        {this.props.id === obj.sender_id ? (
          <section className="message-display-right">
            <article className="my-message">{obj.message}</article>
            <span>{obj.username}</span>
          </section>
        ) : (
          <section className="message-display-left">
            <article className="other-message">{obj.message}</article>
            <span>{obj.username}</span>
          </section>
        )}
      </Box>
    ));

    return (
      <section className="chat-wrapper">
        <Container className="chat-container" fixed>
          <Container maxWidth="sm" className="messages-container">
            {messages}
          </Container>
          <section className="chat-controls">
            <TextField
              name="message"
              label="Message"
              className="message-input"
              onChange={(e) => this.handleMessage(e.target.value)}
              value={this.state.message}
            />
            <button onClick={this.sendMsg} className="send-message-btn" variant="contained">
              Send
            </button>
          </section>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { id: state.user.user_id };
};

export default connect(mapStateToProps)(Chat);
