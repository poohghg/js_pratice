JavaScript 통합 정리본

기본적인 JavaScript 문법을 정리해보자.

---

## 목차

[TOC]

---

정리 참조 사이트.

- https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/What_is_JavaScript
  - Mdn 공식문서
- https://ko.javascript.info/
- https://github.com/yjs03057/33-js-concepts
- https://velog.io/@jakeseo_me/series/33conceptsofjavascript



***



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

**위 코드의** **경우 실행** 순서를 보장 받을 수 있으며, DOM이 그러져민 스크립트는 실행된다.

**요약**

- `async`와 `defer` 모두, 브라우저가 페이지의 다른 내용(DOM 등등)을 불러오는 동안 스크립트를 별도 스레드에서 불러오게 만듭니다(동시에 다운로드는 가능). 덕분에 스크립트를 가져오는 동안 페이지 로딩이 중단되지 않습니다.

- `async` 특성을 지정한 스크립트는 다운로드가 끝나는 즉시 실행합니다. 실행은 현재 페이지 렌더링을 중단하며, 실행 순서는 보장되지 않습니다.

- `defer` 특성을 지정한 스크립트는 순서를 유지한 채로 가져오며 모든 콘텐츠를 다 불러온 이후에 실행합니다.

- 의존성 없는 스크립트를 불러온 즉시 실행하려면 `async`를 사용하세요.

- 다른 스크립트에 의존하거나 DOM 로딩이 필요한 스크립트에는 `defer`를 사용하고, 원하는 순서에 맞춰서 `<script>` 요소를 배치하세요.

---



### 2.값과 자료형

자바스크립트 (ES6 기준) 는 7개의 타입이 있다. 6개의 원시타입과 1개의 객체타입이 존재한다.

원시타입관 객체타입의 구분 이유

- 원시타입의 값, 즉 원시값은 변경불가능한 값이다(immutable value)이다. 이에 비해 객체(참조)타입의 값, 즉 객체 는 변경가능한(mutable value) 값이다. 

- 원시 값은 변수에 할당하면 변수(확보된 메모리 공간)에는 실제 값이 저장된다. 이에 비해 객체를 변수(확보된 메모리 공간)에 할당하면 변수에는 참조값이 저장된다.
- 원시 값을 갖는 변수를 다른 변수에 할당하면 원본의 원시 값이 복사되어 전달된다. 이를 **값에 의한 전달**이라한다. 이에 비해 객체를 가르키는 변수를 다른 변수에 할당하면 원본의 참조 값이 복사되어 전달된다. 이를 **참조에 의한 전달**이라 한다.



변수는 선언에 의해 생성되고 할당을 통해 값을 갖는다.

!!할당연산자는 값이 저장된 메모리 공간의 주소를 할당한다.

변수: 하나의 값을 저장하기 위해 확보된 메모리 공간(메모리 주소)

값: 변수에 저장된 데이터로서 표현식이 평가되어 생선된 결과

`변경 불가능하다는 것은 변수가 아니라 값이다.` 

- 원시 값은 변경불가능하다.하지만 변수는 언제든 재할당을 통해 변경가능하다.

  - 재할당이란 새로운 메모리 공간을 확보 할당 후, 변수는 새로운 원시값을 가리킨다.

- <img src="https://velog.velcdn.com/images%2Fmr_chu%2Fpost%2F6eec5b62-8105-483e-bfff-088b9318c8dd%2F%EB%B3%80%EC%88%98%20%EC%9E%AC%ED%95%A0%EB%8B%B9.jpeg" alt="변수 값의 할당과 재할당"  />

- 값에 의한 전달

  - 값의 의한 할당이 일어나면, 평가된 값은 같지만 할당된 메모리공간은 별개이다.

  - <img src="https://velog.velcdn.com/images%2Fsozero%2Fpost%2F67c6f130-24c3-4c35-b819-28b17ce9ed99%2F11%E1%84%80%E1%85%A1%E1%86%B9%E1%84%8B%E1%85%A6%E1%84%8B%E1%85%B4%E1%84%92%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%83%E1%85%A1%E1%86%AF.png" alt="img" style="zoom: 67%;" />

  - ```javascript
      let score = 80;
      // score의값 80이 할당
      let copy = score
      // -> true
      console.log(score === copy);
      score = 100;
      // -> false
      console.log(score === copy);
    ```

    

