import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';

const Playlist = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  
  useEffect(() => {
    const offsetArr = [0, 50];
    const playlistBatch = [];
    if (spotifyApi.getAccessToken()) {
      offsetArr.forEach((item) => {
        spotifyApi.getUserPlaylists({offset: item, limit: 50}).then((data) => {
          // Get playlists where playlists.owner.id === session.user.username
          const userPlaylists = data.body.items.filter((playlist) => playlist.owner.id === session?.user?.username);                
          playlistBatch.push(userPlaylists)
          // Place playlists into state
          const totalPlaylists = [].concat(...playlistBatch);
          setPlaylists(totalPlaylists);
        });  
      })
    }
  }, [session, spotifyApi])

  console.log("You picked playlist >>>", playlistId)

  return (
    <div className="p-5 overflow-y-scroll h-full scrollbar-hide">
      <div className="overlay__inner">
          <h1 className="overlay__title">
            Hi,<span className="text-gradient"> {session?.user.name} </span>
          </h1>
          <p className="overlay__description">
             Hey @username, thank you for signing up for our playlist recommendation service (thank you message).
             Add user's profile picture in the top roght corner.
             Add Playlist Cover; Playlist Name should be below the cover.
            <strong> About this project link</strong>
          </p>
          <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3 ">
            {playlists.map((playlist) => (
              <div className="w-full rounded">
                <img key={playlist.id} onClick={() => setPlaylistId(playlist.id)} src={playlist?.images?.[0].url} alt="playlist image" className="w-44 h-44 cursor-pointer hover:text-white"/>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Playlist
