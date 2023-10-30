import PropTypes from 'prop-types'
import styles from '../mystyle.module.css'

const LoginForm = ({
  handleLogin,
  handleSetUsername,
  username,
  handleSetPassword,
  password
}) => {
  return(
    <form onSubmit={handleLogin}>
      <div>
        <input
          className={`${styles.modernInput} ${styles.modern}`}
          id='loginUsername'
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
          id='loginPassword'
          type="password"
          value={password}
          name="Password"
          onChange={handleSetPassword}
          placeholder="Password"
        />
      </div>
      <button className={styles.modern} id="login-button" type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleSetUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleSetPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm