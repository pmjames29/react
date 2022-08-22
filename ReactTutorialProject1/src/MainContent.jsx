import React from 'react'

export default function MainContent() {
    return (
      <main>
        <img className='main--PFP' src='../images/PFP.jpg' alt='profile-picture' />
        <h1 className='main--name'>Paul James</h1>
        <p className='main--job_title'>Frontend Developer</p>
        <p className='main--website'>pauljames.website</p>
        <div className='main--button_links'>
          <button className='main--email_button' type='button'><img src='../images/Mail.png' alt='email'/><span>Email</span></button>
          <button className='main--linkedin_button' type='button'><img src='../images/linkedin.png' alt='linkedin'/><span>LinkedIn</span></button>
        </div>
        <div className='main--blurb'>
          <h3>About</h3>
          <p>I am a frontend developer with a particular interest in making things simple and automating daily tasks.
            I try to keep up with security and best practices and am always looking for new things to learn.
          </p>
          <h3>Interests</h3>
          <p>Reader. Video Game Enthusiast. Hiking Enthusiast. Music lover. Cooking amateur. Ultimate Frisbee Player. Organization lover.</p>
        </div>
      </main>
    )
  }