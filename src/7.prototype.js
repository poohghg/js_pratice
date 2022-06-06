// 프로터 타입 기본
function checkProto() {
  const obj1 = {
    name: 'kwon',
    age: 31,
    desc() {
      return `age:${this.age},name:${this.name}`;
    },
  };
  const obj2 = {};
  // 자바스크립트 객체는 object라는 내부의 프로퍼타입을 상속받는다.
  console.log(obj1.__proto__ === obj2.__proto__);

  // 상태값,값의 수정권한,열거권한,키의 수정권한
  // { value: 'kwon', writable: true, enumerable: true, configurable: true }
  const objDesc = Object.getOwnPropertyDescriptors(obj1);
  console.log(objDesc);
  console.log('__________________________________________________\n');
  const objNameDesc = Object.getOwnPropertyDescriptor(obj1, 'name');
  console.log(objNameDesc);

  // 객체의 특정 키의 값과 권한을 수정할 수 있다.
  Object.defineProperties(obj1, {
    name: {
      writable: false,
    },
    age: {
      value: 29,
      enumerable: false,
    },
  });
  console.log('__________________________________________________\n');
  console.log(Object.getOwnPropertyDescriptors(obj1));
}

checkProto();
