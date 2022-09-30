function outerFunc() {
  const outerVars = '안녕하세요 아웃터환경의 변수에요!!';
  function innerFunc() {
    return outerVars;
  }
  return innerFunc;
}

const test = outerFunc();
// 안녕하세요 아웃터환경의 변수에요!!
console.log(test());

function multiples(x) {
  return (y) => {
    if (isNaN(y)) return;
    return x * y;
  };
}
const multiple3Fn = multiples(3);
const multiple5Fn = multiples(5);
// 50
console.log(multiple5Fn(10));
// 15
console.log(multiple3Fn(5));
