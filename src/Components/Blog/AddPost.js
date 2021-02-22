import React, {Component} from 'react';

class AddPost  extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: ''
          };
    }
    render() {
       
        return (
            <div>
                <main>
                    AddPost
                </main>
            </div>
        );
    }
}
export default AddPost;