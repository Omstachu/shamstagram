import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./styles/LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={onLogin}>
        <h1>Shamstagram</h1>
        <div>
          {errors.map((error, ind) => (
            <div className="login-errors" key={ind}>
              {error}
            </div>
          ))}
        </div>
        <div className="input-container">
          <label htmlFor="email">
            <span className="input-label">Email:</span>
            <input
              name="email"
              type="text"
              // placeholder="Email"
              value={email}
              onChange={updateEmail}
              className="login_input"
            />
          </label>
        </div>
        <div className="input-container">
          <label htmlFor="password">
            <span className="input-label">Password:</span>
            <input
              name="password"
              type="password"
              // placeholder="Password"
              value={password}
              onChange={updatePassword}
              className="login_input"
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
