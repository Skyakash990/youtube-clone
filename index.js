import API_KEY from "./API_KEY.js";

const videoCardContainer=document.querySelector('.video-container');
// const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=0&key=${API_KEY}`;
const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?`;
const channelListUrl=`https://www.googleapis.com/youtube/v3/channels?`;

const numberOfVideosInitialLoad=50;
const generateQueryParam= new URLSearchParams({
    key:API_KEY,
    part:"snippet,contentDetails",
    chart:"mostPopular",
    maxResults:numberOfVideosInitialLoad,
    regionCode:"IN",
})

fetch(videoListUrl+generateQueryParam)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)   
        data.items.forEach((item)=>{
            getChannelIcon(item);
            makeVideoCard(item);
        })
    })
    .catch((err)=>console.log(err));

//get channel thumbnail from individual item to single array items
const getChannelIcon =(video_data)=>{
    fetch(channelListUrl + new URLSearchParams({
        key:API_KEY,
        part:"snippet",
        id:video_data.snippet.channelId,
    })).then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
        })
        .catch((err)=>console.log(err));
}
//make video card
const makeVideoCard = (data) =>{
    const videoCard =document.createElement("div");
    videoCard.classList.add("video");

    videoCard.addEventListener("click",()=>{
        window.location.href=`video.html?id=${data.id}`;
    })
        videoCard.innerHTML=`
        <img src="${data.snippet.thumbnails.high.url}" id="thumbnail" class=""/>
        <div>
         <img src="${data.snippet.thumbnails.high.url}" id="channel-icon"/>
         <h3 id="title">${data.snippet.title}</h3>
        </div>
        <p id="channel-name">${data.snippet.channelTitle}</p>
            <p id="views"><span>1 year ago</span></p>
        `;
    videoCardContainer.appendChild(videoCard);
}


// fetchData();
// let vidContainer=document.querySelector(".video-container");

// const fetchData = async () => {
//     const videoListUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=0&key=${API_KEY}`;
//     try {
//         const response = await fetch(videoListUrl);
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// fetchData();
