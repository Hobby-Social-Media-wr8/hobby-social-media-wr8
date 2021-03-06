import React, { Component } from "react";
import axios from "axios";
import "./AddPost.css";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";

class AddPost extends Component {
  constructor() {
    super();
    this.state = {
      url:
        "https://i.stack.imgur.com/y9DpT.jpg",
      title: "",
      // img: "",
      content: "",
      isUploading: false,
    };
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type,
        },
      })
      .then((response) => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };

    axios
      .put(signedRequest, file, options)
      .then((response) => {
        this.setState({ isUploading: false, url });
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch((err) => {
        this.setState({
          isUploading: false,
        });
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  submit = () => {
    const {title, url, content} = this.state
    axios
      .post("/api/post", {title, url, content})
      .then(() => {
        this.props.history.push("/blog");
      })
      .catch((err) => console.log(err));
  };

  render() {
    // console.log(this.state)
    const { url, isUploading } = this.state;
    return (
      <div className="addpost-main">
        <h2 className="title">New Post</h2>

        <img src={url} alt="" height="250px" width="250px" />
        <h2>Upload Below</h2>
        <Dropzone onDropAccepted={this.getSignedRequest} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                position: "relative",
                width: 160,
                height: 80,
                borderWidth: 5,
                marginTop: 10,
                borderColor: "gray",
                borderStyle: "dashed",
                borderRadius: 5,
                display: "inline-block",
                fontSize: 17,
              }}
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
            </div>
          )}
        </Dropzone>
        <div className="form-main">
          <div className="form-input-box">
            <p>Title:</p>
            <input
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </div>
         
          <div className="form-text-box">
            <p>Content:</p>
            <textarea
              value={this.state.content}
              onChange={(e) => this.setState({ content: e.target.value })}
            />
          </div>
          <button onClick={this.submit}>Post</button>
        </div>
      </div>
    );
  }
}
export default AddPost;
