import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {logInUser} from '../../apiCalls.js'
import PropTypes from 'prop-types';

import './Sign-In.scss'

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      wrongInput: '',
      error: ''
    }
  }

  updateState = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  evaluateUser = (event) => {
    event.preventDefault();
    if (this.state.email.toLowerCase() === 'lucy@turing.io' && this.state.password === 'password1'){
      const data = {
        email: 'lucy@turing.io',
        password: 'password1'
      }
      logInUser(data).then(response => this.props.logIn(response))
    } else {
      this.setState({ wrongInput: 'Wrong email or password' });
    }
  }

  render () {
    return (
      <form className='sign-in-form'>
        <label htmlFor='email'>Email</label>
        <input name='email' type='text' placeholder='email' onChange={this.updateState}/>
        <label htmlFor='password'>Password</label>
        <input name='password' type='password' placeholder='password' onChange={this.updateState}/>
        <button onClick={this.evaluateUser}>Submit</button>
        { (this.state.wrongInput || this.state.error) ? <h3>{this.state.wrongInput || this.state.error }</h3> : ''}

        <Link to='/'>Home</Link>
      </form>
    )
}
}

export default SignIn

SignIn.propTypes = {
  logIn: PropTypes.func.isRequired
}
