import React, { useEffect, useState } from 'react'
import Songs from './Songs'
import { ArrowSmLeftIcon } from '@heroicons/react/solid'
import { useRecoilValue } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';

const Tracklist = () => {
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlists, setPlaylists] = useState<SpotifyApi.SinglePlaylistResponse>();

  useEffect(() => {
    if (playlistId) {
      spotifyApi.getPlaylist(playlistId).then(data => {
        setPlaylists(data.body)
      })
      .catch((err) => console.log("Something went wrong", err))
    }
  }, [spotifyApi, playlistId]) // Use playlistId to refetch data

  console.log(playlists)

  return (
    <div className="flex-grow px-5 
    overflow-y-scroll h-full scrollbar-hide relative">
      <div className="absolute py-3 top-5 right-8">
        <div className="flex items-center hover:opacity-80 cursor-pointer rounded-full 
        p-1 pr-2">
          <ArrowSmLeftIcon className="h-5 w-5 mr-1" />
          <h2>Back</h2>
          
        </div>
      </div>

      <section className={`flex items-end space-x-7 text-black p-8`}>
        <img className="h-44 w-44 shadow-2xl" src={playlists?.images?.[0]?.url} alt="Playlist Cover"/>
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlists?.name}</h1>
        </div>
      </section>
      <br />
      <div>
        {playlists && <Songs playlists={playlists} />}
      </div>
    </div>
  )
}

export default Tracklist
