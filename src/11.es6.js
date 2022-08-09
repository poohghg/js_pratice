function basic() {
  const obj = {
    name: 'kown',
    // 상위 스코프의 this를 참조 this는 undefined
    // print: () => {
    //   console.log(`Hi ${this.name}`);
    //   console.log(`this:${this}`);
    // },
    print() {
      console.log(`Hi ${this.name}`);
      console.log(`this:${this}`);
    },
  };
  console.log(obj);
}
basic();
