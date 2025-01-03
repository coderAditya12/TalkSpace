import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Header from "./Header";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="));
      setIsLoggedIn(!!token);
    };

    checkToken();
  }, []);

  return (
    <div className={styles.container}>
      <Header></Header>
      <main className={styles.mainContent}>
        <h2>Welcome to TalkSpace</h2>
        <p>Join or create a room effortlessly for your online meetings.</p>
        <div className={styles.buttons}>
          <button className={styles.primaryButton}>Join Meeting</button>
          <button className={styles.secondaryButton}>Create Room</button>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 TalkSpace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
