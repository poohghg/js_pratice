// console.log(add(1,2));
// console.log(isHosting());

// 함수 선언문
function isHosting() {
  return console.log('isHosting');
}
// 함수 표현식
const add = function adds(x, y) {
  return console.log(x, y);
};

// console.log(add(1,2));
// 함수이름은 함수 몸체에서면 유효한 식별자이다.
// console.log(adds(1,2));

function outerFuncion(arr) {
  function multiply(a) {
    return a * 2;
  }
  return arr.map((v) => multiply(v));
}
console.log(outerFuncion([1, 2, 3, 4, 5]));
