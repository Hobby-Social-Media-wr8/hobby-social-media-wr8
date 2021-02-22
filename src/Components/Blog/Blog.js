import React, {Component} from 'react';
import axios from 'axios'

class Blog extends Component {
    constructor(props){
        super(props);
        this.state={
            posts: []
        }
        
          };
    
    render() {
       
        return (
            <div>
                <main>
                    Blog
                </main>
            </div>
        );
    }
}
export default Blog;