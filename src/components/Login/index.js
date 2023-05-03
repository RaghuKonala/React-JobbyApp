import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMessage: ''}

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 7, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = message => {
    this.setState({showSubmitError: true, errorMessage: message})
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const fetchedData = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(fetchedData.jwt_token)
    } else {
      this.onSubmitFailure(fetchedData.error_msg)
    }
  }

  updatePassword = event => this.setState({password: event.target.value})

  updateUsername = event => this.setState({username: event.target.value})

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.updatePassword}
          value={password}
          className="input-field"
          placeholder="Password"
          id="password"
          type="password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          onChange={this.updateUsername}
          value={username}
          className="input-field"
          placeholder="Username"
          id="username"
          type="text"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-responsive-container">
          <div>
            <img
              className="website-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <form
            onSubmit={this.submitLoginForm}
            className="login-form-container"
          >
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          {showSubmitError && <p className="error-message">*{errorMessage}</p>}
        </div>
      </div>
    )
  }
}

export default Login
