function basicCalss(params) {
  // 생성자 함수 new키워드로 호출할대 생성되는 함수\
  class Info {
    // 클레스 레벨의 변수를 선얼할대는 static을 사용
    static DESC = 'This is Info Class';
    // 접근 제어자 - 캡슐화
    // private(#) , public(기본), protected
    // private는 클래스 내부에서 만 사용
    #name;
    #age;
    constructor(name, age) {
      this.#name = name;
      this.#age = age;
    }

    // 클래스속성의 함수
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
  // ?????????
  o1.name = 'kim';
  console.log(o1.name);
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
    // 접근자 프로퍼티
    get ageInfo() {
      return this.name;
    }
    set ageInfo(age) {
      this.age = age;
    }
  }
  const kwon = new Info('kwon', 31);
  console.log((kwon.ageInfo = 25));
  console.log(kwon.ageInfo);
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
    }
    caArea = () => this.height * this.width * this.dimension;
  }
  class Square extends Polygon {
    static #D = 1;
    constructor(height, width) {
      super(height, width, Square.#D);
      this.name = 'Square';
    }
  }
  const s1 = new Square(15, 15);
  console.log(s1);
  console.log(s1.caArea());
}
extendClass();
