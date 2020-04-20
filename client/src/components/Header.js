import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                //user will see nothing for the null case
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>
            default:
                return <li><a href='/api/logout'>Logout</a></li>
        }
    }    
    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">
                            Emaily
                        </a>
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