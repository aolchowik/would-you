import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import PropTypes from 'prop-types';

class UserDetails extends Component {
    handleLogout = (event) => {
        event.preventDefault()

        const { dispatch } = this.props
        dispatch(setAuthedUser(''))
    }

    render() {
        const { authedUser, users } = this.props
        const userName = users[authedUser]?.name || ''
        const avatar = users[authedUser]?.avatarURL || ''
        return (
            <Fragment>
                {authedUser ?
                    <div className='user-details'>
                        <div>Hello {userName}</div>
                        <img
                            src={avatar}
                            alt={`Avatar of ${userName}`}
                            className='avatar'
                        />
                        <button onClick={this.handleLogout}>logout</button>
                    </div>
                    :
                    null
                }
            </Fragment>
        )
    }
}

UserDetails.propTypes = {
    authedUser: PropTypes.string,
    users: PropTypes.object.isRequired,
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(UserDetails)
