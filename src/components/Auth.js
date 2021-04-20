import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

class Auth extends Component {
    render() {
        const { authedUser, children } = this.props
        const isUserAuthenticated = !isEmpty(authedUser);

        return (
            isUserAuthenticated ? children : <Redirect to='/' />
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Auth)
