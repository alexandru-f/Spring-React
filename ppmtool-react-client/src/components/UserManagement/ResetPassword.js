import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {validateToken, resetPassword} from '../../actions/securityActions';
import classnames from 'classnames';
import { Link } from 'react-router-dom';


class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            newPassword: '',
            confirmNewPassword: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const queryValues = queryString.parse(this.props.location.search);
        const token = queryValues.token;
        this.props.validateToken(token);
    }

    onSubmit(e) {
        e.preventDefault();
        const passwordObject = {
            newPassword: this.state.newPassword,
            confirmNewPassword: this.state.confirmNewPassword
        }

        const queryValues = queryString.parse(this.props.location.search);
        const token = queryValues.token;
        this.props.resetPassword(passwordObject, token, this.props.history);
    }


    render(){

        const {isPassTokenValid, errors} = this.props;
        

        let boardContent;

        const displayAlgorithm = isPassTokenValid => {
            if (isPassTokenValid) {
                boardContent = (
                    <div className="mgt-4">
                          <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="password" className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.summary
                                    })}
                                        name="newPassword"
                                        placeholder="Enter your password"
                                        value={this.state.newPassword}
                                        onChange={this.onChange}
                                    />
                                    {errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control form-control-lg"
                                        placeholder="Confirm new password"
                                        name="confirmNewPassword"
                                        value={this.state.confirmNewPassword}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                    </div>
                );
            } else {
                boardContent = (
                    <div>
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.tokenNotFound || errors.tokenExpired}
                        </div>
                        <Link to="/forgotPassword" className="btn btn-info center-inline-btn">Click to retry password recovery</Link>
                    </div>
                );
            }
        };
        displayAlgorithm(isPassTokenValid);
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center mb-4">Reset your password</h1>
                        {boardContent}
                    </div>
                </div>
        </div>
        );
    }
}

ResetPassword.propTypes = {
    errors: PropTypes.object.isRequired,
    validateToken: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    isPassTokenValid: state.security.isPassTokenValid
});

export default connect(mapStateToProps, {validateToken, resetPassword})(ResetPassword);