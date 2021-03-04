import {Component} from 'react'
import "../../StyleSheets/GroupPage.css"
// import { AiOutlineMenu } from "react-icons/ai";
import GroupPageContent from '../Group/GroupPageContent';

class GroupPage extends Component{
        constructor(){
                super()
                this.state = {}
        }
        render(){
                return (
                        <div className='groups-container'>
                                <div className='groups-flex'>
                                   <GroupPageContent />        
                                </div>
                                  
                        </div>
                
        
                )    
        }
    
}

export default GroupPage;
