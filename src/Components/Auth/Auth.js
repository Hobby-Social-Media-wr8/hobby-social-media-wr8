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
        <div className="auth-flex">
        {this.state.registerToggle ? (
          <>
            <h1>Register Here</h1>
            <input
              value={this.state.username}
              name="username"
              placeholder="Username"
              onChange={(e) => this.handleInput(e)}
            />
          </>
        ) : (
          <h1>Login</h1>
        )}
        <input value={this.state.email} name="email" placeholder="Email" onChange={(e) => this.handleInput(e)} />
        <input
          value={this.state.password}
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => this.handleInput(e)}
          
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
              <span style ={{cursor: 'pointer', textDecoration: 'underline'}} onClick={this.handleToggle}>Login Here</span>
            </p>
          </>
        ) : (
          <>
            <button onClick={this.handleLogin}>Login</button>
            <p>
              Don't have an account with us yet?{" "}
              <span style ={{cursor: 'pointer', textDecoration: 'underline'} } onClick={this.handleToggle}>Register Here</span>
            </p>
          </>
        )}
        </div>
      </div>
    );
  }
}

export default connect(null, { getUser })(Auth);
