import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Banner from '@/component/banner/banner'
import Navbar from '@/component/navbar/navbar'
import SectionCard from '@/component/card/sectionCard'
import { getPopularVideos, getVideos } from '@/lib/video'


export async function getServerSideProps(){
  const disneyVideos = await getVideos("disney")
  const travelVideos = await getVideos("travel")
  const produciveVideos = await getVideos("productive")
  const popularVideos = await getPopularVideos()
  return { props : {disneyVideos , travelVideos , produciveVideos , popularVideos}}
}

export default function Home({disneyVideos , travelVideos , produciveVideos , popularVideos}) {

  return (
    <>
      <Head>
        <title>Netflix Buddy</title>
        <meta name="description" content="A netflix clone website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar  />
        <Banner title="Clifford the dog" videoId="tTkz7hnY8WE" subtitle="litrally who cares about that" imgUrl="/static/clifford.webp"/>
        <div className={styles.sectionWrapper}>
        <SectionCard videos={disneyVideos} size="large" title="Disney Videos"/>
        
         <SectionCard videos={travelVideos} size="small" title="Travel"/>
        <SectionCard videos={produciveVideos} size="medium" title="Productive"/>
        <SectionCard videos={popularVideos} size="small" title="Popular"/>
        </div>
      </main>
    </>
  )
}
