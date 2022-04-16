import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import Center from '../components/Center'
import Sidebar from './../components/Sidebar'

const WebGL = dynamic(() => import('./../components/WebGL'), {
  ssr: false
})

const Test: NextPage = () => {
  
  return (
    <>
      <WebGL />
      <div className="h-screen overflow-hidden">
        <main className="
          w-full h-5/6 px-6 py-8 
          flex items-center rounded-[2rem] 
        bg-white/[0.375] shadow-[0_0.75rem_2rem_0_rgba(0,0,0,0.1)]
          border border-solid border-[#ffffff20]"
        >
          <Sidebar />
          <Center />
        </main>
      </div>
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
