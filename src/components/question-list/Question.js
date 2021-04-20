import React, { Component } from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
                        <Link to={`/question-poll/${id}`}>View Poll</Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({users, questions}, {id}) {
    const question = questions[id]
    const author = users[question.author]

    return {
        author,
        question
    }
}

export default connect(mapStateToProps)(Question)
