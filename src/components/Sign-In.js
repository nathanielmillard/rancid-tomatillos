import React, {Component} from 'react'

class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  updateState = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    return (
    <form>
      <label htmlFor='email'>Email</label>
      <input name='email' type='text' onChange={this.updateState}/>
      <label htmlFor='password'>Password</label>
      <input name='password' type='password' onChange={this.updateState}/>
      <button>Submit</button>
    </form>
  )
}
}

export default SignIn
