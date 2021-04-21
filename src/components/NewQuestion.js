import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/shared'

class NewQuestion extends Component {
    state = {
        option1: '',
        option2: '',
        toQuestionList: false
    }

    handleChange = (e, optionName) => {
        const value = e.target.value

        this.setState(() => ({
            [optionName]: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { option1, option2 } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion({option1, option2}))

        this.setState(() => ({
            option1: '',
            option2: '',
            toQuestionList: true
        }))
    }

    render() {
        const {
            option1,
            option2,
            toQuestionList
        } = this.state

        if (toQuestionList) {
            return (<Redirect to='/home' />)
        }

        return (
            <div className='form-page'>
                <h4>Create New Question</h4>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <h3>Would you rather ... </h3>
                    <input
                        type='text'
                        className='input-text'
                        name='optionOne'
                        onChange={(e) => this.handleChange(e, 'option1')}
                        placeholder='Enter Option One Text Here'
                    />
                    <div>OR</div>
                    <input
                        type='text'
                        className='input-text'
                        name='optionTwo'
                        onChange={(e) => this.handleChange(e, 'option2')}
                        placeholder='Enter Option Two Text Here'
                    />
                    <button
                        type='submit'
                        disabled={option1 === '' || option2 === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)
