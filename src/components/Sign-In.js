import React, {Component} from 'react'

class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  render () {
    return (
    <form>
      <label htmlFor='email'>Email</label>
      <input name='email' type='text'/>
      <label htmlFor='password'>Password</label>
      <input name='password' type='password'/>
      <button>Submit</button>
    </form>
  )
}
}

export default SignIn
