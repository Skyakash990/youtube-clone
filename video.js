
import API_KEY from "./API_KEY.js";

const urlParams= new URLSearchParams(window.location.search);
const videoId = urlParams.get('id');
console.log(videoId);


const videoPlayerContainer=document.querySelector("#video-player");
const videoListUrl = "https://youtube.googleapis.com/youtube/v3/videos?";


if(videoId){
    fetch(videoListUrl + new URLSearchParams({
        key:API_KEY,
        part:"snippet",
        id:videoId,
    })).then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        videoPlayerContainer.innerHTML=`
        <iframe src="https://www.youtube.com/embed/${videoId}"frameborder="0" height="450px" width="900px" autoplay></iframe>
        <h3 id="title">${data.items[0].snippet.title}</h3>
        `
    })
    .catch((err)=>console.log(err))

    
}



