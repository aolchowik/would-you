import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFoundPage extends Component {
    render() {
        const styles = {
            textDecoration: 'underline',
        };

        return (
            <div className='center'>
                <h1>404</h1>
                <h3>No match for selected address</h3>
                <Link style={styles} to='/home'>Back to home</Link>
            </div>
        )
    }
}

export default NotFoundPage
