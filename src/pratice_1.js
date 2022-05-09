function unaryFuncionts() {
  let x = 5,
    xx = 5,
    result;
  // 선할당 후 증가
  result = x++;
  console.log(result, x);

  result = null;
  // 선증가 후 할당
  result = ++xx;
  console.log(result, xx);
}

function checkTypeOf() {
  console.log("null ", typeof null);
  console.log("isFunction ? ", typeof unaryFuncionts);
  // null은 object로 반환한다. js의 버그이다.
  // type of 는  원시타입5개 + object + function 총 7개 형태로 반환한다.
  // null 타입은 반환하지 않는다.

  const temp = null;
  // temp 는 object다 ㅡㅡ
  console.log("temp의 타입은 ? ", typeof temp);
  console.log(typeof temp === null);
  console.log(temp === null);
}

unaryFuncionts();
checkTypeOf();
