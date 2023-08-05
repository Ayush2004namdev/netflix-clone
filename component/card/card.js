import Image from "next/image"
import styles from "./card.module.css"
import { useState } from "react"
import {motion} from 'framer-motion'
import cls from "classnames"

const Card = ({imgUrl="/static/cliffor.webp" , size="medium"}) => {
    const [imageUrl , setImageUrl] = useState(imgUrl);
    const SizeMap = {
        large : styles.lgItem,
        small : styles.smItem,
        medium : styles.mdItem
    }

    const imageError = () => {
        setImageUrl("https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80")
    }

    return(
        <>
        <div className={cls(styles.container , styles.imgMotionWrapper)}>
           <motion.div className={SizeMap[size]} whileHover={{scale: 1.1,transition: { duration: 0.15 }}}> 
        <Image alt="cover Image" className={styles.cardImg}
         src={imageUrl} 
         fill={true}
         onError={imageError}/>  
        </motion.div>
       </div>
        </>
    )
}

export default Card