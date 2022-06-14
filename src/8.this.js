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
  wk;
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
      // 화살표 함수 냄부의 this는 상위 스코프의 this를 가르킨다.
      setTimeout(
        function () {
          console.log(this.v);
        }.bind(this),
        10,
      );
    },
  };
  obj2.print();
}
bindThis();
