import React from 'react'
import useSpotify from '../hooks/useSpotify'
import { millisecondToMinutesAndSeconds } from '../lib/time_duration'

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify()

  return (
    <div className="grid grid-cols-2 pt-2 text-gray-500">
      <div className='flex items-center space-x-4'>
        <p className='text-right'>{order + 1}</p>
        <img
          className='h-10 w-10'
          src={track.track.album.images[0].url}
          alt='Song Covers'
        />
        <div>
          <p className="w-36 lg:w-64 text-white truncate">{track.track.name}</p>
          <p className='w-40'>{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisecondToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song