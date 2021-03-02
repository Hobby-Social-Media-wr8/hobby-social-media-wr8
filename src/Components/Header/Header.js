import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom';
import '../Header/Header.css'

class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            dropdownView: false
        }
    }
    toggleDropdown = () => {
        this.setState({dropdownView: !this.state.dropdownView})
      }
    render() {
    return(
        <div className='header-container'>
            <header>
                <h1>Band Social</h1>
            <div className="icon nav-icon" onClick={this.toggleDropdown}>Menu</div>
            {this.state.dropdownView
          ? (
            <nav className = 'icon-nav-icon'>
                <Link to = '/' className='nav-links'>Home</Link>
                <Link to = '/events' className='nav-links'>Events</Link>
                <Link to = '/blog' className='nav-links'>Blog</Link>
                <Link to = '/add-post' className='nav-links'>Add Post</Link>
                <Link to = '/groups' className='nav-links'>Groups</Link>
                <Link to = '/chat/:id' className='nav-links'>Chat</Link>
                <Link to = '/profile' className='nav-links'>Profile</Link>
                <Link to = '/auth' className='nav-links'>Login</Link>
            </nav>
            )
            : null}
            </header>
        </div>
        )
    }
}
export default withRouter(Header)