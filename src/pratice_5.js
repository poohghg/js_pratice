
// 함수이름(매개변수,인자) -> parameter
function  callFunction(a,b) {
  console.log("callFunction");
  return a+b
}
// 인수(argument)
// callFunction(1,2)

 function fun_1(num) {
  return num; 
 }

 function test(){}

 function calArguments(){
  console.log(arguments);
  // false
  console.log(Array.isArray(arguments));
  // 객체
  console.log(...arguments);
 }

 // 함수는 참조타입으로 변수에 함수의 값(참조 주소)을 할당할 수 있다.
 // 실행값 x -> 단지 변수엫 함수의 값을 할당
 const getNum = fun_1;
//  -> true
console.log("함수 비교",getNum === fun_1);
// 함수는 기본적으로 undefined을 반환한다.
console.log("cal_Test",test());

calArguments("a","b","c")

// 함수의 선언문
// 함수의 표현식
// 화살표 함수


const doubble = (x) => x * 2

function regiCallback(v,action){
  return action(v)
}
 // 함수는 일급객체로 인수로 전달 가능
console.log("callBack",regiCallback(5,doubble));


function chageObjNum(obj) {
  return {...obj,num:2} 
}

// const obj1 ={name:"k",num:5};
// const obj2 = chageObjNum(obj1);
// console.log(obj1,obj2);
// console.log(obj1 === obj2);


const obj1 ={name:"k",num:5,list:[1,2,3]};
const obj2 = {...obj1,num:10,list:[...obj1.list,10,20]};

console.log(obj1,obj2);
console.log(obj1 === obj2);



















