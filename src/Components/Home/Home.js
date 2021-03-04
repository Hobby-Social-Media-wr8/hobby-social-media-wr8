import { Component } from "react";
import '../Home/Home.css'

class Home extends Component {
  constructor(props){
    super(props)
  }

  handleLoginButton = () => {
    this.props.history.push('/auth')
  }
  handleGroupsButton = () => {
    this.props.history.push('/groups')
  }
  handleEventsButton = () => {
    this.props.history.push('/calendar')
  }

  render() {
    return (
      <div className='home-container'>
        <div className='about-flex'>
          <h1>About Us</h1>
          <p>This website is here to connect musicians looking for that certain skill or interest in another musician. Whether you are in need of another band member, or a few more instruments for your orchestra, Band Social is here to network your needs.</p>
          <p>If you are visiting, feel free to visit the EVENTS and GROUPS page to browse the resources that might help you find that last perfect piece to your group!</p>
          <p>Although if you chose to register and login to our website, you can personalize your profile and utilize our blog along with our chat features to advertise and connect with your select musician.</p>
          <button onClick={this.handleGroupsButton}>Go to Groups</button>
          <button onClick={this.handleEventsButton}>Go to Calendar</button>
          <button onClick={this.handleLoginButton}>Go to Login</button>
        </div>
        <div className='group-event-flex'>
          <section className='group-flex'>
            <h2>Groups</h2>
            <div className='group-images'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxf2WF3FzGeZtt6WSPzj1276RArPDiftNJw&usqp=CAU' onClick={this.handleGroupsButton}/>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHFLjB_ktPd_fALTElSGF1AdWhT3BabRBjdQ&usqp=CAU'/>
              <img src='https://image.freepik.com/vektoren-kostenlos/punkrockband-tritt-auf-der-buehne-auf-gruppe-junger-teenager-maenner-und-frauen-mit-mohawks-die-waehrend-des-konzerts-isoliert-singen-und-musik-spielen_198278-1591.jpg' />
            </div>
          </section>
          <section className='event-flex'>
            <h2>Events</h2>
            <div className='event-images'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-sO2E4fNfBsT6aRemzywV9zfNllDm-RQoQ&usqp=CAU' onClick={this.handleEventsButton}/>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBGdfZxYZevaernjoNdh6V846roBH4wqhKmQ&usqp=CAU'/>
              <img src='https://www.buschsystems.com/resource-center/images/uploads/page/wast-management-planning-for-outdoor-events_template_1800x1200_header-image.jpg'/>
            </div>
            
          </section>
        </div>
        
      </div>
    );
  }
}
export default Home;
