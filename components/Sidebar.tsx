import React, { useEffect, useState } from 'react'
import { HomeIcon, SearchIcon, FolderIcon, PlusCircleIcon, HeartIcon, RssIcon } from '@heroicons/react/solid';
import { signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  
  useEffect(() => {
    const offsetArr = [0, 50];
    const playlistBatch: any[] = [];
    if (spotifyApi.getAccessToken()) {
      offsetArr.forEach((item) => {
        spotifyApi.getUserPlaylists({offset: item, limit: 50}).then((data) => {
          // Get playlists where playlists.owner.id === session.user.username
          const userPlaylists = data.body.items.filter((playlist) => playlist.owner.id === session?.user?.username);                
          playlistBatch.push(userPlaylists)
          // Place playlists into state
          const totalPlaylists: any[] = [].concat(...playlistBatch);
          setPlaylists(totalPlaylists);
        });  
      })
    }
  }, [session, spotifyApi])

  //console.log("You picked playlist >>>", playlistId)

  return (
    <div className='text-gray-500 p-5
        hidden md:inline-flex
        text-xs lg:text-sm
        sm:max-w-[12rem] lg:max-w-[15rem]
        border-r border-gray-900 
        overflow-y-scroll h-full scrollbar-hide'>
      <div className='space-y-4'>
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
        <hr className='border-t-[0.1px] border-gray-900' />
        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
            <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5' />
            <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5' />
            <p>Start Radio</p>
         </button>
         <hr className='border-t-[0.1px] border-gray-900' />
                
        {playlists.map((playlist) => (
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)}className='cursor-pointer hover:text-white'>{playlist.name}</p>
        ))}

        <div className="overlay__btns">
          <button className="overlay__btn overlay__btn--transparent"
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