import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const Playlist = dynamic(() => import('../components/Playlist'), {
  ssr: false
})


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Everyone's Radio</title>
        <link rel="icon" href="/favicon-logo.png" />
      </Head>
      
      <main>
        <Playlist />
      </main>

    </div>
  )
}

export default Home
