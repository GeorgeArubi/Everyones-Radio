import React from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'
import { millisecondToMinutesAndSeconds } from '../lib/time_duration'

const Song = ({ order, track }: {track: any; order: number}) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [track.uri]
    })
    .catch((err) => {
      // Details: Player command failed: Premium required PREMIUM_REQUIRED.
      console.log(err);
    });
  }

  return (
    <div 
      className="grid grid-cols-2 py-2 px-5 text-gray-500 
    hover:bg-white hover:bg-opacity-50 hover:backdrop-filter hover:backdrop-blur-lg rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className='flex items-center space-x-4'>
        <p className='text-right'>{order + 1}</p>
        <img
          className='h-10 w-10'
          src={track.album.images[0].url}
          alt='Song Covers'
        />
        <div>
          <p className="w-36 lg:w-64 text-black truncate">{track.name}</p>
          <p className='w-40'>{track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.album.name}</p>
        <p>{millisecondToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
