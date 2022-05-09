function unaryFuncionts() {
  let x = 5,
    xx = 5,
    result;
  // 선할당 후 증가
  result = x++;
  console.log(result, x);

  result = null;
  // 선증가 후 할당
  result = ++xx;
  console.log(result, xx);
}

unaryFuncionts();
