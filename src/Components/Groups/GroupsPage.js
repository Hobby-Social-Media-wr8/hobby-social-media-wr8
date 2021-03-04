import {Component} from 'react'
// import "../StyleSheets/GroupPage.css"
// import { AiOutlineMenu } from "react-icons/ai";
import GroupPageContent from '../Groups/GroupsPageContent';
import "../../StyleSheets/GroupPage.css"
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import {GridLoader} from 'react-spinners';
import axios from 'axios'


class GroupsPage extends Component {
        constructor(props) {
                super(props);
                this.state = {
                }
                
        }
        handleInput = (event) => {
                this.setState({ [event.target.name]: event.target.value });
        };
        render() {
                return(
                        <div className="groups-container">
                        <>
                        <div className="groupContainer">
                            <div className="headercontent">
                                <div className="heading">
                                        <h1 className="LogoText"></h1>
                                </div>
                            </div>
                    </div>
                    <GroupPageContent />
                    </>
                </div>
                )
        }
}

export default GroupsPage