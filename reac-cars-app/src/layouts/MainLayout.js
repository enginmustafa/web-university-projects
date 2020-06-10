import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style.module.css'

export default class MainLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display: 'inline-block'}}>
                <ul>
                    <li className = 'nav-component-container'>
                        <Link className = 'nav-component' to="/">Home</Link>
                    </li>
                    <li className = 'nav-component-container'>
                        <Link className = 'nav-component' to="/cars">Cars</Link>
                    </li>
                    <li className = 'nav-component-container'>
                        <Link className = 'nav-component' to="/contact">Contact</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}