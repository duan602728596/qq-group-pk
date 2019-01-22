/* 求和函数 */
function sum(...argu: Array<number>): number{
  let all: number = 0;

  for(let i: number = 0, j: number = argu.length; i < j; i++){
    all += Number(argu[i]);
  }

  return all;
}

export default sum;