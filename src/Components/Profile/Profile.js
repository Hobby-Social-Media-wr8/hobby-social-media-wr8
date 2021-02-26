import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, clearUser } from "../../redux/reducer";
import "../Profile/Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: "",
      interests: "",
      basicInfo: "",
      editInfoToggle: false,
    };
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleEditInfoToggle = () => {
    this.setState({ editView: !this.state.editInfoToggle });
  };
  editInfo = () => {
    axios
      .put(`/api/profile/${this.props.profile.profile_user_id}`, {
        basicInfo: this.state.basicInfo,
      })
      .then((res) => {
        this.props.getUser(res.data[0]);
        this.handleEditView();
        this.setState({ basicInfo: "" });
      })
      .catch((err) => console.log(err));
  };
  handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        this.props.clearUser();
        this.props.history.push("/");
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="profile-container">
        <h1>Profile Page</h1>
        <input
          value={this.state.interests}
          name="interests"
          placeholder="List your interests here!"
          onChange={(e) => this.handleInput(e)}
        />
        <input
          value={this.state.basicInfo}
          name="basicInfo"
          placeholder="Create your basic info here!"
          onChange={(e) => this.handleInput(e)}
        />
        {!this.state.editInfoToggle ? (
          <div>
            <p>{this.state.basicInfo}</p>
            <button onClick={this.handleEditInfoToggle}>Edit Info</button>
          </div>
        ) : (
          <div>
            <input
              value={this.state.basicInfo}
              name="basicInfo"
              placeholder="Create your basic info here!"
              onChange={(e) => this.handleInput(e)}
            />
            <button onClick={this.editInfo}>Submit Info</button>
          </div>
        )}
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(Profile);

// want the ability to edit interests box?
// still need to put profile picture in -amazon s3
