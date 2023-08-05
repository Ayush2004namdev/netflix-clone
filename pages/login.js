import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/login.module.css"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState , useEffect } from "react";
import { magic } from "@/lib/magic";

const login = () => {
    const router = useRouter()
    const [email,setEmail] = useState(null)
    const [userMsg,setUserMsg] = useState(null)
    const [loading,setLoading] = useState(false)

  useEffect(() => {
    const handleComplete = () => {
      setLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  } , [router])



    const handleEmail = (e) => {
        setEmail(e.target.value)
        setUserMsg("")
    }
    const handleLoginWithEmail = async () => {
        console.log("Handling login")
        setLoading(true)
        if(email === "ayush2004namdev@gmail.com"){
          try {
           const data = await magic.auth.loginWithMagicLink({ email });
           if(data){
            setLoading(false)
            router.push("/")
           }
          } catch(error) {
            console.error(error)
            setLoading(false)
            // Handle errors if required!
          }
        }
        else{
          setLoading(false)
            setUserMsg("Enter a valid email")
        }
    }
    

    return (
        <>
    <Head>
        <title>LogIn</title>
    </Head>
    <div className={styles.container}>
    <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width={128}
                  height={34}
                />
              </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
    </>
    )
}

export default login;