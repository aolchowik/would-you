import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class QuestionResults extends Component {
    render () {
        const {
            answer,
            question,
            votes
        } = this.props
        const wouldYouRather = 'Would you rather'
        const percentageOption2 = Math.round(votes.optionTwo/votes.all*100)
        const percentageOption1 = Math.round(votes.optionOne/votes.all*100)
        const styles = (percentageOption2) => {
            return {
                width: `${percentageOption2}%`,
                backgroundColor: '#65b7b3',
                borderRadius: '5px',
                padding: '8px 0 2px',
                height: '70%',
                color: '#ffffff'
            }
        };

        return (
            <Fragment>
                <div className={answer === 'optionOne' ? `option active`:'option'}>
                    {answer === 'optionOne' && <h3>Your vote</h3>}
                    <div className='text'>{wouldYouRather} {question.optionOne.text}?</div>
                    <div className='chart'><div style={styles(percentageOption1)}>{percentageOption1}%</div></div>
                    <div className='votes'>{votes.optionOne} out of {votes.all} votes</div>
                </div>
                <div className={answer === 'optionTwo' ? `option active`:'option'}>
                    {answer === 'optionTwo' && <div>Your vote</div>}
                    <div className='text'>{wouldYouRather} {question.optionTwo.text}?</div>
                    <div className='chart'><div style={styles(percentageOption2)}>{percentageOption2}%</div></div>
                    <div className='votes'>{votes.optionTwo} out of {votes.all} votes</div>
                </div>
            </Fragment>
        )
    }
}

QuestionResults.propTypes = {
    answer: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    votes: PropTypes.object.isRequired
}

export default QuestionResults
