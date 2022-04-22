import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

const WebGL = dynamic(() => import('./../components/WebGL'), {
  ssr: false
})

const Test: NextPage = () => {
  
  return (
    <>  
      <WebGL />
    </>
    
  )
}

export default Test

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {session},
  };
};
