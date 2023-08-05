import { magic } from '@/lib/magic'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '@/component/loading/loading'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading , setLoading]=useState(false)
  
  // useEffect(() => {
  //   const someFun =async () => {
  //   const data = await magic.user.isLoggedIn()
  //       if(data){
  //         router.push("/")
  //       }
  //       else{
  //         router.push("/login")
  //       }
  //   }
  //   // someFun()
  //   return undefined
  // } , [])

  useEffect(() => {
    const handleComplete = () => {
      setLoading(false)
    }
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
    return undefined
  } , [router])

  return <>
  {loading ? <Loading /> : <Component {...pageProps} /> }
    
    </>
}
