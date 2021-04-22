import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {getAvailablePages} from "../helpers/common";

class Welcome extends Component {
    state = {
        option: '',
        shouldRedirect: false,
        redirectTo: '/home'
    }

    componentDidMount() {
        this.setState({toHome: Boolean(this.props.authedUser)})
    }

    handleChange = (event) => {
        this.setState({option: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { option } = this.state
        const { dispatch, redirectTo } = this.props

        dispatch(setAuthedUser(option))

        this.setState(() => ({
            option: '',
            shouldRedirect: true,
            redirectTo: redirectTo
        }))
    }

    render() {
        const { users } = this.props
        const { option, shouldRedirect, redirectTo } = this.state
        const availablePages = getAvailablePages()

        if(shouldRedirect) {
            return (availablePages.includes(redirectTo.split('/')[1])) ? <Redirect to={redirectTo} /> : <Redirect to='/not-found' />
        }

        return (
            <div className='form-page'>
                <h4>Welcome to the Would You Rather App!</h4>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In</h3>
                    <select id='authedUser' value={option} onChange={this.handleChange}>
                        <option key='chooseUser' value=''>Select User</option>
                        {users.map((user) => {
                            return <option key={user.id} value={user.id}>{user.name}</option>
                        })}
                    </select>
                    <button
                        type='submit'
                        disabled={option === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

Welcome.propTypes = {
    redirectTo: PropTypes.string,
    users: PropTypes.array.isRequired,
    authedUser: PropTypes.string
}

function mapStateToProps ({users, authedUser}) {
    const mappedUsers = Object.keys(users).map((userKey) => {
        return users[userKey]
    })

    return {
        users: mappedUsers,
        authedUser
    }
}

export default connect(mapStateToProps)(Welcome)
