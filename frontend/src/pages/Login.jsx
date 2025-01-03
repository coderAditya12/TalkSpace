import React, { useState } from "react";
import css from "./Login.module.css";
import Swal from 'sweetalert2'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:1111/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                credentials: "include",
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
                text: "Signed in successfully!",
                customClass: {
                    confirmButton: "my-custom-button",
                },
            });


            setEmail("");
            setPassword("");
            setUserName("");
            window.location = "http://localhost:5173"
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
            <div className={css.loginDiv}>
                <form className={css.signUp} onSubmit={handleSubmit}>
                    <div className={css.headings}>
                        <span className={css.subHead}>SIGN IN TO CONTINUE TO</span>
                        <h1 className={css.logo}>TalkSpace</h1>
                    </div>
                    <div className={`${css.formGroup} ${css.fg2}`}>
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

                    <div className={`${css.formGroup} ${css.fg2}`}>
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
                    <div className={`${css.subHead} ${css.subhead}`}>DONT HAVE ACCOUNT? <Link to="http://localhost:5173/register" className={css.signuplink}>SIGN UP</Link></div>
                </form>
            </div>
        </div>
    );
}
