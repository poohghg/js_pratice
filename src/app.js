const container = document.getElementById('root');

function sendAjax(method,url) {
    const ajax = new XMLHttpRequest();
    // 비동기 처리
    ajax.open(method,url,false);
    ajax.send();
    return JSON.parse(ajax.response);
}

const feedUrl = "https://api.hnpwa.com/v0/news/1.json"; 
const newsFeeds = sendAjax("GET",feedUrl);
const ul = document.createElement("ul");
const contentDiv = document.createElement("div");
contentDiv.className = "content"

window.addEventListener('hashchange',(e)=>{
    e.preventDefault();
    // 해쉬 체이지 이벤트는 일종의 북마크가 변경된것
    const id = location.hash.replace("#","")
    const contentUrl = `https://api.hnpwa.com/v0/item/${id}.json`;
    const content = sendAjax("GET",contentUrl);

    if(contentDiv.hasChildNodes("h1")){
        const title = document.querySelector(".content > h1");
        title.innerText = content.title;
    }else{
        const title = document.createElement("h1");
        title.innerText = content.title;
        contentDiv.appendChild(title);
    }
})

newsFeeds.map(feed =>{
    const li = document.createElement("li")
    const aTag = document.createElement("a");
    
    aTag.innerText = `${feed.title} (${feed.comments_count})`;
    aTag.setAttribute("href",`#${feed.id}`);
    
    // aTag.setAttribute("href",feed.url);
    // aTag.setAttribute("target","_blank");
    // href의 #은 해쉬는 일종의 북마크 name과 같으면 바로 스크롤링되는 이벤트
    // aTag.addEventListener('click',()=>{})

    li.appendChild(aTag);
    ul.appendChild(li);
})

container.appendChild(ul);
container.appendChild(contentDiv);