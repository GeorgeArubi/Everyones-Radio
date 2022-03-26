import React from 'react'
import dynamic from 'next/dynamic'
import { signOut } from 'next-auth/react'

const WebGL = dynamic(() => import('./WebGL'), {
  ssr: false
})

const Playlist = () => {
  return (
    <>
      <WebGL />
      <div className="overlay">
        <div className="overlay__inner">
            <h1 className="overlay__title">
              Everyone's Radio (Beta)
              <span className="text-gradient"> Sounds Like Anxiety </span>
            </h1>
            <p className="overlay__description">
              Hey @username, thank you for signing up for our playlist recommendation service (thank you message).
               Add user's profile picture in the top roght corner.
               Add Playlist Cover; Playlist Name should be below the cover.
              <strong> About this project link</strong>
            </p>
            <div className="overlay__btns">
              <button className="overlay__btn overlay__btn--transparent"
                onClick={() => signOut({ callbackUrl: "/login"})}
              >
                <span>Log Out</span>
              </button>

              <button className="overlay__btn overlay__btn--colors">
                <span href="https://music.apple.com/us/playlist/sounds-like-anxiety/pl.u-mJy8Vd4ulRXDXz" target="_blank">
                  Apple Music
                </span>
              </button>
            </div>
          </div>
      </div>
    </>
  )
}

export default Playlist
