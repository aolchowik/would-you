import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import LoadingBar from 'react-redux-loading'
import QuestionPoll from './question-poll-form/QuestionPoll'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Welcome from './Welcome'
import Home from './Home'
import Nav from './Nav'
import Auth from './Auth'
import isEmpty from 'lodash/isEmpty'
import UserDetails from './UserDetails'

class App extends Component {
    state = {
        redirectTo: '/home',
    }

    componentDidMount() {
        if(isEmpty(this.props.authedUser)) {
            this.props.handleInitialData()
        }
    }

    getRedirect = (redirectTo) => this.setState({redirectTo})

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        <div className='top-nav'>
                            <Nav getRedirect={this.getRedirect}/>
                            <UserDetails />
                        </div>
                        {this.props.loading
                            ? null
                            :
                            <Switch>
                                <Route exact path='/' render={() => <Welcome redirectTo={this.state.redirectTo} />} />
                                <Auth>
                                    <Route exact path='/home' component={Home} />
                                    <Route exact path='/questions/:question_id' component={QuestionPoll} />
                                    <Route exact path='/add' component={NewQuestion} />
                                    <Route exact path='/leaderboard' component={LeaderBoard} />
                                </Auth>
                            </Switch>
                        }
                    </div>
                </Fragment>
            </Router>
        )
    }
}

App.propTypes = {
    handleInitialData : PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    authedUser: PropTypes.string
};

function mapStateToProps ({ users, authedUser }) {
    return {
        loading: isEmpty(users),
        authedUser: authedUser
    }
}

export default connect(mapStateToProps, { handleInitialData })(App)
