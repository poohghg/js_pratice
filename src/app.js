const ajax = new XMLHttpRequest();
// 비동기 처리
ajax.open("GET","https://api.hnpwa.com/v0/news/1.json",false);
ajax.send();
const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");

newsFeed.map(feeds =>{
    const li = document.createElement("li")
    li.innerText = feeds.title;
    ul.appendChild(li);
})

document.getElementById("root").appendChild(ul)