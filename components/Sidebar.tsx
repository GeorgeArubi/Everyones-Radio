import React, { useEffect, useState } from 'react'
import { HomeIcon, SearchIcon, FolderIcon, RssIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  
  useEffect(() => {
    const offsetArr = [0, 50];
    const playlistBatch: any[] = [];
    if (spotifyApi.getAccessToken()) {
      // Get the authenticated user
      spotifyApi.getMe()
      .then(function(userData) {
        const userId = userData.body.id
      
        offsetArr.forEach((item) => {
          spotifyApi.getUserPlaylists({offset: item, limit: 50}).then((data) => {
            // Get playlists where playlists.owner.id === session.user.username
            const userPlaylists = data.body.items.filter((playlist) => playlist.owner.id === userId);                
            playlistBatch.push(userPlaylists)
            // Put playlists into state
            const totalPlaylists = [].concat(...playlistBatch);
            setPlaylists(totalPlaylists);
          });
        })
      })
    }
  }, [session, setPlaylistId, spotifyApi])

  //console.log("You picked playlist >>>", playlistId)

  return (
    <div className='text-[#24002E] p-5
        hidden md:inline-flex
        text-xs lg:text-sm
        sm:max-w-[12rem] lg:max-w-[15rem]
        border-r border-gray-900 
        overflow-y-scroll h-full scrollbar-hide'>
      <div className='space-y-4'>
        <p className="overlay__title">
            Hi,<span className="text-gradient"> {session?.user?.name} </span>
          </p>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
            <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
            <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <FolderIcon className='h-5 w-5' />
            <p>Your Library</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
            <p>Start Radio</p>
         </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        <div>
          <h1 className="font-bold text-xl">About This Project</h1>
          <p className="overlay__description">
              Everyone's Radio started as a passion project meant to curate
              personal sonic experiences for a few friends. Today, it represents 
              a deep dive into the sub-communities that drive user-to-user activity 
              on music streaming platforms.
          </p>
        </div>
        
        <div className="overlay__btns">
          <button className="overlay__btn"
            onClick={() => signOut({ callbackUrl: "/login"})}
          >
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div >
  )
}

export default Sidebar