import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                //user will see nothing for the null case
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>
            default:
                return [
                <li key="1"><Payments /></li>,
                <li key="3" style={{ margin: '0 10px' }}>
                    Credits: {this.props.auth.credits}
                </li>,
                <li key="2"><a href='/api/logout'>Logout</a></li>
                ];
        }
    }    
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <Link 
                            //this.props.auth exists if signed in, send to surveys, otherwise route to home
                            to={this.props.auth ? '/surveys' : '/'} 
                            className="left brand-logo"
                        >
                            Emaily
                        </Link>
                        <ul id="nav-mobile" className="right">
                            {this.renderContent()}
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

//destructure auth piece of state in mapStateToProps and return it
function mapStateToProps({ auth }) {
    return {
        auth
    };
}

export default connect(mapStateToProps)(Header);