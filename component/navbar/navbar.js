import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css"
import { useEffect, useState } from "react";
import { magic } from "@/lib/magic";


const Navbar = () => {
    const [username , setUsername] = useState(null)
    const getUserData = async () => {
        try{
            const {email} = await magic.user.getMetadata()
            const did = await magic.user.getIdToken()
            console.log({did})
            setUsername(email)
        }
        catch(error){
            console.error(error)
        }
   } 
    useEffect(() => {
        getUserData()
    } , [])

    const [hide , setHide] = useState(false)

    const changeState = () => {
        setHide(!hide)
    }

    const handleSignOut = async()=> {
        try{
            await magic.user.logout()
            console.log(await magic.user.isLoggedIn())
        }catch(error){
            console.error(error)
        }  
    }

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <Link className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>
                        <Image src="/static/netflix.svg" alt="logo Image" width={128} height={38}/>
                    </div>
                </Link>
           
            <ul className={styles.navItems}>
                <Link href="/"><li className={styles.navItem}>Home</li></Link>
                <Link href="/browse/my-list"><li className={styles.navItem2}>My List</li></Link>
            </ul>
            <nav className={styles.navContainer}>
                <div>
                    <button onClick={changeState} className={styles.userNameBtn}>
                        <p className={styles.username}>{username} </p>
                        </button>
                   { hide ? <div className={styles.navDropdown}>
                        <div onClick={handleSignOut}>
                            <Link  className={styles.linkName} href="/login">SignOut</Link>
                        <div className={styles.lineWrapper}></div>
                        </div> 
                    </div> : "" }
                </div>
            </nav>
            </div>
        </div>
    )
}

export default Navbar;