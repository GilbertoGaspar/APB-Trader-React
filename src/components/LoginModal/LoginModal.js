import React, {Component} from 'react'

import classes from './LoginModal.module.scss'

export default class LoginModal extends Component {

    state = {
        email : '',
        pass : ''
    }

    render() {

        //Displays default modal to login.
        let currentModal = (
            <div className={`modal fade ${classes['text-black']}`} id="loginModalCenter" tabIndex="-1" role="dialog" aria-labelledby="loginModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLongTitle">Log In</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Email</span>
                            </div>
                            <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1"
                                onChange={(event) => this.setState({ email : event.target.value })}/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Password</span>
                            </div>
                            <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
                                onChange={(event) => this.setState({ pass : event.target.value })}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-outline-success" 
                            onClick={() => this.props.register(this.state.email, this.state.pass)}>Register</button>
                        <button type="button" className="btn btn-success" 
                            onClick={() => this.props.login(this.state.email, this.state.pass)}>Login</button>
                    </div>
                    </div>
                </div>
            </div>
        )
        
        //If there is a current user show them the logout modal.
        if(this.props.currentUser) {
            currentModal = (
                    <div className={`modal fade ${classes['text-black']}`} id="loginModalCenter" tabIndex="-1" role="dialog" aria-labelledby="loginModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLongTitle">Log Out?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Would you like to logout?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                <button type="button" className="btn btn-success" 
                                    onClick={() => this.props.logout()}>Yes</button>
                            </div>
                            </div>
                        </div>
                    </div>
            )
        }

        return (
            <React.Fragment>
                {currentModal}
            </React.Fragment>
        )
    }
}
