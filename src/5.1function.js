function basicFunction() {
  // 함수 선언문
  function isHosting() {
    return console.log('isHosting');
  }
  // 함수 표현식
  const add = function adds(x, y) {
    return console.log(x, y);
  };
}

function outerFuncion(arr) {
  function multiply(a) {
    return a * 2;
  }
  return arr.map((v) => multiply(v));
}
// console.log(outerFuncion([1, 2, 3, 4, 5]));

function firstClassObject() {
  // 변수에 할당가능하다.
  const increase = function (num) {
    return num * 2;
  };
  const obj = {
    age: 31,
  };
  // 객체의 속성이 될 수 있다.
  obj.increase = increase;
  console.log(obj);
  // 함수는 인자값이 될수도 있다.
  function test(action) {
    const dArray = [1, 2, 3, 4, 5].map((v) => action(v));
    console.log(dArray);
  }
  console.log(test);
}
// console.log(Object.getOwnPropertyDescriptors(firstClassObject));
// console.log(Object.getOwnPropertyDescriptor(firstClassObject, '__proto__'));
// firstClassObject();

function confirmFuncionProto(a) {
  // 함수 호출시 전달된 인수이다.
  // 매개변수와 일치하지 않는다.
  console.log([...arguments]);
  // 만약 초과된 인수는 undefined으로 초기화된다.
}

console.log(confirmFuncionProto(5, 3, 3, 4, 5));

const confirmF = confirmFuncionProto;
const nameF = () => {};
console.log(confirmF.name);
console.log(nameF.name);
