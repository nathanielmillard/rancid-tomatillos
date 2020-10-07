import React, {Component} from 'react'
// import {Route, Switch, Redirect} from 'react-router-dom'

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  updateState = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  evaluateUser = (event) => {
    event.preventDefault()
    if (this.state.email.toLowerCase() === 'lucy@turing.io' && this.state.password === 'password1'){
      this.props.logIn()
    } else {
      alert('Wrong email or password')
    }
  }

  render () {
    return (
    <form>
      <label htmlFor='email'>Email</label>
      <input name='email' type='text' onChange={this.updateState}/>
      <label htmlFor='password'>Password</label>
      <input name='password' type='password' onChange={this.updateState}/>
      <button onClick={this.evaluateUser}>Submit</button>
    </form>
  )
}
}

export default SignIn
