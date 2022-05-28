// 단축평가를 사용한 기본값 설정
function shortEvaluation(v) {
  // falsey 한값일 경우 기본값으로 취환된다.
  v = v || "notValue"
  console.log(v);
  return v
}

// 매개변수의 기본값 설정시
// 인자값이 null or undefined 인경우만 동작한다.
function isDefaultParams(v = "notValue") {
  console.log(v);
  return v
}

function checkFunction(obj) {
  console.log("user:",obj?.user); 
  console.log(obj?.printUser?.());
}

const info1 = {
  user:"kwon",
  printUser(){return this.user}
}
const info2 = {}
// checkFunction(info1)
// checkFunction(info2)

// kwon
console.log(info1.user);
console.log(info1["user"]);
// error -> user is not defined
// console.log(info1[user]);
const key1 = "user"
console.log(info1[key1]);

// -> notValue
// shortEvaluation(NaN)
// => undefined (기본값으로 취환되지 않음.)
// isDefaultParams(NaN)
// arguments는 null은 test로 취환 -> notValue
// isDefaultParams()


function solution_15_my(_str) {
  const str = _str;
  const overlapArray = [];

  for (let index = 0; index < str.length; index++) {
    const v = str[index];
    console.log("tt", overlapArray);
    console.log( v in overlapArray);
    if (String(v) in overlapArray) {
      String(str).replace(v, "");
    } else {
      console.log(v);
      overlapArray.push(v);
    }
  }
  return str;
}

solution_15_my("ksekksetss")