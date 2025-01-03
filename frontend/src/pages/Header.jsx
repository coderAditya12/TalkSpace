import React, { useEffect, useState } from 'react'
import styles from "./Header.module.css"
import Swal from 'sweetalert2'

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const checkToken = () => {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("access_token="));
            // setIsLoggedIn(!!token);
        };

        checkToken();
    }, []);


    const handleSignOut = async () => {
        try {
            const response = await fetch("http://localhost:1111/api/auth/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire({
                    icon: "error",
                    title: "Logout Failed",
                    text: errorData.message || "Failed to log out. Please try again.",
                    confirmButtonText: "Retry",
                });
                return;
            }

            Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been logged out successfully.",
                confirmButtonText: "OK",
            }).then(() => {
                window.location.href = "/login";
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Network Error",
                text: "Error logging out. Please check your connection and try again.",
                confirmButtonText: "Retry",
            });
            console.error("Network error during logout:", error);
        }
    };
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>TalkSpace</h1>
            <nav>
                <ul className={styles.navLinks}>
                    {!isLoggedIn ? (
                        <>
                            <li>
                                <a href="http://localhost:5173/register">Sign Up</a>
                            </li>
                            <li>
                                <a href="http://localhost:5173/login">Login</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a href="http://localhost:5173/profile">Profile</a>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        handleSignOut()
                                    }}
                                    className={styles.logoutButton}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                    <li>
                        <a href="http://localhost:5173/landing">Features</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
