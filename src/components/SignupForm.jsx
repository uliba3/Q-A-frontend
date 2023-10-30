import PropTypes from 'prop-types'
import styles from '../mystyle.module.css'

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
        <input
          className={`${styles.modernInput} ${styles.modern}`}
          id='signupUsername'
          type="text"
          value={username}
          name="Username"
          onChange={handleSetUsername}
          placeholder="Username"
        />
      </div>
      <div>
        <input
          className={`${styles.modernInput} ${styles.modern}`}
          id='signupPassword'
          type="password"
          value={password}
          name="Password"
          onChange={handleSetPassword}
          placeholder="Password"
        />
      </div>
      <button className={styles.modern} id="signup-button" type="submit">signup</button>
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