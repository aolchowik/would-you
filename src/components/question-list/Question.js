import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Question extends Component {
    render() {
        const { author, question } = this.props

        const {
            name,
            avatarURL
        } = author;
        const {
            id,
            optionOne
        } = question
        const questionTitle = `${name} asks:` || ''
        const questionBody = optionOne.text

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
                        <div className='title'>Would you rather:</div>
                        <div className='option-one'>{`...${questionBody}...`}</div>
                        <Link to={`/questions/${id}`}>View Poll</Link>
                    </div>
                </div>
            </div>
        )
    }
}

Question.propTypes = {
    author: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired
}

function mapStateToProps({users, questions}, {question_id}) {
    const question = questions[question_id]
    const author = users[question.author]

    return {
        author,
        question
    }
}

export default connect(mapStateToProps)(Question)
