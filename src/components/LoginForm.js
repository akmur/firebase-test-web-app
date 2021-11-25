import { useState } from 'react'
import FirebaseAuthService from '../FirebaseAuthService'

const LoginForm = ({ existingUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await FirebaseAuthService.loginUser(username, password) // if this works it authomatically sets state
      setUsername('')
      setPassword('')
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLogout = () => {
    FirebaseAuthService.logoutUser()
  }

  const handleSendResetPasswordEmail = async () => {
    if (!username) {
      alert('Missing username!')
      return
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(username)
      alert('sent the password reset email')
    } catch (error) {
      alert(error.message)
    }
  }

  // const handleloginWithGoogle = async () => {
  //   try {
  //     await FirebaseAuthService.loginWithGoogle()
  //   } catch (error) {
  //     alert(error.message)
  //   }
  // }

  return (
    <div className="login-form-container">
      {existingUser ? (
        <div className="row">
          <h3>Welcome, {existingUser.email}</h3>
          <button
            type="button"
            className="primary-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Username (email):
            <input
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Password:
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button type="submit" className="primary-button">
              Login
            </button>
            {/* <button
              type="button"
              className="primary-button"
              onClick={handleloginWithGoogle}
            >
              Login with Google
            </button> */}
            <button
              type="button"
              onClick={handleSendResetPasswordEmail}
              className="primary-button"
            >
              Reset Password
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default LoginForm
