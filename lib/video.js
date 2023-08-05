import data from "../data/video.json"


export const getVideos = async (searchQuery) => {
    
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchQuery}&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
    const videoData = await response.json()
    if(videoData.error){
        console.log(videoData.error)
        return []
    }
    return videoData.items.map(item => {
        return {
            title : item?.snippet?.title,
            imgUrl :item?.snippet?.thumbnails?.high?.url,
            id : item?.id?.videoId,
        }
    })
}

export const getPopularVideos = async () => {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&maxResults=25&chart=mostPopular&regionCode=In&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
    const videoData = await response.json()
    if(videoData.error){
        return []
    }
    return videoData.items.map(item => {
        return {
            title : item?.snippet?.title,
            imgUrl :item?.snippet?.thumbnails?.high?.url,
            id : item?.id,
        }
    })
}

export const getVideoById =  async (videoId) =>  {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`)
    const videoData = await response.json()
    if(videoData.error){
        return []
    }
    return videoData.items.map(item => {
        return {
            title : item?.snippet?.title,
            imgUrl :item.snippet?.thumbnails?.high?.url,
            id : item?.id,
            publishTime : item.snippet?.publishedAt,
            discription : item.snippet?.description,
            channelTitle : item.snippet?.channelTitle,
            viewCount : item.statistics?.viewCount
        }
    })
}