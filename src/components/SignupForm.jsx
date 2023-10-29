import PropTypes from 'prop-types'

const SignupForm = ({
  handleSignup,
  handleSetUsername,
  username,
  handleSetPassword,
  password
}) => {
  return(
    <form onSubmit={handleSignup}>
      <div>
        username
        <input
          id='signupUsername'
          type="text"
          value={username}
          name="Username"
          onChange={handleSetUsername}
        />
      </div>
      <div>
        password
        <input
          id='signupPassword'
          type="password"
          value={password}
          name="Password"
          onChange={handleSetPassword}
        />
      </div>
      <button id="signup-button" type="submit">signup</button>
    </form>
  )
}

SignupForm.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  handleSetUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleSetPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired
}

export default SignupForm