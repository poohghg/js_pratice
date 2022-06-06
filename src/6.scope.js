// 'use strict';

// 기본스코프
function basisScope() {
  const outer = 'test';
  {
    const inner = 'inner';
    console.log(outer);
  }
  console.log(outer);
  // 앱 크러쉬
  // console.log(inner);
}
// basisScope();
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
// checkScope();

//
function gc() {
  // 글로벌 변수는 앱이 종료될때 까지 메모리에 유지된다.
  const global = 1;
  function test(params) {
    if (true) {
      // 함수 내부 블럭안에서 필요한 경우에는
      // 필요한 곳에서 블럭 안에서 변수를 선언하고, 사용
      const innerVar = 'if';
    }
  }
}
// 호이스팅: 인터프린트 언어인 자바스크립트엔진은 한줄한줄 코드를 만날때 마다 실행되지만,
// 실행컨태스트안에 있는코드를 실행전 선언된 변수,함수,클래스의 선언은 코드의 최상위에서 끌얼올려줘 실행된다.

function checkHoisting(params) {
  hoisting();
  // ReferenceError: Cannot access 'checkVar' before initialization
  // console.log(checkVar);
  // hoistingFunction();

  // let,const,클래스
  // 선언만 호이스팅이되고, 초기화는 되지 않는다.
  // 초기화전 변수에 접근하면 컴파일 에러가 발생한다.

  // 만약 var를 사용했다면 undefined이 찍힌다.
  function hoisting() {
    const test = 'test';
  }

  const checkVar = 'checkVar';
  const hoistingFunction = hoisting;
}
// checkHoisting();

function checkScopeHoisting() {
  let x = 1;
  {
    // 현재 스코프에서 x변수는 스코프 내에서 호이스팅되어 있다.
    // 아직 초기화되지 않았기에 초기화관련 에러가 발생한다.
    console.log(x);
    let x = 2;
  }
}

// var의 문제점

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
//checkVar();
function checkLet() {
  // !!error
  // Cannot access 'i' before initialization
  // console.log(i);
  let i = 't';
  // -> t
  console.log(i);
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
// checkLet();
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

// checkLetHoisting();
