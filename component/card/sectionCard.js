import Link from "next/link";
import Card from "./card";

import styles from "./sectionCard.module.css"


const SectionCard = ({title , videos , size , id}) => {
  return (
    <section className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.cardWrapper}>
        {videos.map((video, i) => {
            return <Link key={video.id} href={`/video/${video.id}`}> <Card imgUrl={video.imgUrl}  size={size}/> </Link>
        })}
        </div>
    </section>
  )
}

export default SectionCard;