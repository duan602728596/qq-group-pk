/* 求和函数 */
function sum(): number{
  let all: number = 0;

  for(let i: number = 0, j: number = arguments.length; i < j; i++){
    all += Number(arguments[i]);
  }

  return all;
}

export default sum;