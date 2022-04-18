import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../atoms/songAtom'
import useSpotify from '../hooks/useSpotify'

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const [currentIdTrack, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<SpotifyApi.SingleTrackResponse>();

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentIdTrack) {
        const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        })
          .then((res: any) => res.json())
          .then((trackInfo: SpotifyApi.SingleTrackResponse) => {
            setSongInfo(trackInfo);
          });
      }
    }
    fetchSongInfo()
  }, [currentIdTrack, spotifyApi])

  return songInfo
}

export default useSongInfo