import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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
    componentDidMount() {
        if(isEmpty(this.props.authedUser)) {
            this.props.dispatch(handleInitialData())
        }
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className='container'>
                        <div className='top-nav'>
                            <Nav/>
                            <UserDetails />
                        </div>
                        {this.props.loading
                            ? null
                            :
                            <Switch>
                                <Route exact path='/' component={Welcome} />
                                <Auth>
                                    <Route exact path='/home' component={Home} />
                                    <Route exact path='/question-poll/:id' component={QuestionPoll} />
                                    <Route exact path='/new' component={NewQuestion} />
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

function mapStateToProps ({ users, authedUser }) {
    return {
        loading: isEmpty(users),
        authedUser: authedUser
    }
}

export default connect(mapStateToProps)(App)
