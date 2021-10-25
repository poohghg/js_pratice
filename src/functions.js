//map

/**
 * map 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는
 * 규칙에 따라 변환한 후 그 결과로 새로운 배열을 생성한다.
 *
 */

testMap();

function testMap() {
  const nums = [1, 2, 3, 4, 5];
  const calNums = nums.map((num) => num * num);
  console.log(calNums);
}
