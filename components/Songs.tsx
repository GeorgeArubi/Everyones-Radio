import React from 'react'
import Song from './Song';

const Songs = ({playlists}: {playlists: SpotifyApi.SinglePlaylistResponse}) => {

  return (
    <div className="flex flex-col space-y-1 text-gray-500">
      {playlists?.tracks.items.map((item, i) => (
        <Song key={item.track?.id} track={item.track} order={i} />
      ))}
    </div>
  )
}

export default Songs