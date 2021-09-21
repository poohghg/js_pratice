function sendAjax(method,url) {
    const ajax = new XMLHttpRequest();
    // 비동기 처리
    ajax.open(method,url,false);
    ajax.send();
    return JSON.parse(ajax.response);
}

const newsFeed = sendAjax("GET","https://api.hnpwa.com/v0/news/1.json")
const ul = document.createElement("ul");

newsFeed.map(feed =>{
    const li = document.createElement("li")
    const aTag = document.createElement("a");
    aTag.innerText = feed.title;
    aTag.setAttribute("href",feed.url);
    aTag.setAttribute("target","_blank");

    li.appendChild(aTag);
    ul.appendChild(li);
})

document.getElementById("root").appendChild(ul)