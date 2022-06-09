const { get } = require('lodash');

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
// checkProto();
// 접근자 프로퍼티
function accesoorProtp() {
  const user = {
    name: 'kwon',
    age: 31,
    get ageInfo() {
      return `${this.age}`;
    },
    set ageInfo(age) {
      this.age = age;
    },
  };

  // setter 호출
  user.ageInfo = 33;
  // getter 호출
  console.log(user.ageInfo);
}
// accesoorProtp();

// 오브제트 프리징
function immutabilityObj() {
  // 오브젝트 동결시키기
  const obj = {
    name: 'kwon',
    age: 31,
    inner: {
      a: 'a',
      b: 'b',
    },
  };
  // Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
  // 기존 프로퍼티의 속성(키)과 값을 수정(삭제,쓰기,재정의)을 방지하고, 새로운 속성을 추가하는것을 방지한다.

  Object.freeze(obj);
  // age: { value: 31, writable: false, enumerable: true, configurable: false }
  // console.log(Object.getOwnPropertyDescriptors(obj));
  // 무시!!!!
  delete obj.name;
  obj.name = 'hi!';
  obj.plus = '+';
  // freeze도 얕은복사이다. 내부객체는 변경가능하다.
  // freeze시 내부 객체의 경우 같은 참조값을 보고있다. 참조 객체의 값을 수정하면 같이 변경된다.
  obj.inner.a = 'AA';
  // 값의 수정불가.
  // -> { name: 'kwon', age: 31, inner: { a: 'AA', b: 'b' } }
  console.log(obj);
}
// immutabilityObj();

// 오브제트 seal -> 기본 오브젝트의 형태를 유지하지만, 값의 수정은 가능하다.
function sealObj() {
  const obj = {
    name: 'kwon',
    age: 31,
    inner: {
      a: 'a',
      b: 'b',
    },
  };
  //Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
  // 속성은 변경불가 !! 값의 수정은 가능하다.
  Object.seal(obj);
  obj.name = 'HI!';
  delete obj.name;
  console.log(obj);
  // seal되었는지 확인하다.
}
// sealObj();/

// 기본 생성자 함수.
function constructorFunction() {
  function Info(name, age) {
    const constant = 'constant';
    this.name = name;
    this.age = age;
    this.greeting = '안녕하세요';
    this.printInfo = function () {
      return `${greeting} \n 이름은:${this.name}이고, 나이는:${this.age}입니다.`;
    };
    // return 값을 명시하면 명시된 값이 출력된다.
    // ->{ name: 'kwon', age: 31 }
    // return { name, age };
  }

  // this에 바인딩한 값들이 출력된다.
  //   Info {
  //   name: 'kwon',
  //   age: 31,
  //   greeting: '안녕하세요',
  //   printinfo: [Function (anonymous)]
  // }
  const myInfo = new Info('kwon', 31);
  console.log(myInfo);
}
// constructorFunction();
function isConstructorFunction() {
  //  위 세가지 표현식만이 생성자 함수이다.
  function foo() {}
  const constFoo = function () {};
  // 프로퍼티의 값으로 할당된 함수는, 메서드가 아니다. 일반함수로 정의된 것이다.
  const obj = {
    x: function () {},
  };
  const newObj = new obj.x();

  // 생성자 함수가 아닌 예시 x
  // 생성자 함수가 아닌 함수를 new 연산자와 함께 사용하면 에러가 발생한다.
  const obj1 = {
    // 메서드
    met() {},
  };
  const t = () => console.log('t');
}
// isConstructorFunction();

function newTarget() {
  function Info(name, age) {
    //  new 연산자없이 호출되었는지 확인하여 없이 호출하였다면, 재귀 호출한다.
    // if (!new.target) {
    //   return new Info(name, age);
    // }

    // 스코프 세이프 생성자 팬턴
    // new연산자와 함께 호출되면 this와 샘성자함수 객체는 프로토타입에 의해 연결된다.
    // 만약 일반함수처럼 호출된다면, this는 전역객체가 소유하고 있다.
    if (!(this instanceof Info)) {
      return new Info(name, age);
    }
    this.name = name;
    this.age = age;
    this.print = function () {
      return `이름은:${this.name}이고, 나이는:${this.age}입니다.`;
    };
  }
  const user1 = Info('kim', 31);
  console.log(user1);
}
newTarget();
function checkProtoLevel(params) {
  function Info(name, age) {
    this.name = name;
    this.age = age;
    // 인스턴스 레벨의 함수
    // 각각의 객체마다 함수를 생성해서 가지고 았다.
    // 메모리상 비효율적.
    // this.printinfo = function () {
    //   return `name:${this.name}/age:${this.age}`;
    // };
  }
  // 프로토타입의 함수를 생성하면, 프로타타입레벨의 함수를 가질수 있다.
  // 동일한 프로토타입을 상속받는다.
  Info.prototype.printUser = function () {
    return `name:${this.name}/age:${this.age}`;
  };
  const kwon = new Info('kwon', 31);
  const kim = new Info('kim', 27);
  console.log(kwon);
  console.log(kwon.printUser());

  // 오버라이딩또한 가능하다.
  kwon.printUser = function () {
    return `안녕하세요!! name:${this.name}/age:${this.age}`;
  };
  console.log(kwon.printUser());
}
// checkProtoLevel();
function inheritancePrototype() {
  function Info(name, age) {
    this.name = name;
    this.age = age;
  }
  // 프로토타입 레벨의 함수 정의가능
  Info.prototype.printUser = function () {
    return `name:${this.name} \nage:${this.age}`;
  };

  function IntroD(name, age, desc) {
    // 상위 프로토타입을 매핑
    Info.call(this, name, age);
    this.desc = desc;
  }
  // 특정 프로토타입으로 프로토타입을 생성할 수 있다.
  IntroD.prototype = Object.create(Info.prototype);
  IntroD.prototype.printDesc = function () {
    return `desc: ${this.desc}`;
  };

  // const kwonD = new IntroD('kwon', 31, 'developer');
  // console.log(kwonD);
  // console.log(kwonD.printUser());
  // console.log(kwonD.printDesc());

  // object 석기
  const defaultObj = {
    defaultDesc: 'Info',
    defalutPrint() {
      return `클래스는 내부적으로 프로토타입으로 만들어졌다!!`;
    },
  };

  Object.assign(IntroD.prototype, defaultObj);
  const test = new IntroD('kwon', 31, 'developer');
  console.log('test:', test);
  console.log(test.defaultDesc);
  console.log(test.defalutPrint());
}
// inheritancePrototype();
