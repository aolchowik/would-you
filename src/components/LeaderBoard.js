import React, {Component} from 'react'
import { connect } from 'react-redux'
import sortBy from 'lodash/sortBy'
import PropTypes from 'prop-types';

class LeaderBoard extends Component {
    render() {
        const { leaderBoardList } = this.props

        return (
            <div className='leader-board'>
                <ul className='list'>
                    {
                        leaderBoardList.map((leader) => {
                            const {
                                avatarURL,
                                name,
                            } = leader.user

                            return (
                                <li key={name} className='question'>
                                    <div className='avatar'>
                                        <img src={avatarURL} alt={`avatar for ${name}`} />
                                    </div>
                                    <div className='leader-details'>
                                        <div className='username'>{name}</div>
                                        <div className='questions-summary'>
                                            <label>Answered questions</label>
                                            <span>{leader.answeredQuestions}</span>
                                        </div>
                                        <hr />
                                        <div className='questions-summary'>
                                            <label>Created questions</label>
                                            <span>{leader.createdQuestions}</span>
                                        </div>
                                    </div>
                                    <div className='score'>
                                        <label>Score</label>
                                        <span>{leader.score}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

LeaderBoard.propTypes = {
    users: PropTypes.array
};

function mapStateToProps({users}) {
    const rawLeaderBoardList = Object.values(users).map((user) => {
        return {
            user: {
                name: user.name,
                avatarURL: user.avatarURL,
            },
            score: Object.keys(user.answers).length + user.questions.length,
            answeredQuestions: Object.keys(user.answers).length,
            createdQuestions: user.questions.length
        }
    })
    const leaderBoardList = sortBy(rawLeaderBoardList, 'score').reverse()

    return {
        leaderBoardList
    }
}

export default connect(mapStateToProps)(LeaderBoard)
