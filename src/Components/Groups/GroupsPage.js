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
        handleAddButton = ()=>{
                this.props.history.push("/creategroup")
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
                <h1>Groups</h1>
                        <>
                        <div className="groupContainer">
                            <div className="headercontent">
                                <div className="heading">
                                        <button className="CreateGroup" onClick={this.handleAddButton}>Create Group</button>
                                        <h1 className="LogoText"></h1>
                                </div>
                            </div>
                    </div>
                    <GroupPageContent 
                getAllGroups={this.getAllGroups}
                      group={this.state.groups}
                    />
                    </>
                </div>
                )
        }
}

export default GroupsPage