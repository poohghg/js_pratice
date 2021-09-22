const container = document.getElementById('root');

function sendAjax(method,url) {
    const ajax = new XMLHttpRequest();
    // 3번째 인자가 true이면 비동기 처리 
    ajax.open(method,url,false);
    ajax.send();
    return JSON.parse(ajax.response);
}

const store = {
    currentPage : 1,
    totalPageNum : 0
}

function newFeed() {
    const feedUrl = "https://api.hnpwa.com/v0/news/1.json"; 
    const newsFeeds = sendAjax("GET",feedUrl);
    store.totalPageNum = newsFeeds.length % 10 === 0 ? newsFeeds.length/10 : newsFeeds.length/10 + 1;
    const newList = [];
    newList.push(`<ul>`)
    
    for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
        /**
         * Dom Api을 사용하지 않고 문자열만을 가지고 DOM을 만들기
         */
        newList.push(`
            <li>
                <a href="#/show/${newsFeeds[i].id}"> 
                    ${newsFeeds[i].title} (${newsFeeds[i].comments_count})
                </a>    
            </li>
        `);
    }
    
    newList.push(`</ul>`)
    newList.push(`
        <div>
            <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
            <a href="#/page/${store.currentPage === store.totalPageNum 
                ? store.totalPageNum 
                : store.currentPage + 1}
            ">
                다음 페이지
            </a>
            <a href="#/page/1">홈</a>
        </div>
    `)
    // join은 배열을 문자열로 리턴
    container.innerHTML = newList.join('');
}

function newDetail() {
    const contentDiv = document.createElement("div");
    contentDiv.className = "content"
    // 해쉬 체이지 이벤트는 일종의 북마크가 변경된것
    const id = location.hash.replace("#/show/","")
    const contentUrl = `https://api.hnpwa.com/v0/item/${id}.json`;
    const content = sendAjax("GET",contentUrl);

    // root container 의 내용을 지우고 overwrite함
    container.innerHTML = `
        <h1>${content.title}</h1>
        <div>
            <a href="#/page/${store.currentPage}">목록으로</a>
        </div>
    `;
}

function router() {
    const routePath = location.hash;
    // location hash에 #만있을경우 빈문자열로 간주한다.
    if (routePath === '') {
        // 빈페이일 경우
        newFeed();
    } else if(routePath.indexOf("#/page/") > -1){
        store.currentPage = Number(location.hash.split("#/page/")[1]);
        newFeed();
    } else if(routePath.indexOf("#/show/") > -1) {
        newDetail();
    }
}

window.addEventListener('hashchange',router);
router();