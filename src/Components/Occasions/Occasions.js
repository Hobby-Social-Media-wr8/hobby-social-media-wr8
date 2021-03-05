import axios from 'axios';
import {Component} from 'react';
import { connect } from "react-redux";
import { getUser} from "../../redux/reducer";
import '../Occasions/Occasions.css'

class Occasions extends Component {
  constructor(props){
    super(props)

    this.state = {
      occasions: []
    }
  }
  componentDidMount(){
    this.getUserOccasion()
  }
  getUserOccasion = () => {
    axios.get(`/api/events/${this.props.user.user_id}`)
      .then(res => {
        console.log(res.data)
        this.setState({occasions: res.data})
      })
      .catch(err => console.log(err))
  }
  render() {
    console.log(this.state.occasions)
    const mappedOcc = this.state.occasions.map(o => {
      return(
        <div key={o.occasions_id}>
          <h1>{o.occasion_title}</h1>
          <h3>{o.occasion_description}</h3>
          <h4>{o.occasion_location}</h4>
          <img src={o.occasion_img} />
        </div>
      )
    })
    return (
      <div className='occasions-container'>
        {mappedOcc}
      </div>
    );
  }
}
const mapStateToProps = (reduxState) => reduxState;


export default connect(mapStateToProps, {getUser})(Occasions);