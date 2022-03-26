import type { NextPage } from 'next'
import Playlist from '../components/Playlist'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden">
        <Playlist />
    </div>
  )
}

export default Home
