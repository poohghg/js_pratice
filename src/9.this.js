var v = 100;
function basicThis() {
  const obj = {
    v: 10,
    t: 15,
    printV: function () {
      function innerF() {
        // console.log(`v는 ${v}`);
        console.log(`중첨함수 에서 this는? ${this.v}`);
      }
      innerF();
      console.log(`내부에서 this는? ${this.v}`);
    },
  };
  obj.printV();
}
// basicThis();
function bindThis() {
  const obj = {
    v: 10,
    t: 15,
    printV: function () {
      const that = this;
      function innerF() {
        console.log(`t는 ${that.t}`);
        console.log(`중첨함수 에서 this는? ${that.v}`);
      }
      innerF();
      console.log(`내부에서 this는? ${this.v}`);
    },
  };
  // obj.printV();

  const obj1 = {
    v: 1,
    print() {
      // 화살표 함수 냄부의 this는 상위 스코프의 this를 가르킨다.
      setTimeout(() => console.log(this.v), 10);
    },
  };
  // obj1.print();

  const obj2 = {
    v: 1,
    print() {
      // 바인드를 통해 this를 연결한다.
      setTimeout(
        function () {
          console.log(this.v);
        }.bind(this),
        10,
      );
    },
  };
  // obj2.print();

  function Info(name) {
    this.name = name;
    this.printName = function () {
      console.log(`name:${this.name}`);
    }.bind(this);
  }
  const kwon = new Info('kwon');
  function printCallBack(callBack) {
    callBack();
  }
  printCallBack(kwon.printName);
}
bindThis();

function constructorFunction() {
  function Info(name) {
    this.name = name;
    this.printName = function () {
      console.log(`name:${name}`);
    };
  }
  const kwon = new Info('kwon');
  kwon.printName();
}
// constructorFunction();
function dynamicBinding() {
  function Info(name) {
    this.name = name;
    this.printName = function () {
      console.log(`name:${this.name}`);
    };
  }
  const kwon = new Info('kwon');
  function printCallBack(callBack) {
    callBack();
    // console.log('printCallBack:');
  }
  printCallBack(kwon.printName);
}
// dynamicBinding();
function objectMethod() {
  function obj() {
    const name = 'kwon';
    // print() {
    //   console.log(`this : ${this.name}`);
    // }
    print1 = function () {
      console.log(`this : ${this.name}`);
    };
  }
  console.dir(obj);
  // obj.print();
}

objectMethod();
