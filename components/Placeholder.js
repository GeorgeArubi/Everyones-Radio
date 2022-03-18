import React from 'react'

const Placeholder = () => {
  return (
    <>
      <h1 className="overlay__title">
        Everyone's Radio (Beta)
        <span className="text-gradient"> Sounds Like Anxiety </span>    
      </h1>        
      <p className="overlay__description">
        Hey @username, thank you for signing up for our playlist recommendation service (thank you message). Add Playlist Cover; Playlist Name should be below the cover.
        <strong> About this project link</strong>
      </p>
      <div className="overlay__btns">
        <button className="overlay__btn overlay__btn--transparent">
          <a href="https://music.apple.com/us/playlist/sounds-like-anxiety/pl.u-mJy8Vd4ulRXDXz" target="_blank">
            Apple Music
          </a>
        </button>

        <button className="overlay__btn overlay__btn--colors">
          <span>Spotify</span>
          <span className="overlay__btn-emoji">🎨</span>
        </button>
      </div>
    </>
  )
}

export default Placeholder