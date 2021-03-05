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
      profile: [],
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgUNaoFwOOa3sOnMoc8CVUJ65bhS822etxVQ&usqp=CAU',
      interests: "",
      basicInfo: "",
      isUploading: false,
      editInfoToggle: false,
      editInterestToggle: false
    };
  }
  componentDidMount(){
    this.getUserProfile()
  }
  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
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


  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };  


  getUserProfile = () => {
    axios.get(`/api/profile/${this.props.user.user_id}`)
      .then(res => {
        console.log(res.data)
        this.setState({basicInfo: res.data[0].basic_info, interests: res.data[0].interests_list, url: res.data[0].img_url})
      })
      .catch(err => console.log(err))
  }


  handleEditInfoToggle = () => {
    this.setState({ editInfoToggle: !this.state.editInfoToggle });
  };
  editInfo = () => {
    console.log(this.props)
    axios
      .put(`/api/editinfo/${this.props.user.user_id}`, {
        basic_info: this.state.basicInfo,
      })
      .then((res) => {
        console.log(res.data)
        this.setState({basicInfo: res.data[0].basic_info, interests: res.data[0].interests_list, url: res.data[0].img_url})
        this.handleEditInfoToggle();
      })
      .catch((err) => console.log(err));
  };


  handleEditInterestsToggle = () => {
    this.setState({editInterestToggle: !this.state.editInterestToggle})
  };
  editInterests = () => {
    console.log(this.props)
    axios
      .put(`/api/editinterests/${this.props.user.user_id}`, {
        interests_list: this.state.interests,
      })
      .then((res) => {
        console.log(res.data)
        this.setState({interests: res.data[0].basic_info, interests: res.data[0].interests_list, url: res.data[0].img_url})
        this.handleEditInterestsToggle();
      })
      .catch((err) => console.log(err));
  };
  handleOccasionButton = () => {
    this.props.history.push(`/events/${this.props.user.user_id}`)
    
  }

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
    console.log(this.props)
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
              margin: 10,
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
        <button onClick={this.handleLogout}>Logout</button>
        <button onClick={this.handleOccasionButton}>Go To Events</button>
        <div className='other-flex'>
          <section className='interests-flex'>
         {!this.state.editInterestToggle ? (
          <div >
            <p>{this.state.interests}</p>
            <button onClick={this.handleEditInterestsToggle}>Edit Interests</button>
          </div>
        ) : (
          <div>
            <input
              value={this.state.interests || ''}
              name="interests"
              placeholder="Create your interests here!"
              onChange={(e) => this.handleInput(e)}
            />
            <button onClick={this.editInterests}>Submit Interests</button>
          </div>
        )}
        </section>  
        <section className='info-flex'>
          {!this.state.editInfoToggle ? (
          <div >
            <p>{this.state.basicInfo}</p>
            <button onClick={this.handleEditInfoToggle}>Edit Info</button>
          </div>
        ) : (
          <div>
            <input
              value={this.state.basicInfo || ''}
              name="basicInfo"
              placeholder="Create your basic info here!"
              onChange={(e) => this.handleInput(e)}
            />
            <button onClick={this.editInfo}>Submit Info</button>
          </div>
        )}
        </section>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { getUser, clearUser })(Profile);
