import React from 'react'

class Form extends React.Component {
    state= {
        groupName: '',
        members: '',
        neededInstruments: ''
    }

    change = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit()
        console.log(this.state);
    }


    render() {
        return(
            <form>
                <input
                name= 'Group Name'
                placeholder='Group Name' 
                value={this.state.groupName} 
                onChange={e => this.change(e)}
                />
                <br />
                <input
                name= 'Members'
                placeholder='Members' 
                value={this.state.members} 
                onChange={e => this.change(e)}
                />
                <br />
                <input
                name= 'Members Needed'
                placeholder='Members Needed' 
                value={this.state.needInstruments} 
                onChange={e => this.change(e)}/>
                <br />
                <button onClick={e => this.onSubmit(e)}>Submit Group</button>
            </form>
        );
    }
}