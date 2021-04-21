import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import PropTypes from "prop-types";

class Auth extends Component {
    render() {
        const { authedUser, children } = this.props
        const isUserAuthenticated = !isEmpty(authedUser);

        return (
            isUserAuthenticated ? children : <Redirect to='/' />
        )
    }
}

Auth.propTypes = {
    authedUser: PropTypes.string.isRequired
};

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Auth)
