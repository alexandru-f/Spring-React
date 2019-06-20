import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import { changePassword } from '../../actions/securityActions';


class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const changePassRequest = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmNewPassword: this.state.confirmNewPassword
        };
        this.props.changePassword(changePassRequest, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    render() {
        const {user, passChange} = this.props.security;
        const {errors} = this.props;

        let passwordTitle;
        
        if (passChange) {
            passwordTitle = (
                <div className="password-success text-center">{passChange + '!'}</div>
            );
        }

        return(
            <div className="account-page">
                 <div className="container">
                    <div className="account-wrapper">
                    <h1>Account overview</h1>
                   <div className="card card-body bg-light mb-3 well">
                    <h3>Profile</h3>
                        <h4>User Id: </h4>
                        <p>{user.id}</p>
                        <h4>Full name: </h4>
                        <p>{user.fullName}</p>
                        <h4>Email/Username:</h4>
                        <p>{user.username}</p>
                        <div className="forgot-password">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 m-auto">
                                        <h1 className="display-4 text-center">Change Password</h1>
                                        <form onSubmit = {this.onSubmit}>
                                            <div className="form-group">
                                            <input type="password" className={classnames("form-control form-control-lg", {"is-invalid": errors.oldPassword})} placeholder="Old password" name="oldPassword"
                                                value={this.state.oldPassword} 
                                                onChange={this.onChange}
                                            />
                                                {
                                                    errors && (<div className="invalid-feedback">{errors.oldPassword}</div>)
                                                }   
                                            </div>
                                            <div className="form-group">
                                            <input type="password" className={classnames("form-control form-control-lg", {"is-invalid": errors.newPassword})} placeholder="New password" name="newPassword"
                                                value={this.state.newPassword} 
                                                onChange={this.onChange}
                                            />
                                                     {
                                                    errors && (<div className="invalid-feedback">{errors.newPassword}</div>)
                                                }   
                                            </div>
                                            <div className="form-group">
                                            <input type="password" className={classnames("form-control form-control-lg", {"is-invalid": errors.confirmNewPassword})} placeholder="Confirm new password" name="confirmNewPassword"
                                                value={this.state.confirmNewPassword} 
                                                onChange={this.onChange}
                                            />
                                                     {
                                                    errors && (<div className="invalid-feedback">{errors.confirmNewPassword}</div>)
                                                }   
                                            </div>
                                            {passwordTitle}
                                            <input type="submit" className="btn btn-info btn-block mt-4" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                    </div>
                </div >
            </div>
        );
    }
}

UserProfile.propTypes = {
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors,

});

export default connect(mapStateToProps, {changePassword})(UserProfile);