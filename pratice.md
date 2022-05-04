### 스크립트 로딩 전략

페이지의 모든 HTML은 순서 그대로 불러온다. JavaScript 를 사용해서 페이지 내의요소( [Document Object Model](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents#the_document_object_model))를 조작하려할때, HTMl의 요소보다 JAVASCRIPT파일을 먼저 불러와버리면 코드가 올바르게 동작하지 않을 수 있다.

- **고전적방식**

  - 고전적인 방법은 body 태그 후에 script 요소를 배치하는것이다. 모든 html을 읽은 후 에 스크립트를 불러와 실행한다.하지만 이 방식은 html dom을 모두 불러오기 전에는 스크립트 로딩과 분석이 완전히 중단 된다는 것이다. 실제 파일 수 가 많은 대형 사이트의경우 성능 정하를 야기시 킬 수 있다.

- #### async 와 defer

- **async**

  - async 특성을 지정하면 스크립트를 가져오는 동안 페이지는 로딩을 중단하지 않는다. 그러나 **스크립트 다운로드가 끝나면 바로 실행된다**. **실행도중에는 페이지 렌더링이 중단된다**. 스크립트의 실행 순서를 보장할 방법이 없는 방식이다.
  - 다른 스크립트에 의존하지 않는 독립 스크립트에 사용해야한다.

![img](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript/async-defer.jpg)

```
<script async src="js/vendor/jquery.js"></script>

<script async src="js/script2.js"></script>

<script async src="js/script3.js"></script>
```

위코드를 실행시 html의 다운로드 실행순서를 보장 할 수 없다.

- async는 다수의 백그라운드 스크립트를 최대한 빠르게 불러와야 할 때 사용하면 이점이 있다.

**defer**

- defer 특성을 지정한 **스크립트는 페이지 내에 배치한 순서대로 불러오게 된다**. 또한 페이지 콘텐츠를 모두 불러오기 전까지는 실행하지 않는다. 페이지 요소를 수정하거나,추가하는 등의 DOM작업을 기대하는 스크립트에 유용한다.

```
<script defer src="js/vendor/jquery.js"></script>

<script defer src="js/script2.js"></script>

<script defer src="js/script3.js"></script>
```

위 코드의 경우 실행 순서를 보장 받을 수 있으며, DOM이 그러져민 스크립트는 실행된다.

#### **요약**

- `async`와 `defer` 모두, 브라우저가 페이지의 다른 내용(DOM 등등)을 불러오는 동안 스크립트를 별도 스레드에서 불러오게 만듭니다(동시에 다운로드는 가능). 덕분에 스크립트를 가져오는 동안 페이지 로딩이 중단되지 않습니다.
- `async` 특성을 지정한 스크립트는 다운로드가 끝나는 즉시 실행합니다. 실행은 현재 페이지 렌더링을 중단하며, 실행 순서는 보장되지 않습니다.
- `defer` 특성을 지정한 스크립트는 순서를 유지한 채로 가져오며 모든 콘텐츠를 다 불러온 이후에 실행합니다.
- 의존성 없는 스크립트를 불러온 즉시 실행하려면 `async`를 사용하세요.
- 다른 스크립트에 의존하거나 DOM 로딩이 필요한 스크립트에는 `defer`를 사용하고, 원하는 순서에 맞춰서 `<script>` 요소를 배치하세요.
