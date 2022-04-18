import React, { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';

import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, SwitchHorizontalIcon, RewindIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { VolumeOffIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { debounce } from 'debounce';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  const fetchCurrentSong = useCallback(() => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        //console.log("Now Playing: ", data.body?.item)
        if (data.body?.item?.id) setCurrentTrackId(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then(playBackData => {
          setIsPlaying(playBackData.body?.is_playing)
        })
      })
    }
  }, [songInfo, spotifyApi, setIsPlaying, setCurrentTrackId])

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body?.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // Fetch the song info
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackIdState, spotifyApi, session])
  
  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce((volumeLevel) => {
      spotifyApi.setVolume(volumeLevel).catch((err) => console.error(err))
    }, 300),
    []
  )
  
  return (
    <div className="
      w-full px-11 py-3 items-center rounded-xl 
    bg-white/[0.375] border border-solid border-[#ffffff20]
      grid grid-cols-3 text-xs md:text-base"
    >
      {/* Left */}
      <div className="flex items-venter space-x-4">
        <img 
          className="hidden md:inline w-12 h-12" 
          src={songInfo?.album.images?.[0]?.url} 
          alt="Album Cover"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          // onClick={() => {spotifyAPI.skipToPrevious()}} -- API Not working.
          className="button"
        />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="pause-button"/>
        ) : (
          <PlayIcon onClick={handlePlayPause} className="play-button"/>
        )}

        <FastForwardIcon
          // onClick={() => {spotifyAPI.skipToNext()}} -- API Not working.
          className="button"
        />
        <ReplyIcon className="button h-6 w-6" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3
                      md:space-x-4 justify-end">
        <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button h-6 w-6" />
        <input 
          className="w-14 md:w-28" 
          type="range" 
          value={volume} 
          onChange={e => setVolume(Number(e.target.value))}
          min={0} 
          max={100} 
        />
        <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button h-6 w-6" />
      </div>
    </div>
  )
}

export default Player