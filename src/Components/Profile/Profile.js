import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, clearUser } from "../../redux/reducer";
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import {GridLoader} from 'react-spinners';

import "../Profile/Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTKtSTmkgdKbSxKz74cz18XCvIQQ5SBLgJw&usqp=CAU',
      interests: "",
      basicInfo: "",
      isUploading: false,
      editInfoToggle: false,
    };
  }
  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleEditInfoToggle = () => {
    this.setState({ editView: !this.state.editInfoToggle });
  };
  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get('/api/signs3', {
        params: {
          'file-name': fileName,
          'file-type': file.type,
        },
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, url });
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
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
    const {url, isUploading} = this.state;
    return (
      <div className="profile-container">
        <h1>Profile</h1>
        <img src={url} alt="" height= "250px" width="250px" />
        <h2>Upload Below</h2>
        <Dropzone
          onDropAccepted={this.getSignedRequest}
          accept="image/*"
          multiple={false}>
          {({getRootProps, getInputProps}) => (
            <div 
              style = {{
              position: 'relative',
              width: 160,
              height: 80,
              borderWidth: 5,
              marginTop: 10,
              borderColor: 'gray',
              borderStyle: 'dashed',
              borderRadius: 5,
              display: 'inline-block',
              fontSize: 17,}}
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
            </div>
          )}
         </Dropzone>
        
        <div className='interests-flex'>
          <input
          value={this.state.interests}
          name="interests"
          placeholder="List your interests here!"
          onChange={(e) => this.handleInput(e)}
        />
          <div>
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
          </div>
        <button onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(Profile);

// want the ability to edit interests box?
// still need to put profile picture in -amazon s3