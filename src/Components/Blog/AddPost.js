import React, {Component} from 'react';
import axios from 'axios'

class AddPost  extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: ''
          };
    }

    submit=()=> {
        axios.post('/api/post', this.state)
          .then(() => {this.props.history.push('/blog')})
          .catch((err) => console.log(err))
    }
    
    
    render() {
       
        return (
            <div>
            <h2 className='title'>New Post</h2>
            <div className='form-main'>
          <div className='form-input-box'>
            <p>Title:</p>
            <input value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
          </div>
          {/* <img className='form-img-prev' src={imgSrc} alt='preview'/> */}
          <div className='form-input-box'>
            <p>Image URL:</p>
            <input value={this.state.img} onChange={e => this.setState({ img: e.target.value })} />
          </div>
          <div className='form-text-box'>
            <p>Content:</p>
            <textarea value={this.state.content} onChange={e => this.setState({ content: e.target.value })} />
          </div>
        </div>
        <button onClick={this.submit} >Post</button>


            </div>
        );
    }
}
export default AddPost;