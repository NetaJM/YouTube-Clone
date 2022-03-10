'use strict'

const videoCardContainer = document.querySelector('.video-container');

let api_key = 'AIzaSyB1DyAna7AR7caRSpXSAgz4NQDoFgo93xQ';
let video_http = 'https://www.googleapis.com/youtube/v3/videos?';
let channel_http = 'https://www.googleapis.com/youtube/v3/channels?';


fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 30,
    regionCode: 'IL',
    videoCategoryId: 0
}))
    .then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item);
        })
    })
    .catch(err => console.log(err));



// fetching the channel icon URL to the video data
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
}


// Adding the fetched data to the video card
const makeVideoCard = (data) => {
    videoCardContainer.innerHTML +=
        `<div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
        <img src="${data.channelThumbnail}" class="channel-icon" alt="">
        <div class="info">
            <h4 class="title">${data.snippet.title}</h4>
            <p class="channel-name">${data.snippet.channelTitle}</p>
        </div>
    </div>
</div>`
}


// Search Bar
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = 'https://www.youtube.com/results?search_query=';

function lala() {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
}

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
})

searchInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        location.href = searchLink + searchInput.value;
    }
});







