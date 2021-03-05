import {Component} from 'react'
import '../../StyleSheets/GroupPageContainer.css'
import { Link } from 'react-router-dom';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import {GridLoader} from 'react-spinners';
import axios from 'axios';
import {connect} from 'react-redux';

class GroupsPageContent extends Component {
        constructor(props) {
                super(props);
        }
        deleteGroup =(group_id)=>{
                axios.delete(`api/group/${group_id}`)
                .then(_=>this.props.getAllGroups())
        }
        render(){
        console.log(this.props)
        const mappedGroups = this.props.group.map((group) => {
                console.log(group)
                return (
                        <div className="contentContainer" key={group.group_id}>
                        <div className="GroupName">
                                {group.group_name}
                        </div>
                        <div className="GroupLocation">
                                        {group.group_location}
                                </div>
                        
                        {group.user_id===this.props.user.user_id ?(
                                <button className="DeleteButton" onClick={(_)=>this.deleteGroup(group.group_id)}>Delete Group</button>
                        ):(
                                null
                        )}






                        <div className="mainContainers">
                                <div className="imagecontainer">
                                <div className="co-heading">
                                        <p className="co-heading-text"></p>
                                        <img
                                                src={group.img_url}
                                        />
                                </div>
                                </div>
                                <div className="GroupDescription">
                                        <h4>{group.group_text}</h4>
                                </div>
                                <div className="flex-div">
                                <div className="list-content">
                                        <p>{group.group_instruments}</p>
                                </div>
                                <div className="footerBox">
                                <div className="memberContent">
                                <div className="memberHeading">
                                        <p className="textHeading">Needed Band Members</p>
                                </div>
                                <div className="MemberslistContainer">
                                        <div className="contactList">
                                                <div className="NeededMembers">
                                                        <p>{group.group_needed_members}</p>
                                                </div>
                                        </div>
                                </div>
                                </div>
                                </div>
                                <div className="btn">
                                                <Link to={`/chat/${group.user_id}`} className="contactwithus">
                                                        <button>Contact Us</button>
                                                </Link>
                                        </div>
                                </div>
                        </div>
                        </div>
                )
        })
    return (
            <div>
                {mappedGroups}
            </div>
        )
    }
}
function mapStateToProps(state){
        return state;
}
export default connect(mapStateToProps)(GroupsPageContent)