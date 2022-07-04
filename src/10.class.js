function basicCalss(params) {
  // 생성자 함수 new키워드로 호출할대 생성되는 함수\
  class Info {
    // 클레스 레벨의 변수를 선얼할대는 static을 사용
    // 정적 변수
    static DESC = 'This is Info Class';
    // 접근 제어자 - 캡슐화
    // private(#) , public(기본), protected
    // private는 클래스 내부에서 만 사용
    #name;
    #age;
    // 생성자
    // 인스턴스 생성 및 초기화
    // constructor 암뭉적으로 this를 반환한다.
    // return this
    constructor(name, age) {
      this.#name = name;
      this.#age = age;
    }

    // 클래스 필드정의
    // 클래스 필드에 함수를 정의 할경우 인스턴스 레벨의 메서드이다.
    print = () => console.log(`name:${this.name}age:${this.age}`);
    getName = function () {
      return this.name;
    };
    // 프로토타입 레벨의 메서드
    print() {
      console.log(`name:${this.name}age:${this.age}`);
    }
  }

  const o1 = new Info('kown', 31);
  // 클레스 레벨의 변수는 인스턴스에서 사용 불가.
  // -> undefined
  console.log(o1.DESC);
  // Info { print: [Function: print], getName: [Function: getName] }
  console.log(o1);
  // console.log(o1.print());
}
// basicCalss();
function getsetClass() {
  class Info {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    printInfo() {
      console.log(`name:${this.name}age:${this.age}`);
    }

    get ageInfo() {
      return this.name;
    }
    set ageInfo(age) {
      this.age = age;
    }
  }
  const kwon = new Info('kwon', 31);
  kwon.ageInfo = 25;
  console.log(kwon.ageInfo);
  console.log(Object.getOwnPropertyDescriptor(kwon));
}
// getsetClass();
function extendClass(params) {
  class Polygon {
    constructor(height, width, dimension) {
      this.name = 'Polygon';
      this.type = 'Figure';
      this.height = height;
      this.width = width;
      this.dimension = dimension;
      // this는 호출한 인스턴스가 가지고 있음.
      console.log(this);
    }
    calArea() {
      return this.height * this.width * this.dimension;
    }
    toString() {
      return this.name;
    }
  }

  class Square extends Polygon {
    static #D = 1;
    // new생성자 함께 클래스를 호출 할때 전달할 인수의 리스트.
    constructor(height, width) {
      // 수퍼클래스의 constructor를 호출하여 인스턴스를 생성
      // super를 참조하면 수퍼클래스의 메서드를 호출 할 수 있다.
      super(height, width, Square.#D);
      this.name = 'Square';
      console.log(this);
    }
    // 오버로딩
    toString() {
      // 서브 클래스 메서드에서만 슈퍼클래스의 메서드를 참조 할 수 있다.
      // [[HomeObject]]를 가지는 함수
      console.log(super.toString());
      return super.toString() + this.height;
    }
  }
  const s1 = new Square(15, 15);
  console.log(s1);
  console.log(s1.calArea());
  console.log(s1.toString());
}
extendClass();
