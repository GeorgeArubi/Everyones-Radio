import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';

const Recommendations = (props: { selectPlaylist: any; }) => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState<SpotifyApi.PlaylistObjectSimplified[]>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [_playlistInfo, setPlaylistInfo] = useState<SpotifyApi.SinglePlaylistResponse>();
  
  useEffect(() => {
    const offsetArr = [0, 50];
    const playlistBatch: any[] = [];
    if (spotifyApi.getAccessToken()) {
      // Get the authenticated user
      spotifyApi.getMe()
      .then(function(userData) {
        const userId = userData.body.id
        // Get the first 100 playlists in the user's library
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
  
  /*
  // Dummy Data
  useEffect(() => {
    const testData: string[] = [
      '1DB96uvtjyakkiDxD7M1Zh',
      '7ozFIvz1bE1HPgQTUl5qfT',
      '4VdVH8e7BY4ESSdxa9ehK5',
      '6s2bP0um1MLKog2aVdlqHt',
      '1Bi23brRTBv0YfrrTYeaPC',
      '4BPUhIizaCtpybYPz5EhCL',
      '6DokzCTQ0UGh0ItaZBZrXC',
      '6rpGWCNHsDXtqNv38xXgNS',
      '58c4OKKyny03xYbw1wVl40',
      '25OZXSdB5cpVG8xLoSEjyU',
      '19p2VsvSMpyhkv6Tvdo20e',
      '3NCJ6ihYk8yChkkwkvJxGr',
      '6MPXVrcMxxB1zXq3fCHbpS',
      '25fGd8uIFS2nS5DVJSf26s',
      '3QQYDqtqBIzvXbbWgoKcxR',
      '41c31jLpWNQEctdxktBtHX',
      '3SvOnq7F7S1ONLVKQDRr7F',
      '7lD1Z8qDWH4AvguNiiEgov',
    ]
    const totalTestSet: any[] = []
    if (spotifyApi.getAccessToken()) {
      testData.forEach((testPlaylist) => {
        spotifyApi.getPlaylist(testPlaylist).then(function(data) {
          totalTestSet.push(data.body);
          // Put playlists into state
          const totalPlaylists = [].concat(...totalTestSet);
          setPlaylists(totalPlaylists);
          })
      })
    }  
  }, [session, setPlaylistId, spotifyApi])
 */
  

  // Get playlist info to be passed to playlist component
  useEffect(() => {
    if (playlistId) {
      spotifyApi.getPlaylist(playlistId).then(data => {
        setPlaylistInfo(data.body)
      })
      .catch((err) => console.log("Something went wrong", err))
    }
  }, [spotifyApi, playlistId]) // Use playlistId to refetch data
  //console.log(playlist)

  return (
    <div className="p-5 overflow-y-scroll h-full scrollbar-hide">
      <div className="overlay__inner">
        <div className="pb-8 relative">
          <h1 className="overlay__title">Your Recommendations</h1>
            <div className="absolute top-1 right-1">
                <img 
                  className="rounded-full w-16 h-16" 
                  src={session?.user?.image || ''}  
                  alt=""
                />
            </div>
        </div>
      
        <div className="container space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3 ">
          {playlists.map((p: any) => (
            <div className="w-full rounded" key={p.id}>
              <img 
                className="w-44 h-44 cursor-pointer hover:text-white"
                onClick={() => {setPlaylistId(p.id); props.selectPlaylist()}} 
                
                src={p?.images?.[0].url} 
                alt="playlist image" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recommendations
