import React from 'react'
import "../StyleSheets/GroupPage.css"
import { AiOutlineMenu } from "react-icons/ai";
import GroupPageContent from './GroupPageContent';

function GroupPage() {
    return (
            <>
                    <div className="groupContainer">
                            <div className="headercontent">
                                <div className="heading">
                                        <h1 className="LogoText">Band Social</h1>
                                </div>
                            </div>
                    </div>
                    <GroupPageContent />
            </>
    )
}

export default GroupPage