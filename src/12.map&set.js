function basicMap() {
  const lee = { name: 'lee' };
  const kwon = { name: 'kwon' };

  // map에서 키는 제약이 없다.
  const map = new Map([
    [lee, 'developer'],
    [kwon, 'designer'],
  ]);
  console.log(map);
  console.log(map.get(lee));
  // map은 순회가 가능한 이터러블 객체이다.
  map.forEach((v, k, map) => {
    console.log('v', v);
    console.log('k', k);
    // console.log('map', map);
  });
  console.log(map.keys());
  // map ㄱ
}

basicMap();
