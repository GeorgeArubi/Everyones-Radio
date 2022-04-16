import React, { useEffect, useState } from 'react'
import { getProviders, signIn  } from 'next-auth/react'
import dynamic from 'next/dynamic'

const WebGL = dynamic(() => import('../components/WebGL'), {
  ssr: false
})

const Login = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

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
          {providers && Object.values(providers).map((provider: any) => (
              <div className="overlay__btn overlay__btn--colors" key={provider.name}>
                <button className="spotify__login"
                  onClick={() => signIn(provider.id, { callbackUrl: "/"})}
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
