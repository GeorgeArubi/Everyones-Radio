import React from 'react'
import {InferGetServerSidePropsType} from 'next';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'

const WebGL = dynamic(() => import('../components/WebGL'), {
  ssr: false
})

function Login({providers}: {providers: InferGetServerSidePropsType<typeof getServerSideProps>}) {
  return (
    <>
      <WebGL />
      <div className="overlay">
        <div className="overlay__inner">
          <h1 className="overlay__title text-gradient">Everyone's Radio (Beta)</h1>
          <p className="overlay__description">
            Welcome to the beginning of everything.
          </p>
        <div className="overlay__btns">
          <button className="overlay__btn overlay__btn--transparent">Apple Music</button>
          {providers &&
            (Object.values(providers) as unknown as ClientSafeProvider[]).map((provider: ClientSafeProvider) => (
              <div className="overlay__btn" key={provider.name}>
                <button
                  onClick={() => {
                    // https://developer.spotify.com/dashboard/applications/0e3eff139050415a9635bc8e4394622a
                    // Spotify settings redirect uris: http://localhost:3000/api/auth/callback/spotify
                    signIn(provider.id, {callbackUrl: '/'});
                  }}
                >
                  {provider.name}
                </button>
              </div>
          ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {providers},
  }
}