#### 타입

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
    3. 역 따옴표(백틱, backtick): `Hello`
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
    const objKey = Symbol("obj");
    const obj = {};
    obj.objKey = objKey;
    ```

#### 데이터 타입에 의한 값의 해석

자바스크립트 엔진은 데이터 타입. 즉 값의 종류에 따라 정해진 크기의 메모리공간을 확보한다. 즉 변수에 할당되는 값의 데이터 타입에 따라 확보되어야 할 메모리 공간의 크기가 결정된다.

- 값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정
- 값을 참조할때 읽어 들어야 할 메모리 공간의 크기를 결정
- 메모리에서 읽어 들인 2진수를 어떻게 해석할지 결정
  - 심벌테이블: 컴파일러 또는 인터프리터는 심벌테이블 이라고 부르는 자료 구조를 통해 식별자를 키로 바인된 값의 메모리 주소, 데이터 타입, 스코프 등을 관리한다.

#### 동적 타이핑

자바스크립트 변수는 선인이 아닌 할당(깂)에 의해 타입이 결정된다. 그리고 재할당(값의 변화)에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다.

<> 정적타입(명시적 타입선언): 변수를 선언할때 데이터 타입을 선언 ex) java String name;

- 변수는 꼭 필요한 경우 제한적으로 사용한다.
- 변수의 유효범위(스코프)는 최대한 좁게 만들어 사용한다.
- 전역변수는 최대한 사용하지 않는다.
- 변수보다는 상수를 사용한다 `CONST 사용!!`
- 변수의 이름은 변수의 목적이나 의미를 파악할 수 있도록 네이밍한다.

#### 암묵적 형 변환

자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다.

자바스크립트 엔진은 표현식을 평가할때 코드의 문맥을 고려해 암묵적으로 데이터 타입을 강제 변환한다.

```javascript
const string_1 = "1";
const string_2 = "2";
const number_1 = 1;
const number_2 = 2;
// -> 12
console.log(string_1 + number_1);
// -> 12
console.log(string_1 + string_2);
// 3
console.log(number_1 + number_2);
// 1true -> string 으로 변환?
console.log(string_1 + true);
// 1false
console.log(string_1 + false);
// string
console.log(typeof (string_1 + true));
// -> 2 true는 number 1로 변환
console.log(number_1 + true);
// -> 1 fals는 number 0으로 변환
console.log(number_1 + false);
// -> 1 null은 number 0으로 변환
console.log(number_1 + null);
// NaN undefined은 숫자로 타입 변환되지 않는다.
console.log(number_1 + undefined);
// true 동등비교연산이 일어날 경우에도 자동 형변환이 일어난다.
console.log(string_1 == number_1);
// false 일치비교연산시는 자동형변환이 일이나지 않음(타입 및 값을 비교).
console.log(string_1 === number_1);
// 일치비교 연산시 팁!! -> false
// NaN은 isNaN 또는 object.is로 비교
console.log(NaN === NaN);

function checkTypeOf() {
  console.log("null ", typeof null);
  // null은 object로 반환한다. js의 버그이다.
  // type of 는  원시타입5개(null 제외) + object + function 총 7개 형태로 반환한다.
  // 함수의 타입은 function이다.
  // 배열은 유사배열 객체로 object 타입이다. 배열 확인은 Array.isArray()함수를 통해 확인.
  // null 타입은 반환하지 않는다.
  const temp = null;
  const obj = {};
  // temp의 타입은 object다.
  console.log("temp의 타입은 ? ", typeof temp);
  // false
  console.log(typeof temp === null);
  // true
  console.log(typeof temp === typeof obj);
  // true
  console.log(temp === null);
}
```

- 암묵적 타입 변환이 일어나는 조건식일때의 값
  - Falsy값
    - flase
    - undefined
    - null
    - 0,-0
    - NaN
    - '' (빈문자열)

### 3.유용한 연산자

#### 단축평가

||(논리핪) or &&(논리곱) 연산자 표현식의 평가결과는 불리언 값이 아닐 수도 있다. 두 연산자는 언제나 2개의 피연산중 어느 한쪽으로 평가된다. 왼쪽연산자 부터 시작해 오른쪽으로 나아가며 피연산자를 계산한다.

- || 연산자
  - 각 피연산자를 불린형으로 변환하여 평가한다음, true이면 평가를 멈추고 변환전 해당값 반환한다.
  - 모든값이 false로 평가되는 경우 변환전 마지막값을 반환한다.
- && 연산자 
  - 각 피연산자를 불린형으로 변환하여 평가한다음, false이면 평가를 멈추고 변환전 해당값 반환한다.
  - 모든값이 true로 평가되는 경우 변환전 마지막값을 반환한다.
  - 

| true \|\| anything  |   true   |
| :-----------------: | :------: |
| false \|\| anything | anything |
|  true && anything   | anything |
|  false && anything  |  False   |



```javascript
// 단축평가를 사용한 기본값 설정
function shortEvaluation(v) {
  // falsey한 값일 경우 우항의 값으로 취환된다.
  v = v || "notValue"
  console.log(v);
  return v
}

