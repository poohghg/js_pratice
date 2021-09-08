import "./styles.css";
// max
function max(...rest) {
  console.log(rest);
  const result = rest.reduce((prev, curr) => (curr > prev ? curr : prev));
  return result;
}

const result = max(1, 2, 3, 4, 10, 5, 6, 7);
console.log(result);

// 테스트 코드에서 불러오기 위하여 사용하는 코드
export default max;
