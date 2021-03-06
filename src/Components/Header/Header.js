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
                <Link to = '/auth' className='nav-links'>Login</Link>
                <Link to = '/profile' className='nav-links'>Profile</Link>
                <Link to = '/blog' className='nav-links'>Blog</Link>
                <Link to = '/calendar' className='nav-links'>Calendar</Link>
                <Link to = '/groups' className='nav-links'>Groups</Link> 
            </nav>
            )
            : null}
            </header>
        </div>
        )
    }
}
export default withRouter(Header)