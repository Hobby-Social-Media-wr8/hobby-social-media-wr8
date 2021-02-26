import { Component } from "react";
import '../Home/Home.css'

class Home extends Component {
  constructor(props){
    super(props)
  }

  handleLoginButton = () => {
    this.props.history.push('/auth')
  }

  render() {
    return (
      <div className='home-container'>
        <h1 style={{textAlign: 'left'}}>Band Social</h1>
        <section className='about-flex'>
          <h1 style={{textAlign: 'left'}}>About Us</h1>
          <p>Claws in your leg love blinks and purr purr purr purr yawn, so stick butt in face, so i am the best but cat dog hate mouse eat string barf pillow no baths hate everything. Prow?? ew dog you drink from the toilet, yum yum warm milk hotter pls, ouch too hot throwup on your pillow nyan nyan goes the cat, scraaaaape scraaaape goes the walls when the cat murders them with its claws for jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed. Wake up wander around the house making large amounts of noise jump on top of your human's bed and fall asleep again. </p>
          <button onClick={this.handleLoginButton}>Go to Login</button>
        </section>
        <section className='group-event-flex'>
          <h2>Groups</h2>
        </section>
        <section className='group-event-flex'>
          <h2>Events</h2>
        </section>
      </div>
    );
  }
}
export default Home;
