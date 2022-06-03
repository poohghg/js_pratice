function basisScope() {
  const outer = 'test';
  {
    const inner = 'inner';
    console.log(outer);
  }
  console.log(outer);
  // console.log(inner);
}

function gc() {
  // 글로벌 변수는 앱이 종료될때 까지 메모리에 유지된다.
  const global = 1;

  function test(params) {
    if (true) {
      // 함수 내부에서도 블럭안에서 필요한 경우에는
      // 필요한 곳에서 블럭 안에서 변수를 선언하고, 사용
      const innerVar = 'if';
    }
  }
}

// basisScope();
