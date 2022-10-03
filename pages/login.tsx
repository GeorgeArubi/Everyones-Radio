import React from 'react'
import Head from 'next/head'
import {InferGetServerSidePropsType} from 'next';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'

const WebGL = dynamic(() => import('../components/WebGL'), {
  ssr: false
})

const Login = ({providers}: {providers: InferGetServerSidePropsType<typeof getServerSideProps>}) => {
  return (
    <>
      <Head>
        <title>Everyone's Radio</title>
        <link rel="icon" href="/favicon-logo.png" />
      </Head>
      <WebGL />
      <div className="overlay">
        <div className="overlay__inner">
          <h1 className="overlay__title text-gradient">Everyone's Radio (Beta)</h1>
          <p className="overlay__description justify-center">
            Enhancing Playlist Recommendations & Music Discovery
          </p>
        <div className="overlay__btns justify-center">
          {providers &&
            (Object.values(providers) as unknown as ClientSafeProvider[]).map((provider: ClientSafeProvider) => (
              <div className="overlay__btn" key={provider.name}>
                <button
                  onClick={() => {
                    signIn(provider.id, {callbackUrl: '/'});
                  }}
                >
                  {provider.name} Login
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

// Server-side render to get all the providers
export const getServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {providers},
  }
}
