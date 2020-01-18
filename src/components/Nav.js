import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom';


export default class Nav extends Component {

    
    handleSubmit = e => {
        const topic = e.target.innerText;
        this.props.onClick(topic);
    }

    render(){
        return(
            <nav className="main-nav">
                <ul>
                    <li><NavLink to='/search/cats' onClick={this.handleSubmit}>Cats</NavLink></li>
                    <li><NavLink to='/search/dogs' onClick={this.handleSubmit}>Dogs</NavLink></li>
                    <li><NavLink to='/search/birds' onClick={this.handleSubmit}>Birds</NavLink></li>
                </ul>
            </nav>
            );
    }

}  

