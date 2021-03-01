import React from 'react'
import '../StyleSheets/GroupPageContainer.css'
import BandImage from "../Images/band-image.png";
import { Link } from 'react-router-dom';

export default function GroupPageContent() {
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
                                <div className="content">
                                        <img src={BandImage} className="indicatorImage" alt="" />
                                </div>
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