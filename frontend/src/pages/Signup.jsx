import React, { useState } from "react";
import css from "./Login.module.css";
import Swal from 'sweetalert2'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:1111/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username: userName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message || "Something went wrong!",
          customClass: {
            confirmButton: "my-custom-button",
          },
        });
        return;
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User created successfully!",
        customClass: {
          confirmButton: "my-custom-button", // Use your custom class here
        },
      });
      window.location = "http://localhost:5173/login";

      setEmail("");
      setPassword("");
      setUserName("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to the server. Please check your connection or try again later.",
        customClass: {
          confirmButton: "my-custom-button",
        },
      });
    }
  };


  return (
    <div className={css.background}>
      <div className={css.SignupDiv}>
        <form className={css.signUp} onSubmit={handleSubmit}>
          <div className={css.headings}>
            <span className={css.subHead}>SIGN UP TO CONTINUE TO</span>
            <h1 className={css.logo}>TalkSpace</h1>
          </div>
          <div className={css.formGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={css.input}
              id="email"
              required
            />
            <label htmlFor="email" className={css.formLabel}>
              Email
            </label>
          </div>

          <div className={css.formGroup}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={css.input}
              id="username"
              required
            />
            <label htmlFor="username" className={css.formLabel}>
              Username
            </label>
          </div>   <div className={css.formGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              maxLength={20}
              className={css.input}
              id="password"
              required
            />
            <label htmlFor="password" className={css.formLabel}>
              Password
            </label>
          </div>
          <button className={css.submit}>Go <div className={css.arrow} src="/arrow.svg" alt="arr" /> <i class="fas fa-arrow-right"></i></button>
          <span className={css.oauthDiv}>
            <span className={css.subHead}>OR SIGN IN USING</span>
            <span className={css.oauth}>
              <a href="#" className={css.oLink}>
                <img
                  src="https://imgs.search.brave.com/t-KyWA8i3BBE5RiMN0NiDBJxxXcQQD9YyQb0qLlysJI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy85/LzkxL09jdGljb25z/LW1hcmstZ2l0aHVi/LnN2Zw"
                  alt="github-svg"
                />
              </a>
              <a href="#" className={css.oLink}>
                <img
                  src="https://imgs.search.brave.com/PdE0_txzUdHcbHT5AhV0yUQJQp1HsegZYHyXHuGZ3vs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9j/L2MxL0dvb2dsZV8l/MjJHJTIyX2xvZ28u/c3Zn"
                  alt="google-svg"
                />
              </a>
              <a href="#" className={css.oLink}>
                <img
                  src="https://imgs.search.brave.com/QG3u8IJzICsm4qv6ys8QEDy0PKvcHJlNVAJZqEuIWQw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91eHdp/bmcuY29tL3dwLWNv/bnRlbnQvdGhlbWVz/L3V4d2luZy9kb3du/bG9hZC9icmFuZHMt/YW5kLXNvY2lhbC1t/ZWRpYS94LXNvY2lh/bC1tZWRpYS1yb3Vu/ZC1pY29uLnN2Zw"
                  alt="x-svg"
                />
              </a>
            </span>
          </span>
          <div className={`${css.subHead} ${css.subhead}`}>ALREADY HAVE ACCOUNT? <Link to="http://localhost:5173/login" className={css.signuplink}>LOGIN</Link></div>
        </form>
      </div>
    </div>
  );
}
