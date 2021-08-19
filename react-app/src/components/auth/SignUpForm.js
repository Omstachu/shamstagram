import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./styles/SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={onSignUp}>
        <h1>Shamstagram</h1>
        <div>
          {errors.map((error, ind) => (
            <div className="signup-errors" key={ind}>
              {error}
            </div>
          ))}
        </div>
        <div className="input-container">
          <label>
            <span className="input-label">User Name:</span>
            <input
              className="signup_input"
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            <span className="input-label">Email:</span>
            <input
              className="signup_input"
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            <span className="input-label">Password:</span>
            <input
              className="signup_input"
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </label>
        </div>
        <div className="input-container">
          <label>
            <span className="input-label">Repeat Password:</span>
            <input
              className="signup_input"
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </label>
        </div>
        <button className="signup_button" type="submit">
          Sign Up
        </button>
        <button className="login_button" type="submit">
          Login Page
        </button>
        <button className="demo_button" type="submit">
          Sign in as Demo User
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
