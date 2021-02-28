import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from 'react-router-dom';
import "../StyleSheets/ChatPage.css";

export default function ChatPage() {
    return (
            <div className="main">
                    <div className="chatHeader">
                            <Link to="/group"><AiOutlineArrowLeft className="leftIcon" /></Link>
                            <div className="friendName">
                                <p className="friendNameText">Alexendra hells</p>
                            </div>
                    </div>
                    <div className="chatContent">
                            <div className="chatBody">
                                <div className="sendPortion">
                                        <input type="text" placeholder="Enter message" className="chatInput" name="chatInput" />
                                        <button className="sendBtn">Send</button>
                                </div>
                            </div>
                    </div>
            </div>
    )
}
