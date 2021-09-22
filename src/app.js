const container = document.getElementById('root');

function sendAjax(method,url) {
    const ajax = new XMLHttpRequest();
    // 3번째 인자가 true이면 비동기 처리 
    ajax.open(method,url,false);
    ajax.send();
    return JSON.parse(ajax.response);
}

function newFeed() {
    const feedUrl = "https://api.hnpwa.com/v0/news/1.json"; 
    const newsFeeds = sendAjax("GET",feedUrl);

    const newList = [];
    newList.push(`<ul>`)
    newsFeeds.map(feed =>{
        /**
         * Dom Api을 사용하지 않고 문자열만을 가지고 DOM을 만들기
         */
        newList.push(`
        <li>
            <a href=#${feed.id}> 
                ${feed.title} (${feed.comments_count})
            </a>    
        </li>
        `);
    })
    newList.push(`</ul>`)
    // join은 배열을 문자열로 리턴
    container.innerHTML = newList.join('');
}

function newDetail() {
    const contentDiv = document.createElement("div");
    contentDiv.className = "content"
    // 해쉬 체이지 이벤트는 일종의 북마크가 변경된것
    const id = location.hash.replace("#","")
    const contentUrl = `https://api.hnpwa.com/v0/item/${id}.json`;
    const content = sendAjax("GET",contentUrl);

    // root container 의 내용을 지우고 overwrite함
    container.innerHTML = `
        <h1>${content.title}</h1>
        <div>
            <a href=#>목록으로</a>
        </div>
    `;

    // if(contentDiv.hasChildNodes("h1")){
    //     const title = document.querySelector(".content > h1");
    //     title.innerText = content.title;
    // }else{
    //     const title = document.createElement("h1");
    //     title.innerText = content.title;
    //     contentDiv.appendChild(title);
    // }
}

function router() {
    const routePath = location.hash;
    // location hash에 #만있을경우 빈문자열로 간주한다.
    console.log("routePath",routePath)
    if (routePath === '') {
        newFeed();
    } else {
        newDetail();
    }
}


window.addEventListener('hashchange',router);
newFeed();
