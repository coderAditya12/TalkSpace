import React from 'react'
import css from './Landing.module.css'
import Header from './Header'

const Landing = () => {
  return (
    <>
      <main className={css.hero}>
        <h1 className={css.mainHead}>Connect, <span className={css.heroheadElement}>Collaborate</span>, Communicate</h1>
        <p className={css.subHead}>Stay connected with the people who matter, collaborate effortlessly with your team, and communicate ideas with clarity—all in one secure and intuitive platform. Transform the way you interact, whether it’s for work, study, or catching up with friends. Distance is no longer a barrier; it's time to connect smarter.</p>
      </main>
    </>
  )
}

export default Landing