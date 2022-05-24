JavaScript 통합 정리본

기본적인 JavaScript 문법을 정리해보자.

---

## 목차

[toc]

---

정리 참조 사이트.

- https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/What_is_JavaScript
  - Mdn 공식문서
- https://ko.javascript.info/

### 1.스크립트 로딩 전략

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

**요약**

- `async`와 `defer` 모두, 브라우저가 페이지의 다른 내용(DOM 등등)을 불러오는 동안 스크립트를 별도 스레드에서 불러오게 만듭니다(동시에 다운로드는 가능). 덕분에 스크립트를 가져오는 동안 페이지 로딩이 중단되지 않습니다.
- `async` 특성을 지정한 스크립트는 다운로드가 끝나는 즉시 실행합니다. 실행은 현재 페이지 렌더링을 중단하며, 실행 순서는 보장되지 않습니다.
- `defer` 특성을 지정한 스크립트는 순서를 유지한 채로 가져오며 모든 콘텐츠를 다 불러온 이후에 실행합니다.
- 의존성 없는 스크립트를 불러온 즉시 실행하려면 `async`를 사용하세요.
- 다른 스크립트에 의존하거나 DOM 로딩이 필요한 스크립트에는 `defer`를 사용하고, 원하는 순서에 맞춰서 `<script>` 요소를 배치하세요.

### 2.자료형

자바스크립트 (ES6 기준) 는 7개의 타입이 있다. 6개의 원시타입과 1개의 객체타입이 존재한다.

- 정수(number) - 숫자 , 정수와 실수 구분 없이 하나의 숫자타입만 존재한다.

  - int,long,float,double 등과 같이 다앙햔 숫자 타입이 없다. **모든 수를 실수로 처리한다.** (정수를 표현하는 데이터 타입은 존재하지 않는다.)

  - 모두 10진수로 처리된다.

  - 숫자를 처리하는 특별한 값도 존재한다

    - Infinity : 양의 무한대

    - -Infinity : 음의 무한대

    - NaN : 산술 연산 불가

    - 대소문자를 구변함으로 NaN으로 표기

    - BigInt

      - 길이에 상관없이 정수를 나타낼수 있음

      - ```javascript
        // 끝에 'n'이 붙으면 BigInt형 자료입니다.
        const bigInt = 1234567890123456789012345678901234567890n;
        ```

- 문자형 (string) - 문자열은 따옴표로 묶는다.

  - 따옴표는 세 종류가 있습니다.
    1. 큰따옴표: `"Hello"`
    2. 작은따옴표: `'Hello'`
    3. 역 따옴표(백틱, backtick): ``Hello``
  - 원시 타입으로 변경 불가능한 값이다.

- 불린형(논리 타입) - 불린형(논리 타입)은 `true`와 `false` 두 가지 값밖에 없는 자료형입니다.

- undefined 

  - 변수를 선언 후 값이 할당되지 않는다면, 자바스크립트 엔진이 기본적으로 값을 할당하는 값.
  - 값이 현재 할당되지 않는 상태이다.
  - 변수에 undefined을 사용하는것 보다 null을 사용하자.

- null - null타입의 값은 null이 유일하다.

  - 값이 없다는것을 의도적으로 명시
  - 존재하지 않음, 비어있음을 명시

- 심벌 타입

  - 변경 불가능한 원시타입이다.

  - 심벌 값은 다른 값과 중복되지 않는 유일무일한 값이다. 

  - 주로 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용된다.

  - ```javascript
    const objKey = Symbol('obj');
    const obj = {};
    obj.objKey = objKey;
    ```

데이터 타입에 의한 값의 해석

- 값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정
- 값을 참조할때 읽어 들어야 할 메모리 공간의 크기를 결정
- 메모리에서 읽어 들인 2진수를 어떻게 해석할지 결정

/\* > 인용구

