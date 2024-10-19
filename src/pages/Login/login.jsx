import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLogin from '../../hooks/isLogin/isLogin';

const Login = () => {
  const {
    userLoginData,
    passwordVisible,
    ConfirmpasswordVisible,
    spinner,
    loginStatusCheck,
    handleLoginChange,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
    setLoginStatusCheck,
    handleRoleChange,
  } = useLogin();

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <div className="login-left">
          <h1 className="login-title" style={{ textAlign: 'center' }}>
            {loginStatusCheck ? 'Register Here' : 'Sign In'}
          </h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {loginStatusCheck && (
              <input
                name="username"
                type="text"
                value={userLoginData.username}
                placeholder="Enter Username"
                onChange={handleLoginChange}
                required
              />
            )}
            {loginStatusCheck && (
              <input
                name="fullName"
                type="text"
                value={userLoginData.fullName}
                placeholder="Enter FullName"
                onChange={handleLoginChange}
                required
              />
            )}
            <input
              name="userEmail"
              type="email"
              value={userLoginData.userEmail}
              placeholder="Enter Email"
              onChange={handleLoginChange}
              required
            />
            <div style={{ width: '100%', position: 'relative' }}>
              <input
                name="userPassword"
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter Password"
                required
                style={{ width: '100%' }}
                value={userLoginData.userPassword}
                onChange={handleLoginChange}
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              />
              <span
                className="material-icons"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  paddingTop: '0.7vh',
                  paddingRight: '0.8vh',
                  cursor: 'pointer',
                }}
              >
                {passwordVisible ? 'visibility' : 'visibility_off'}
              </span>
            </div>

            {loginStatusCheck && (
              <div style={{ width: '100%', position: 'relative' }}>
                <input
                  name="confirmPassword"
                  type={ConfirmpasswordVisible ? 'text' : 'password'}
                  value={userLoginData.confirmPassword}
                  placeholder="Enter Confirm Password"
                  onChange={handleLoginChange}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  required
                  style={{ width: '100%' }}
                />
                <span
                  className="material-icons"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    paddingTop: '0.7vh',
                    paddingRight: '0.8vh',
                    cursor: 'pointer',
                  }}
                >
                  {ConfirmpasswordVisible ? 'visibility' : 'visibility_off'}
                </span>
              </div>
            )}

            {loginStatusCheck && (
              <select
                name="userRole"
                value={userLoginData.userRole}
                onChange={handleRoleChange}
                className="selectOption"
                required
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="user">User</option>
                <option value="driver">Driver</option>
              </select>
            )}

            {loginStatusCheck && (
              <input
                name="phoneNumber"
                type="text"
                value={userLoginData.phoneNumber}
                placeholder="Enter 10 Digit Phone Number"
                onChange={handleLoginChange}
                required
              />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <a
                onClick={() => {
                  setLoginStatusCheck(!loginStatusCheck);
                }}
                style={{ cursor: 'pointer' }}
                className="forgot-password"
              >
                {!loginStatusCheck ? 'New Register' : 'Login'}
              </a>
            </div>
            {spinner === 'invisible' && (
              <button
                type="submit"
                className="login-button"
                style={{ marginRight: '2vh', margin: 'auto' }}
              >
                {!loginStatusCheck ? 'SIGN IN' : 'Register Now'}
              </button>
            )}
            {spinner !== 'invisible' && (
              <div
                className={spinner}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  marginTop: '2vh',
                }}
              >
                <div
                  className="spinner"
                  style={{
                    border: '4px solid #624FC2',
                    borderRightColor: 'white',
                  }}
                />
              </div>
            )}
          </form>
        </div>
        <div className="login-right">
          <h2 className="welcome-title">
            On-Demand Logistics Platform for Goods Transportation
          </h2>
          <p>
            Welcome to the On-Demand Logistics Platform demo. Use this platform
            to book transportation services for moving goods. Connect with a
            fleet of drivers and enjoy features like real-time tracking, price
            estimation, and efficient logistics management. Experience seamless
            coordination between users and drivers while managing high traffic
            demands.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