// 매개변수의 기본값 설정시
// 인자값이 null(값이 전달되지 않았을때) or undefined 인경우만 동작한다.
function isDefaultParams(v = "notValue") {
  console.log(v);
  return v
}

// -> notValue
shortEvaluation(NaN)

// -> undefined (기본값으로 취환되지 않음.)
isDefaultParams(NaN)

// arguments의 null은 notValu로 취환 -> notValue
isDefaultParams()

```



Nullish 병합 연산자 ??

- nullish의 경우 || 연산자와 비슷해보이지만 || 연산자의 경우 앞의 값이 `falsey`값인 경우 뒤의값을 취하지만 `?? 병합연사자의 경우 앞의 값이 null || undefined인 경우에만` 뒤의 값을 취한다. 

  ```javascript
  let height = 0;
  // 좌항의 값을 블리언으로 변환후 false이면 우항의값을 반환한다.
  alert(height || 100); // 100
  // 좌항의 값이 null 또는 undefined 이면 우항의값을 반환한다. 
  alert(height ?? 100); // 0
  ```

- 연산자 우선순위가 5로 낮기 때문에 괄호를 사용하자.

- 안정성 관련 이슈 때문에 `??`는 `&&`나 `||`와 함께 사용하지 못한다.

/ > `인용구`

#### 옵셔널 체이닝

?.연산자는 좌항의 피연산자가 null 또는 undefined 인경우 평가를 멈추고 undefined을 반환하고, 그렇지 않으면 우항의 프로퍼티 값을 참고한다.

- 이는 객체가 null 또는 undefined 아닌지 확인하고 객체의 프로퍼티를 참고할때 유용한다.

- ```javascript
  function checkFunction(obj) {
    console.log("user:",obj?.user); 
    console.log(obj?.printUser?.());
  }
  
  const info1 = {
    user:"kwon",
    printUser(){return this.user}
  }
  const info2 = {}
  // 실제 프로퍼티가 존재하기에 -> kwon이 찍힌다.
  checkFunction(info1)
  // 존재하지 않는 프로퍼티에 접근하였기에 undefined을 반환한다.
  // 옵셔널 체이닝을 사용하지 않았을경우 참조에러로 app crashed가된다.
  checkFunction(info2)
  
  ```

- 옵셔널 체이닝을 남발할 경우 초기에 에러를 발견하지 못하거나,디버깅이 어려워 질 수 있다.(필수값에는 사용하지 말자.)

- 참조하는 변수는 꼭 선언 되어 있어야한다!!!

  

***



### 4.객체

객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키와 값으로 구성된다. 객체는 원시타입 (immutable value)과는 다르게 다양한 타입의 값으로 구성된 복합적인 자료구조이다. 원시타입의 값은 변경 불가능하지만, **객체 타입의 값은 변경가능하다**. 자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있다. 함수 또한 일급 객체 이므로 프로퍼티로 사용 할 수 있다. 프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다.

- 객체 리터럴

  - 리터럴: 리터럴은 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법이다.


  ```javascript
  const info1 = {
    user:"kwon",
    printUser(){return this.user}
  }
  // 빈객채를 생성
  const info2 = {}
  ```

- **객체를 대괄호 연산자로 접근할 경우 반드시 따옴포로 감싼 문자열로 접근해야한다. `이는 자바스크립트 엔진이 식별자로 해석하기 때문이다.`**

- ```javascript
  // kwon
  console.log(info1["user"]);
  // error -> user is not defined
  const key1 = "user"
  // kwon
  console.log(info1[key1]);
  ```

- 객체의 접근경우 변수에 할당된 참조값에 의해 메모리에 접근하면, 참조값(참조 주소)은 객체가 저장된 메모리 공간의 주소이다.

  - 메모리에 저장되어 있는 참조값을 통해 실제 객체(데이터)에 접근한다.

  - 원시값의 변경불가능한 값으로, 재할당을 통해 값을 변경한다. `반면 객체는 변경 가능한 값이므로 메모리에 저장된 객체를 직접 수정할 수 있다.`

    - 객체에 할당한 변수의 참조값은 변하지 않는다.(하지만 참조값의 실제 데이터는 수정가능하다.)
    - 이는 객체를 복사해서 생성하는 비용을 절약하여 성능적 향상을 가져가기 위함이다.

  - ```javascript
    function checkObj() {
     const a = {
       name:"kown"
     }
     const b = a
     // true: 둘의 저장된 메모리는 다르지만 동일한 참조값을 바라본다.
     // 값에 의한전달.
     console.log(a===b);
     b.update = true
     // b의값이 변하면 a의값도 변한다.
     console.log(a);
     console.log(b);
      // a객체와 b객체는 같은 메모리 주소를 참고한다.
      // a -> { name: 'kown', update: true }
      // b -> { name: 'kown', update: true }
     console.log(a===b);
    }
    ```

  - 얕은 복사 vs 깊은복사

    - 객체를 프로퍼티 값으로 갖는 객체의 경우 얕은 복사는 한 단계까지만 복사하는 것을 말하고 깊은 복사는 객체에 중첩되어 있는 객체까지 모두 복사하는 것을 말한다.

    - 얕은 복사로 만들어진 객체는 별개의 객체이다. 하지만 중첩되어 있는 객체의 경우 객체의 참조값을 복사한다.

    - 반면 깉은 복사의 경우 객체에 중첩되어 있는 객체까지 모수 복사하여 완전한 복사본을 만든다.

      - 깊은복사 방법
        - 재귀를 통한 방법
        - JSON.parse(JSON.stringify(obj));
          - JSON 문자열로 변환후 객체화 (느리다...)

        - [lodash](https://lodash.com/)의 메서드인 [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep)을 사용
        - 참고 - https://ko.javascript.info/object-copy

    - ```javascript
      // 얕은복사
      const obj1 = {name:"kwon",isUpdate:false,keyList:["kwon",false,5],innerObj:{a:"aaa",b:"bbb"}}
      // 얕은복사 둘의 결과는 같다.
      const obj2 = Object.assign({},obj1)
      // const obj2 = {...obj1}
      // -> false 
      console.log(obj1 === obj2);
      // -> true 실제 중첩되어 있는 객체의경우에도 같은 참조값을 봐라본다.
      console.log(obj1.keyList === obj2.keyList);
      
      // 중복 객체의 경우 같은 참조값 가짐.
      obj1 :  {
        name: 'kwon',
        isUpdate: false,
        keyList: [ 'kwon', false, 5 ],
        innerObj: { a: 'aaa', b: 'bbb' }
      }
      
      obj2 :  {
        name: 'kwon',
        isUpdate: false,
        keyList: [ 'kwon', false, 5 ],
        innerObj: { a: 'aaa', b: 'bbb' }
      }
      
      // 깊은복사
      // 재귀를 통한 복사.
      function copy (_obj){
        const result = Array.isArray(_obj) ? [] : {}
      
        for (const key in _obj) {
          if(typeof _obj[key] === "object"){
            result[key] = copy(_obj[key])
          }else{
            result[key] = _obj[key];
          }
        }
        return result;
      }
      
      // lodash 사용
      const lodash = require("lodash");
      const obj2 = lodash.cloneDeep(obj1);
      const obj2 = copy(obj1);
      // -> false
      console.log(obj1.keyList === obj2.keyList);
      
      // 전개연산자를 통해 새로운 객체를 만들고 필요한 부분만 다시설정한다.
      const obj1 ={name:"k",num:5,list:[1,2,3]};
      const obj2 = {...obj1,num:10,list:[...obj1.list,10,20]};
      
      // ->{ name: 'k', num: 5, list: [ 1, 2, 3 ] } { name: 'k', num: 10, list: [ 1, 2, 3, 10, 20 ] }
      console.log(obj1,obj2);
      // false
      console.log(obj1 === obj2);
      
      
      
      ```


***

  

### 5.함수

함수는 객체타입으로 선언된 함수 이름은 함수 참조값 or 참조주소(힙 영역)에 의해 메모리에 접근한다.

- 객체의 접근경우 변수에 할당된 참조값에 의해 메모리에 접근하면, 참조값(참조 주소)은 객체가 저장된 메모리 공간의 주소이다(실제 데이터 영역).

- 함수는 함수명으로 호출되는 것이 아니라, 함수 객체를 가르키는 식볋자로 호출한다.

  - -자바스크립트는 함수명을 암묵적으로 할당함.

- ```javascript
  // 함수이름(매개변수,인자) -> parameter
  // 각 매개변수에는 함수를 호출할때 지정한 인수가 순서대로 할당된다.
  // 매개변수의 스코프는 함수내부.
  // arguments를 통해 인자값의 객체를 확인 할 수 있다.
  function  callFunction(a,b) {
    return a+b
  }
  // 인수(argument) -> 인수는 값으로 평가될 수 있는 표현식이여야 한다.
  callFunction(1,2)
  
  function fun_1(num) {
    return num; 
  }
  
  // 함수는 참조타입으로 변수에 함수식별자의 값(참조 주소)을 할당 한다.
  // 실행값 x -> 단지 변수(식별자)에 할당된 값(참조 주소)을 할당
  const getNum = fun_1;
  // -> true
  console.log(getNum === fun_1);
  
  
  ```

-  자바스크립트의 모든 선언문은 런타임 이전에 모두 생성된다.

  - 변수 할당문의 값은 할당문이 실행되는 시점, 즉 런타임에 평가되므로 함수 표현식의 함수 리터럴도 할당문이 실행되는 시점에 평가되어 함수 객체를 생성한다.

  ```javascript
  // -> error
  console.log(add(1,2));
  // 호이스팅
  // 실제호이스팅은 선언만 코드의 최상단으로 끌어올려줘 실행된다.
  console.log(isHosting());
  
  // 함수 선언문
  function isHosting() {
    return console.log("isHosting"); 
  }
  // 함수 표현식
  const add = function adds(x,y) {
    return console.log(x,y);
  }
  ```

- 함수는 가급적 한가지 일을 수행해야 한다.

- 매개변수의 갯수는 제한이 없지만, 최대한 적게 넘기는게 좋다.

- 키워드 인자값이 없고, 인수의 순서되로 할당되기에,객체를 만들어 키값에 접근하는 방식도 좋다.

- return문 -> 기본적으로 undefined을 반환

  - `return문을 만나면 함수는 종료된다.`


#### 화살표 함수

화살표 함수는 기존의 함수 선언문 또는 함수 표현식을 완전히 대체하기 위해 디자인된것은 아니다. 화살표 함수는 기존의 함수보다 표현만 간략한 것이 아니라 내부 동작 또한 간략화되어 있다.

- 생성자 함수로 사용할 수 없다.
- 기존 함수와 this 바인딩 방식이 다르다.
- Prototype 프로퍼티가 없다.
- arguments 객체를 생성하지 않는다.

#### 일급객체(일급함수)

함수를 값처럼 자유롭게 사용할 수 있다.

- 일반 객체처럼 모든 연산이 가능한것
  - 함수를 매개변수로 전달할 수 있음. -> 함수의 참조값 전달
  - 함수를 반환값 으로 사용할 수 있음.
  - 함수를 할당할 변수에 할당 할 수 있음(함수 표현식).
  - 동일비교 대상
  - 객체의 프로퍼티값이 될 수도 있으며, 배열의 요소가 될 수 있다.

#### 고차함수

- 인자로 함수를 받음(콜백함수)
  - 함수를 인자로 받아 함수를 합성하여 사용.
  - 함수의 공통로직은 두고 액션 함수에 따라 목적에 맞게 사용 할 수 있다.
  - 콜백함수는 함수형 프로그램의 기본패러다임 일뿐 아니라, 비동기 처리(이벤트처리,Ajax통신, 타이머 함수)의 중요패턴 중 하나이다.
- 함수를 반환하는 함수

#### 순수함수

함수형 프로그래밍에서 어떤 외부 상태에 의존하지 않고 변경하지도 않는, 즉 부수 효과가 없는 함수를 순수 함수라한다.

- 외부 상태에 의존하지 않고, 오직 매개변수를 의존해 값을 생성한다.
- 최소 하나의 인수를 전달받아 동일한 값을 반환한다.

#### 불변성 

함수내부에서 외부로부터 주어진 인자의 값을 변경하는것은 추천하지 않는다.

- 원식 타입의 경우(변경불가능) 재할당을통해 값을 변경하기에 상관없음.
- 반면 객체 타입의 경우 참조에 의한 전달이기에 언제든 객체데이터의 변경이 가능하다.
- 객체의 경우 참조에 의한 복사임으로 외부로부터 주어진 객체를 함부로 변경하지말자.
  - 객체변경에 따른 코드추적이 어려워 질수 있다.

- 상태 변경이 필요한 경우에는, 새로운 객체를 만들어서 반환해야함.

- ```javascript
  function chageObjNum(obj) {
    // 얕은복사로 새로운 객체를 만들고 필요값을 변경하자.
    return {...obj,num:2} 
  }
  const obj1 ={name:"k",num:5};
  // -> name:"k",num:2
  const obj2 = chageObjNum(obj1);
  ```

#### 중첩함수

함수 내부에 정의된 함수. 중첩 외부 함수 스코프 내에서만 호출 할 수 있다. 일반적으로 중첩함수는 외부함수를 돕는 헬퍼 함수의 역할을 한다.

```javascript
function outerFuncion(arr){
  // 함수안의 헬퍼함수를 만들어 함수 스코프 내부에서 사용할 수 있다.
  function multiply(a){
    return a * 2
  }
  return arr.map((v)=>multiply(v))
}
// -> [ 2, 4, 6, 8, 10 ]
console.log(outerFuncion([1,2,3,4,5])); 
```

***



### 6.스코프(Scope)

스코프는 변수,함수,클래스이름(식별자)의 유효한 범위이다(실행 컨택스트). 이는 선언된 위치에 따라 유효범위가 결정된다. 스코프의 범위는 블럭 안에서만 유효하다. 스코프는 식별자가 유효한 범위를 말한다.

- 스크프의 종류
- 전역: 코드의 가장 바깥 영역 (전역변수)
- 지역: 함수 몸체 내부 (지역변수)

> 현재 실행 컨텍스트입니다. [값](https://developer.mozilla.org/en-US/docs/Glossary/Value) 과 **표현식** 이 "표시"되거나 참조될 수 있는 컨텍스트입니다 . 변수 또는 기타 표현식이 "현재 범위에" 있지 않으면 사용할 수 없습니다.범위는 계층 구조로 계층화될 수도 있으므로 하위 범위가 상위 범위에 액세스할 수 있지만 그 반대는 불가능합니다.
>
> **[함수](https://developer.mozilla.org/en-US/docs/Glossary/Function)** 는 [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript) 에서 **클로저** 역할을 하므로 범위를 생성하므로 (예를 들어) 함수 내에서만 독점적으로 정의된 변수는 함수 외부 또는 다른 함수 내에서 액세스할 수 없습니다. 예를 들어 다음은 유효하지 않습니다.
>
> ---https://developer.mozilla.org/en-US/docs/Glossary/Scope

```javascript
function basisScope() {
  // 지역변수는 자신의 스크포와 하위 스코프에서 사용 가능하다.
  const outer = 'test';
  {
    const inner = 'inner';
    // 상위 스코프 변수에 접근가능
    console.log(outer);
  }
  // 같은 스크프에 있는 변수 
  console.log(outer);
  // 하위 스코프 변수에 접근 불가능
  //-> 접근 불가
  // console.log(inner);
}
```

코드 블록이 정의되는곳

If, for,{},function(){},switch, try...*catch*문

- 이름 충돌방지
  - 유효범위를 가짐으로써 식별자의 충돌을 막을 수 있다.
  - 스코프 내에서 식별자는 유일해야 하지만 다른 스코프에는 같은 이름의 식별자를 사용 할 수 있다.

- 메모리 절약

#### 렉시컬 환경

코드가 어디서 실행되며 주변에 어떤 코드가 있는지를 렉시컬 환경이라고 한다.즉 코드의 문맥은 렉시컬 환경으로 이뤄진다.이를 구현한것이 실행 컨텍스트이며, 모든 코드는 실행 컨택스트에서 평가되고 실행된다.

- 렉시컬 스코프 또는 정적 스코프 : 함수를 어디서 정의했는지에 따라 함수의 상위스코프를 결정한다.이는 함수정의가 평가되는 시점에 상위 스코프가 정적으로 결정된다.
- 함수가 정의된 스코프에서 상위 스코프를 결정.

```javascript
// 렉시컬 스코프: 함수의 선언된 위치에 따라 상위 스코프를 결정
function checkScope() {
  let x = 1;

  function foo(params) {
    let x = 10;
    //-> 10
    console.log(`foo의 x는${x}`);
    // 함수의 호출 스코프와 상관없이 함수가 선언된 스코프에서 동작
    // 스코프체인시 함수의 상위 스코프 x의값(1)를 참조한다.
    bar();
  }

  function bar(params) {
    // -> 1이 출력
    console.log(`bar의 x는${x}`);
  }
  foo();
}
```

- 각각의 블록은 렉시컬 환경을 가지고 있다.
  - 환경레코드
  - 외부 환경 참조(이는 내부스코프에서 스코프 체인을 통해 외부 레시컬 환경에 접근할 수 있기 때문이다.)
  - 스코프 체인: 스코프가 계층적으로 연결된 형태
  - 자바스크립트 엔진은 스코프체인을 통해 변수를 참조하는 스코프에서 시작하여 상위로 이동 (단방향 연결)하며 선언된 변수를 검색 한다. 
  - ![스코프 체인과 클로저](https://images.velog.io/images/rlatmdgns94/post/d1b27a4f-c73b-4515-8264-e2605f5636b2/_.png)



#### GC

메모리 생명주기

1.필요한 메모리 할당

2.할당된 메모리 사용(읽기,쓰기)

3.더 이상 필요하지 않을 때 할당된 메모리 해제

> JavaScript는 객체가 생성될 때 자동으로 메모리를 할당하고 더 이상 사용되지 않을 때 해제합니다( *가비지 수집* ). 이러한 자동성은 잠재적인 혼란의 원인입니다. 개발자에게 메모리 관리에 대해 걱정할 필요가 없다는 잘못된 인상을 줄 수 있습니다.
>
> ### [값 사용](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#using_values)
>
> 값을 사용한다는 것은 기본적으로 할당된 메모리에서 읽고 쓰는 것을 의미합니다. 이는 변수 또는 객체 속성의 값을 읽거나 쓰거나 함수에 인수를 전달하여 수행할 수 있습니다.
>
> ### [메모리가 더 이상 필요하지 않을 때 해제](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management#release_when_the_memory_is_not_needed_anymore)
>
> 대부분의 메모리 관리 문제는 이 단계에서 발생합니다. 이 단계에서 가장 어려운 부분은 할당된 메모리가 더 이상 필요하지 않은 시점을 결정하는 것입니다.
>
> 저수준 언어는 개발자가 프로그램에서 할당된 메모리가 더 이상 필요하지 않은 지점을 수동으로 결정하고 해제해야 합니다.
>
> JavaScript와 같은 일부 고급 언어는 [가비지 수집](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) (GC)으로 알려진 자동 메모리 관리 형식을 활용합니다. 가비지 수집기의 목적은 메모리 할당을 모니터링하고 할당된 메모리 블록이 더 이상 필요하지 않은 때를 결정하고 이를 회수하는 것입니다. 이 자동 프로세스는 특정 메모리 조각이 여전히 필요한지 여부를 결정하는 일반적인 문제를 결정할 수 없기 때문에 근사치 [입니다](https://en.wikipedia.org/wiki/Decidability_(logic)).
>
> 참조
>
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
>
> 



- 전역변수와 지역변수
  - 전역변수의 생명주기는 애플리케이션의 생명주기와 같다
  - `함수 내부에서 선언된 지역 변수는 함수가 호출되면 생성되고 함수가 종료되면 소멸한다.` 
  - 변수는 하나의 값을 저장하기 위해 확보된 메모리 공간 자체이다. 변수의 생명주기는 메모리공간 확보 -> 해제 -> 메모리 풀에 반환 까지이다.
- 전역변수의 문제점
  - 암묵적 결합:코드를 어디에서든 참조하고 할당할 수 있다는것을 의미한다.
    - 변수의 유효범위가 클수록 코드의 가독성은 나뻐지며,의도치 않게 상태가 변경될 수 있다.
  - 긴 생명주기
    - 메모리 리소스도 오랜 기간 소비한다.
    - 만약 var키워드를 사용한다면 의도치 않는 재할당이 일어날수 있다.
    - 파일이 분리되어 있다해도. 변수가 공유된다는 것이다. 이는 다른 파일내에서 동일한 이름으로 망명된 전역변수나 전역 함수가 같은 스코프 내에 존재할 경우 예기치 못한 결과를 가져올 수 있다.

#### 호이스팅

자바스크립트 엔진이 코드를 실행하기 전, 변수,함수,클래스의 선언문을 코드 최상단으로 끌어올리는것

- 런타임 이전에 변수는 할당이됨.

변수의 선언과 초기화를 분리한 후, 선언만 코드의 최상단으로 옮김

- ```javascript
  function checkHoisting(params) {
    // 함수의경우 호이스팅으로 실행된다.
    hoisting();
    // ReferenceError: Cannot access 'checkVar' before initialization
    // console.log(checkVar);
    // ReferenceError: Cannot access 'hoistingFunction' before initialization
    // hoistingFunction();
  
    // let,const,클래스
    // 선언만 호이스팅이되고, 초기화는 되지 않는다.
    // 초기화전 변수에 접근하면 컴파일 에러가 발생한다.
  
    // 만약 var를 사용했다면 undefined이 찍힌다.
    function hoisting() {
      const test = 'test';
    }
  
    const checkVar = 'checkVar';
    const hoistingFubction = hoisting;
  }
  ```

#### var키워드의 문제점	

- 중복선언이 가능하다

- 오로지 함수의 코드 블록만을 지역스크프로 인정한다.따라서 함수 외부에서 var키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.
  - var키워드로 선언한 전역 변수의 생명주기는 전역 객체의 생명주기와 일치하다.
  
- 변수 호이스팅에 의해 초기 undefined값이 할당된다.

- ```javascript
  function checkVar() {
    // 실제 초기화전 undefined이 할당된다.
    // -> undefined
    console.log(i);
    var i = 't';
    // -> t
    console.log(i);
    for (var i = 0; i < 2; i++) {
      // 1,2
      console.log(i);
    }
    
    // 현재 함수코드 블록에서 전체에서 공유되어 사용된다.
    console.log(`for문 바깥스코프의 i ${i}`);
  
    var i = '이상해';
    console.log(`var는 재선언 재할당도 가능하다. ${i}`);
    {
      var t = 't';
    }
    // 하위 스코프에 선언된 변수도 사용가능하다....
    // -> t
    console.log(t);
  }
  // !!error -> 오로지 함수의 코드 블록만을 지역스크프로 인정한다
  console.log(t);
  
  ```

- let 버전

- ```javascript
  // 함수 블록내 i변수와 전역스코프에 선언된 i변수는 다른변수이다.
  let i="globalT"
  function checkLet() {
    // !!error
    // Cannot access 'i' before initialization
    // console.log(i);
    let i = 't';
    // -> t
    console.log(i);
    // for문의 블록 레벨 스코프
    for (let i = 0; i < 2; i++) {
      // 1,2
      console.log(i);
    }
    // -> t
    console.log(`for문 바깥스코프의 i ${i}`);
  
    {
      let t = 't';
    }
    // !!error
    // t is not defined
    // 현재 렉시컬환경에 t라는 변수는 존재하지 않는다.
    console.log(t);
  }
  ```

  

#### let과 const

- 모든 코드블록을 지역스코프로 인정한다(일반적인 프로그래밍의 코드블록).

- 선언 단계와 초기화 단계가 분리되어 진행된다.

  - 런타임 이전에 자바스크립트 엔젠에 의해 암묵적으로 선언단계가 먼저 실행되고, 초기화 단계는 변수 선언문에 도달했을때 실행된다.

  - 호이스팅이 일어나지 않는거 같지만 실제로는 일어나며 선언단계 <-> 초기화 단계 사이 일시적 `사각지대영역`이 있다.

  - ```javascript
    function checkLetHoisting() {
      let isHoisting = '?';
    
      function check() {
        // Cannot access 'isHoisting' before initialization
        // 이는 함수 스코프내에서 호이스팅이 일어나 렉시컬체인 상위의 let으로 선언된 isHoisting 변수를 참조하지 않는다.
        console.log(isHoisting);
        const isHoisting = true;
      }
      check();
    }
    ```

  - 키워드로 선언한 변수는 전역객체(브라우저 에서는 window)의 프로퍼티가 아닌다.

  - ```javascript
    var tt = 'tttttt';
    let cc = 'cccccc';
    // -> tttttt
    console.log(window.tt);
    // -> undefined
    console.log(window.cc);
    ```

  - let은 재선언이 불가하면 재할당은 가능하다.

  - const은 재선언 재할당 둘다 불가능하다.

    - const는 선언과 함깨 값을 할당해주어야 한다.
    - 상수처럼 사용가능하다.
      - 원시값을 할당할 경우 -> 원시 값은 변경 불가능한 값이므로
    - 객체를 할당할 경우 값을 변경 할 수 있다.
      - 실제 참조주소는 변경되지 않지만, 참조된 객체의 값은 변경가능하다.

+++

### 7.프로토타입(prototype)

자바스크립트의 모든 객체는 객체간 상속을 위해 object라는 내부의 prototype 가지고 있다.

- 자바스크립트의 내장된 기본 상태 및 함수이다.

자바스크립트에서 객체간 상속의 연결고리는 프로토타입 체인으로 연결되어 있다

- 배열 -> array -> object

오브젝트의 각각의 프토퍼티는 프로퍼티 디스크립터라고 하는 객체로 저장되어 있다.

자바스크립트 객체의 속성은 변경가능하다.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties

- value: 객체속성의 값
- writable: 값을 변경할수 있을지의 유무
- enumerable: 속성을 열거가능한지
- configurable: 속성이 삭제될수 있는지유무

```javascript
const obj1 = {
  name: 'kwon',
  age: 31,
  desc() {
    return `age:${this.age},name:${this.name}`;
  },
};
// 객체의 권한을 수정해서 객체를 관리 할 수 있다.
Object.defineProperties(obj1, {
  name: {
    writable: false,
  },
  age: {
    value: 29,
    enumerable: false,
  },    
}); 
/**
{
  name: {
    value: 'kwon',
    writable: false,
    enumerable: true,
    configurable: true
  },
  age: { value: 29, writable: true, enumerable: false, configurable: true },
  desc: {
    value: [Function: desc],
    writable: true,
    enumerable: true,
    configurable: true
  }
*/
console.log(Object.getOwnPropertyDescriptors(obj1));


```



