import React, { useState } from 'react'
import Recommendations from './Recommendations'
import Tracklist from './Tracklist'

const Center = () => {
  const [playlistGrid, setPlaylistGrid] = useState(true)


  return (
    <>
    {playlistGrid === true && (
      <Recommendations selectPlaylist={() => setPlaylistGrid(false)} />
    )}
    {playlistGrid === false && (<Tracklist />)}
    </>
  )
}

export default Center