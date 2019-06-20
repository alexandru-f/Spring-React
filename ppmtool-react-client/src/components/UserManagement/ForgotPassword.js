import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {recoverPassword, clearIsRecoverPassOk} from '../../actions/securityActions';
import { Link } from "react-router-dom";

class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            errors: {}
        };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }
    
    //"Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder."

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentWillUnmount(){
        this.props.clearIsRecoverPassOk();
    }

    onSubmit(e) {
        e.preventDefault();
        const loginRequest = {
            email: this.state.email,
        };
        this.props.recoverPassword(loginRequest);
    }

    render() {
        const {errors, isRecoverPassOk } = this.props;

        let initialMessage = (
            <div>
                <p>Enter your email address and we will send you a link to reset your password.</p>
                    <form onSubmit = {this.onSubmit}>
                        <div className="form-group">
                            <input type="email" className={classnames("form-control form-control-lg", {"is-invalid": (errors.email || errors.usernameNotFound )})} 
                            placeholder="Enter your email address" 
                            name="email" 
                            value = {this.state.email}
                            onChange = {this.onChange}
                            />
                            {
                                (errors) && (<div className="invalid-feedback">{(errors.email || errors.usernameNotFound)}</div>)
                            }
                        </div>
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
            </div>
        );

        let showOkMessage;

        if (isRecoverPassOk) {
            showOkMessage = (
                <div className="auth-form-body mt-3">
                    <h3>Check your email for a link to reset your password.</h3>
                    <Link className="btn btn-info btn-block mt-4" to="/login">Return to login</Link>
                </div>
            );
        }



        return (
            <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center mb-4">Reset your password</h1>
                        {isRecoverPassOk ? showOkMessage : initialMessage}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

ForgotPassword.propTypes = {
    errors: PropTypes.object.isRequired,
    recoverPassword: PropTypes.func.isRequired,
    isRecoverPassOk: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    isRecoverPassOk: state.security.isRecoverPassOk
});

export default connect (mapStateToProps, {recoverPassword, clearIsRecoverPassOk})(ForgotPassword);