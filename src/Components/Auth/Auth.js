import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import "../Auth/Auth.css";

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      verifyPassword: "",
      registerToggle: false,
    };
  }
  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleToggle = () => {
    this.setState({ registerToggle: !this.state.registerToggle });
  };
  handleRegister = () => {
    const { username, email, password, verifyPassword } = this.state;

    if (password && password === verifyPassword) {
      axios
        .post("/api/register", { username, email, password })
        .then((res) => {
          this.props.getUser(res.data);
          this.props.history.push("/profile");
        })
        .catch((err) => console.log(err));
    } else {
      alert("These passwords don't match, please try again.");
    }
  };
  handleLogin = () => {
    const { email, password } = this.state;

    axios
      .post("/api/login", { email, password })
      .then((res) => {
        this.props.getUser(res.data);
        this.props.history.push("/profile");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="auth-container">
        <h1>Authentication Page</h1>
        {this.state.registerToggle ? (
          <>
            <h3>Register Here</h3>
            <input
              value={this.state.username}
              name="username"
              placeholder="Username"
            />
          </>
        ) : (
          <h3>Login Here</h3>
        )}
        <input value={this.state.email} name="email" placeholder="Email" />
        <input
          value={this.state.password}
          name="password"
          type="password"
          placeholder="Password"
        />
        {this.state.registerToggle ? (
          <>
            <input
              value={this.state.verifyPassword}
              name="verifyPassword"
              type="password"
              placeholder="Verify Password"
              onChange={(e) => this.handleInput(e)}
            />
            <button onClick={this.handleRegister}>Register</button>
            <p>
              Already have an account?{" "}
              <span onClick={this.handleToggle}>Login Here</span>
            </p>
          </>
        ) : (
          <>
            <button onClick={this.handleLogin}>Login</button>
            <p>
              Don't have an account with us yet?{" "}
              <span onClick={this.handleToggle}>Register Here</span>
            </p>
          </>
        )}
      </div>
    );
  }
}

export default connect(null, { getUser })(Auth);
