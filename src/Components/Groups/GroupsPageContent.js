import React from 'react'
<<<<<<< HEAD:src/Components/Groups/GroupsPageContent.js
// import '../StyleSheets/GroupPageContainer.css'
=======
import '../../StyleSheets/GroupPageContainer.css'
>>>>>>> main:src/Components/Groups/GroupPageContent.js
import { Link } from 'react-router-dom';
import "../../StyleSheets/GroupPageContainer.css"
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import {GridLoader} from 'react-spinners';

export default function GroupsPageContent() {
        return (
                <div className="contentContainer">
                        <div className="mainHeading">
                        <h2 className="headingtxt">
                                Group Page
                        </h2>
                        </div>
                        <div className="mainContainers">
                                <div className="imagecontainer">
                                <div className="co-heading">
                                        <p className="co-heading-text">Anything But Human</p>
                                </div>
<<<<<<< HEAD:src/Components/Groups/GroupsPageContent.js
=======
                                <div className="content">
                                        <img className="indicatorImage" alt="" />
>>>>>>> main:src/Components/Groups/GroupPageContent.js
                                </div>
                                <div className="listContainer">
                                <div className="co-heading">
                                        <p className="co-heading-text">Band Members</p>
                                </div>
                                <div className="list-content">
                                        <ul className="unordered">
                                                <li className="listItems">Member 01</li>
                                                <li className="listItems">Member 02</li>
                                                <li className="listItems">Member 03</li>
                                                <li className="listItems">Member 04</li>
                                                <li className="listItems">Member 05</li>
                                                <li className="listItems">Member 06</li>
                                                <li className="listItems">Member 07</li>
                                                <li className="listItems">Member 08</li>
                                                <li className="listItems">Member 09</li>
                                                <li className="listItems">Member 10</li>
                                                <li className="listItems">Member 11</li>
                                                <li className="listItems">Member 12</li>
                                                <li className="listItems">Member 13</li>
                                                <li className="listItems">Member 14</li>
                                                <li className="listItems">Member 15</li>
                                        </ul>
                                </div>
                                </div>
                        </div>
                        <div className="footerBox">
                                <div className="memberContent">
                                <div className="memberHeading">
                                        <p className="textHeading">Needed Band Members</p>
                                </div>
                                <div className="MemberslistContainer">
                                        <div className="contactList">
                                                <ul className="membercontentList">
                                                        <li className="memberlistItems">Drummers</li>
                                                        <li className="memberlistItems">Keyboard</li>
                                                        <li className="memberlistItems">Violinist</li>
                                                </ul>
                                        </div>
                                        <div className="btn">
                                                <Link to="/chat" className="contactwithus">
                                                        Contact With Us
                                                </Link>
                                        </div>
                                </div>
                                </div>
                        </div>
                </div >
        )
}