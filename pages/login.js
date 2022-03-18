import React from 'react'
import { getProviders, signIn} from 'next-auth/react'
import dynamic from 'next/dynamic'

const WebGL = dynamic(() => import('../components/WebGL'), {
  ssr: false
})

const Login = ( { providers }) => {
  return (
    <>
      <WebGL />
      <div className="overlay">
          <div className="overlay__inner">
              <h1 className="overlay__title text-gradient">Everyone's Radio (Beta)</h1>
              <p className="overlay__description">
                Welcome to ...
              </p>
              <div className="overlay__btns">
                <button className="overlay__btn overlay__btn--transparent">Apple Music</button>
                <button className="overlay__btn overlay__btn--colors">Spotify</button>
              </div>
            </div>
        </div>
    </>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}