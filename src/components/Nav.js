import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

class Nav extends Component {
    handleClick = (event) => {
        const link = event.target.getAttribute('href')
        this.props.getRedirect(link)
    }

    render() {
        return (
            <nav className='nav'>
                <ul>
                    <li><NavLink to='/home' exact activeClassName='active'>Home</NavLink></li>
                    <li><NavLink to='/add' exact activeClassName='active' onClick={this.handleClick}>New Question</NavLink></li>
                    <li><NavLink to='/leaderboard' exact activeClassName='active' onClick={this.handleClick}>Leader Board</NavLink></li>
                </ul>
            </nav>
        )
    }
}

Nav.propTypes = {
    getRedirect: PropTypes.func.isRequired
}

export default Nav
