function checkTypeOf() {
  console.log("null ", typeof null);
  console.log("isFunction ? ", typeof unaryFuncionts);
  // null은 object로 반환한다. js의 버그이다.
  // type of 는  원시타입5개 + object + function 총 7개 형태로 반환한다.
  // null 타입은 반환하지 않는다.

  const temp = null;
  // temp 는 object다 ㅡㅡ
  console.log("temp의 타입은 ? ", typeof temp);
  // object
  console.log(typeof temp === null);
  // false
  console.log(temp === null);
}
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
function implicitCast(params) {
  
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
  console.log(typeof(string_1 + true)); 
  // -> 2 true는 number 1로 변환
  console.log(number_1 + true);
  // -> 1 fals는 number 0으로 변환
  console.log(number_1 + false);
  // -> 1 null은 number 0으로 변환
  console.log(number_1 + null);
  // NaN undefined은 숫자로 타입 변환되지 않는다.
  console.log(number_1 + undefined);

  // true
  console.log(string_1 == number_1);
  // false
  console.log(string_1 === number_1);
}
function copyValue() {
  
  let score = 80;
  // score의값 80이 할당
  let copy = score
  // -> true
  console.log(score === copy);
  score = 100;
  // -> false
  console.log(score === copy);
}





// unaryFuncionts();
// checkTypeOf();
// implicitCast();
copyValue();
