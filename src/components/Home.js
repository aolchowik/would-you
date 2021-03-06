import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './question-list/Question';
import sortBy from "lodash/sortBy";
import PropTypes from 'prop-types';

class Home extends Component {
    state = {
        showUnansweredQuestions: true
    }

    switchTab = (tabName) => {
        this.setState({
            showUnansweredQuestions: tabName === 'unanswered'
        })
    }

    render() {
        const { answeredQuestions, unAnsweredQuestions } = this.props
        const { showUnansweredQuestions } = this.state

        return (
            <div className='home'>
                <ul className='question-list-nav'>
                    <li className={showUnansweredQuestions ? 'active':''}><button onClick={() => this.switchTab('unanswered')}>Unanswered questions</button></li>
                    <li className={!showUnansweredQuestions ? 'active':''}><button onClick={() => this.switchTab('answered')}>Answered questions</button></li>
                </ul>
                <ul className={'unanswered-questions question-list'.concat(showUnansweredQuestions ? ' active':'')}>
                {unAnsweredQuestions.map((question) => {
                    return (
                        <li className='question-list-element' key={question.id}>
                            <Question question_id={question.id} />
                        </li>
                    )
                })}
                </ul>
                <ul className={'answered-questions question-list'.concat(!showUnansweredQuestions ? ' active':'')}>
                    {answeredQuestions.map((question) => {
                        return (
                            <li className='question-list-element' key={question.id}>
                                <Question question_id={question.id} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

Home.propTypes = {
    answeredQuestions: PropTypes.array.isRequired,
    unAnsweredQuestions: PropTypes.array.isRequired,
}

function mapStateToProps({questions, users, authedUser}) {
    const allQuestions = Object.values(questions);
    const userAnsweredQuestions = Object.keys(users[authedUser].answers)
    const unAnsweredQuestions = allQuestions.filter( ( el ) => !userAnsweredQuestions.includes( el.id ));
    const answeredQuestions = allQuestions.filter( ( el ) => userAnsweredQuestions.includes( el.id ));

    return {
        answeredQuestions: sortBy(answeredQuestions, 'timestamp').reverse(),
        unAnsweredQuestions: sortBy(unAnsweredQuestions, 'timestamp').reverse(),
    }
}

export default connect(mapStateToProps)(Home)
