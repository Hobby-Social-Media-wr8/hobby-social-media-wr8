import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './Blog.css'

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      myPosts: true,
      oldestFirst: false,
      posts: [],
      loading: true,
    };
  }
  componentDidMount = () => {
    this.grabPosts();
    this.reset();
  };

  grabPosts=() =>{
    let { search, myPosts, oldestFirst } = this.state;
    let url = "/api/posts";
    if (myPosts && !search) {
      oldestFirst ? (url += "?mine=true&oldest=true") : (url += "?mine=true");
    } else if (!myPosts && search) {
      oldestFirst
        ? (url += `?search=${search}&oldest=true`)
        : (url += `?search=${search}`);
    } else if (myPosts && search) {
      oldestFirst
        ? (url += `?mine=true&search=${search}&oldest=true`)
        : (url += `?mine=true&search=${search}`);
    } else {
      if (oldestFirst) {
        url += "?oldest=true";
      }
    }
    axios.get(url).then((res) => {
      this.setState({ posts: res.data, loading: false });
    });
  }

  deletePost = (post_id) => {
    axios.delete(`/api/post/${post_id}`).then((_) => this.grabPosts());
  };

  reset = () => {
    let { myPosts } = this.state;
    let url = "/api/posts";
    if (myPosts) {
      url += "?mine=true";
    }
    axios.get(url).then((res) => {
      this.setState({ posts: res.data, loading: false, search: "" });
    });
  };

  render() {
     

    let { loading, search, posts, myPosts, oldestFirst } = this.state;

    let mappedPosts = posts.map((post) => {
      return (
        <div className="content-box dash-post-box" key={post.post_id}>
          <img src={post.img} alt={post.title} />
          <div className='post-content'>
            <p className='timestamp'>{post.date_created}</p>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          {post.author_username === this.props.user.username ? (
            <button onClick={(_) => this.deletePost(post.post_id)}>
              delete your post
            </button>
          ) : (
            <div className="author-box">
            <Link to={`/chat/${post.author_id}`}
            style={{ textDecoration: "none" }}
            >

              <p
            style={{ color: "white" }}
              
              >Start Chat</p>
            </Link>
            <p
            >by {post.author_username}</p>
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="dash">
        <div className="content-box dash-filter">
          <div className="dash-search-box">
            <input
              value={search}
              onChange={(e) => this.setState({ search: e.target.value })}
              className="dash-search-bar"
              placeholder="Search by Title"
            />
            <button onClick={this.grabPosts} className="dark-button">
              Search
            </button>
            <button onClick={this.reset} className="dark-button">
              Reset
            </button>
          </div>
          <div className="dash-check-box">
            <p>Show My Posts</p>
            <input
              checked={myPosts}
              onChange={(_) =>
                this.setState({ myPosts: !myPosts }, this.grabPosts)
              }
              type="checkbox"
            />
          </div>
          <div className="dash-check-box">
            <p>Oldest to Newest</p>
            <input
              checked={oldestFirst}
              onChange={(_) =>
                this.setState({ oldestFirst: !oldestFirst }, this.grabPosts)
              }
              type="checkbox"
            />
          </div>
          <Link to="/add-post" className='add-post-button' style={{ textDecoration: "none" }}>
            <h1 style={{ color: "white" }}>Add Post+</h1>
          </Link>
        </div>
        <div className="content-box dash-posts-container">
          {!loading ? (
            mappedPosts
          ) : (
            <div className="load-box">
              <div className="load-background"></div>
              <div className="load"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Blog);
