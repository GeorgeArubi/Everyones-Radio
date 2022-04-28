import React, { useState } from 'react'
import Recommendations from './Recommendations'
import Tracklist from './Tracklist'

const Center = () => {
  const [playlistGrid, setPlaylistGrid] = useState(true)

  return (
    <>
    {playlistGrid ? (
      <Recommendations selectPlaylist={() => setPlaylistGrid(false)} />
    ) : (<Tracklist setPlaylistGrid={setPlaylistGrid}/>)}
    </>
  )
}

export default Center