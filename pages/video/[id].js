import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import cls from "classnames"
import { getVideoById } from "@/lib/video";
import Navbar from "@/component/navbar/navbar";
import Head from "next/head";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  //data to fetch from API
  const videoId = context.params.id
  const video = await getVideoById(videoId)
  return {
    props: {
      video : video.length > 0 ? video[0] : {} ,
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((id) => ({
    params: { id },
  }));

  return { paths, fallback: "blocking" };
}


const Video = (id) => {
  console.log({id})
  const {title , publishTime , discription, channelTitle, viewCount} = id.video

    const router = useRouter();
    const routeId = router.query.id

    return (<>
      <Head>
        <title>{title}</title>
      </Head>
        <div className={styles.container}>
          <Navbar />
          <Modal
            className={styles.modal}
            isOpen={true}
            contentLabel="Watch the video"
            onRequestClose={() => router.back()}
            overlayClassName={styles.overlay}
          >
            <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${routeId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
        ></iframe>
          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.col1}>
                  <p className={styles.publishTime}>{publishTime}</p>
                  <p className={styles.title}>{title}</p>
                  <p className={styles.description}>{discription}</p>
              </div>
              <div>
                <p className={cls(styles.subText , styles.subTextWrapper)}>
                  <span className={styles.textColor}>Cast :</span>
                  <span className={styles.channelTitle}>{channelTitle}</span>
                </p>
                <p className={cls(styles.subText , styles.subTextWrapper)}>
                  <span className={styles.textColor}>ViewCount :</span>
                  <span className={styles.channelTitle}>{viewCount}</span>
                </p>
              </div>
            </div>
          </div>
          </Modal>
        </div>
        </>);
}

export default Video;