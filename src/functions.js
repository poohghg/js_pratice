// max
console.log("????????")
const array1 = [1, 2, 3, 4, 5, 6];
const array2 = [1, 2, 3, 4, 5];

// restToArray(1, 2, 3, 4, 10, 5, 6, 7);
// max(1, 2, 3, 4, 10, 5, 6, 7);
// arrayToString(["a", "b", "c"]);
// arraySplice(array1);
// arraySlice(array2);
// testFunc(array1);

// 배열로 파라메터를 받아옴
function restToArray(...rest) {
  console.log("restToArray", rest);
}

function max(...rest) {
  const result = rest.reduce((prev, curr) => (curr > prev ? curr : prev));
  console.log("max-result : ", result);
  return result;
}

function arrayToString(rest) {
  console.log("arrayToString", rest.join());
  return rest.join();
}

function arraySplice(array1) {
  const array = array1;
  // splice는 원본 배열을 변경하여 리턴
  console.log("array : ", array);
  console.log("splice : ", array.splice(3));
  console.log("arraySplice : ", array);
}

function arraySlice(array1) {
  const array = array1;
  console.log("array : ", array);
  console.log("slice : ", array.slice(3));
  console.log("arraySlice : ", array);
}

function testFunc(array) {
  const result = array.reduce((prev, curn) => {
    // prev + curn;
    console.log("prev", prev);
    return prev + curn;
  });
  console.log("testFunc : " + result);
}

function functions() {
  console.log("????????")
  const array1 = [1, 2, 3, 4, 5, 6];
  const array2 = [1, 2, 3, 4, 5];
  // restToArray(1, 2, 3, 4, 10, 5, 6, 7);
  // max(1, 2, 3, 4, 10, 5, 6, 7);
  // arrayToString(["a", "b", "c"]);
  // arraySplice(array1);
  // arraySlice(array2);
  testFunc(array1);
}
export default functions;
