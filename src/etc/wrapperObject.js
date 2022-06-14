var foo = 'foo';
function basicWraper(params) {
  const str = 'string?';
  // console.log(str.length);
  // console.log(str.toUpperCase());
  // 해당 코드가 실행되면 암뭄적전역으로 전역객체의 프로퍼티가 된다.
  y = 10;
}
basicWraper();
// 브라우저에서는 window.foo가 출력됨.
console.log(global.foo);
// 암뭄적 전역
console.log(global.y);
