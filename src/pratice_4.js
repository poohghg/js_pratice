// const lodash = require("lodash");

function checkObj() {
 const a = {
   name:"kown"
 }
 const b = a
 console.log(a===b);
 b.update = true
 // b의값이 변하면 a의값도 변한다.
 console.log(a);
 console.log(b);
  // a객체와 b객체는 같은 메모리 주소를 참고한다.
  // a -> { name: 'kown', update: true }
  // b -> { name: 'kown', update: true }
 console.log(a===b);

}

function deepCopy() {
  const obj1 = {name:"kwon",keyList:["kwon",false,5],add(a,b){return a+b}}

  // // 얕은복사 둘의 결과는 같다.
  // const obj2 = Object.assign({},obj1)
  // // const obj2 = {...obj1}
  // console.log("-----------");
  // // -> false 
  // console.log(obj1 === obj2);
  // console.log("-----------");
  // // -> true 실제 중첩되어 있는 객체의경우에도 같은 참조값을 봐라본다.
  // console.log("obj1 : " ,obj1);
  // console.log("obj2 : " ,obj2);
  // console.log(obj1.keyList === obj2.keyList);

  // deepCopy
  //1) 재귀를 통한 copy obj타입의경우 새로운 객체를 반환해준다.
  console.log(obj1);
  function copy (_obj){
    const result = Array.isArray(_obj) ? [] : {}
    for (const key in _obj) {
      console.log(typeof _obj[key],key);
      if(typeof _obj[key] === "object"){
        result[key] = copy(_obj[key])
      }else{
        result[key] = _obj[key];
      }
    }
    return result;
  }

  const obj2 = copy(obj1)

  
  // const lodash = require("lodash");
  // const obj2 = lodash.cloneDeep(obj1);
  console.log(obj1.add === obj2.add);
  console.log(obj2.add(1,3));
}
// checkObj()
deepCopy()