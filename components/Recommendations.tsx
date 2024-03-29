import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtoms'
import useSpotify from '../hooks/useSpotify'
import { fetchData } from 'next-auth/client/_utils'

const Recommendations = (props: { selectPlaylist: any }) => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const [_playlistInfo, setPlaylistInfo] =
    useState<SpotifyApi.SinglePlaylistResponse>()

  /* This block of code should return a map of the playlist id and songs in the playlist
  * Dummy Data => Integrate User Playlist API Here:
  */
  const testData: string[] = [
    '4Gd4YlH3gwtRVHZWrVsZIv',
    '1AAzzQhqBXeqkyJtpsZBEq',
    '2cAlhm9AxBKybXWBJKtdC2',
    '1ipj4KhuYfLyeyr9vG7E6A',
    '04rG4KAC8lM5qmZIHfzJof',
    '3tvJsMAKDhCLZlGJxH4mD1',
    '2eaaT7LfCFYaxc62XDjBL2',
    '6UHXaDvv5UeTyftXsJkOwN',
    '0tOFJr7pNzkOesSn42JfPR',
    '5BnWGnUkYjbgoRHaZ9KR2o',
    '2w0UIBth3OfD0KaPPcUAGe',
    '1AZpiUANyjc6tBp6BEAkPX',
    '7GYbxlNnEGPeD86fQKzQCt',
    '4nZkPyO4Yy6BRXokAp4noB',
    '7crEGwAdRV2XVlTTNzKa5g',
    '47E4W78gH9PsAYhHId4WzJ',
    '0m3ntFblZlX9VS38nztuHT',
    '6IIVKviuvW4y8ovvtXHeaF',
    '02NrfpkVPsaQQyo48EUaBx',
    '1FXuPom1km8RCEosyZRx96',
    '25KdtFXksMZ6fD1ml6FB4J',
    '1LZ43rNkcLtTub7e85lDYX',
    '6zB8QzwHk93nBSQwymnzUo',
    '2qGQkMpAAUH7twKIMcFLjd',
    '4YnAzQiqTmvTYNqcpV7yr4',
    '4Xx47LYU9cn8ld6tuioLXv',
    '4mTmFiatNEoEBQeQIKlybh',
    '0yNAnsGbpFmLA6WYvLHNKG',
    '45vg9zEa1HwTnMppWIDi2n',
    '71uAiEwZdZSTFoqnfTFEqA',
  ]
  
  useEffect(() => {
    const totalTestSet: any[] = []
    const fetchData = async () => {
      for (let testPlaylist of testData) {
        if (spotifyApi.getAccessToken()) {
          const response = await spotifyApi.getPlaylist(testPlaylist)
          totalTestSet.push(response.body)
          const totalPlaylist = [].concat(...totalTestSet)
          setPlaylists(totalPlaylist)
        }
      }
    }
    fetchData().catch(console.error)
  }, [session, setPlaylistId, spotifyApi])

  // Get playlist info to be passed to playlist component
  useEffect(() => {
    const fetchPlaylists = async () => {
      if (playlistId) {
        const response = await spotifyApi.getPlaylist(playlistId)
        setPlaylistInfo(response.body)
      }
    }
    fetchPlaylists().catch((err) => console.log('Something went wrong', err))
  }, [spotifyApi, playlistId]) // Use playlistId to refetch data
  //console.log(playlist)

  return (
    <div className="h-full overflow-y-scroll p-5 scrollbar-hide">
      <div className="overlay__inner">
        <div className="relative pb-8">
          <h1 className="overlay__title">Your Recommendations</h1>
          <div className="absolute top-1 right-1">
            <img
              className="h-16 w-16 rounded-full"
              src={session?.user?.image || ''}
              alt=""
            />
          </div>
        </div>

        <div className="container space-y-2 lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0 ">
          {playlists.map((p: any) => (
            <div className="w-full rounded" key={p.id}>
              <img
                className="h-40 w-40 cursor-pointer hover:text-white"
                onClick={() => {
                  setPlaylistId(p.id)
                  props.selectPlaylist()
                }}
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
