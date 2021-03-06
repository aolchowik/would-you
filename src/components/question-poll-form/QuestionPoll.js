import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleAnswerQuestion } from '../../actions/shared';
import QuestionResults from './QuestionResults';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

class QuestionPoll extends Component {
    constructor() {
        super();
        this.state = {
            selectedOption: 'optionOne',
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { selectedOption } = this.state
        const { dispatch, question, authedUserDetails } = this.props

        dispatch(handleAnswerQuestion(authedUserDetails, question, selectedOption))
    }

    onValueChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });
    }

    render() {
        const { author, question, answer, votes } = this.props
        const shouldRedirectTo404 = isEmpty(question)

        if(shouldRedirectTo404) {
            return (<Redirect to='/not-found' />)
        }
        const {
            name,
            avatarURL
        } = author;
        const questionTitle = answer ? `Asked by ${name}` : `${name} asks:` || ''
        const wouldYouRather = 'Would you rather'
        const answerTitle = answer ? 'Results:' : `${wouldYouRather}:`

        return (
            <div className='question'>
                <span>{questionTitle}</span>
                <div className='question-details'>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar'
                    />
                    <div className='question-info'>
                        <h2>{answerTitle}</h2>
                        { answer ?
                            <QuestionResults votes={votes} question={question} answer={answer} />
                            :
                            <form className='poll-form' onSubmit={this.handleSubmit}>
                                <div>
                                    <label>
                                        <input
                                            type='radio'
                                            name='poll'
                                            value='optionOne'
                                            checked={this.state.selectedOption === 'optionOne'}
                                            onChange={this.onValueChange}/>
                                        {question.optionOne.text}
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            name='poll'
                                            value='optionTwo'
                                            checked={this.state.selectedOption === 'optionTwo'}
                                            onChange={this.onValueChange}
                                        />
                                        {question.optionTwo.text}
                                    </label>
                                </div>
                                <button
                                    className='btn'
                                    type='submit'>
                                    Submit
                                </button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

QuestionPoll.propTypes = {
    answer: PropTypes.string,
    author: PropTypes.object.isRequired,
    authedUserDetails: PropTypes.object.isRequired,
    question: PropTypes.object,
    votes: PropTypes.object.isRequired,
}

function mapStateToProps({questions, users, authedUser}, props) {
    const { question_id } = props.match.params
    const question = questions[question_id]

    let answer = ''
    let author = {}
    let authedUserDetails = {}
    let votes = {}

    if(question) {
        const authedUserDetails = users[authedUser]
        const answers = authedUserDetails.answers
        const votesNumber = question.optionOne.votes.length + question.optionTwo.votes.length
        answer = answers[question_id]
        author = users[question.author]
        votes = {
            all: votesNumber,
            optionOne: question.optionOne.votes.length,
            optionTwo: question.optionTwo.votes.length,
        }
    }

    return {
        answer,
        author,
        authedUserDetails,
        question,
        votes
    }
}

export default connect(mapStateToProps)(QuestionPoll)
