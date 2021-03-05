import {Component} from 'react'
// import "../StyleSheets/GroupPage.css"
// import { AiOutlineMenu } from "react-icons/ai";
import GroupPageContent from '../Groups/GroupsPageContent';
import "../../StyleSheets/GroupPage.css"
import axios from 'axios'


class GroupsPage extends Component {
        constructor(props) {
                super(props);
                this.state = {
                groups: []
                }
        }
        componentDidMount(){
          this.getAllGroups()
        }
        getAllGroups = () => {
          axios.get("/api/group").then(res => {
            this.setState({groups: res.data})
            console.log(this.state.groups)
          })
          .catch (error => console.log(error))
        }
        render() {
                return(
                        <div className="groups-container">
                <h2>Group List</h2>
                        <>
                        <div className="groupContainer">
                            <div className="headercontent">
                                <div className="heading">
                                        <h1 className="LogoText"></h1>
                                </div>
                            </div>
                    </div>
                    <GroupPageContent 
                      group={this.state.groups}
                    />
                    </>
                </div>
                )
        }
}

export default GroupsPage