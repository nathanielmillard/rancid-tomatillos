import React, {Component} from 'react'

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
    event.preventDefault();
    if (this.state.email.toLowerCase() === 'lucy@turing.io' && this.state.password === 'password1'){
      const data = {
        email: 'lucy@turing.io',
        password: 'password1'
      }
      fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(response => this.props.logIn(response))
      .catch(error => {
        console.log(error)
        alert('Something went wrong on our end')
      })
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
