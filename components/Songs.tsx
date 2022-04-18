import React from 'react'
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtoms';
import Song from './Song';

const Songs = () => {
  const playlist: any = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col space-y-1 text-gray-500">
      {playlist?.tracks.items.map((track: any, i: number) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  )
}

export default Songs