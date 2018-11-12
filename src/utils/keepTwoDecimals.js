/**
 * 保留两位小数
 * @param { number } num: 数字
 */
function keepTwoDecimals(num: number): string{
  const numStr: string = num.toFixed(2);

  if(/\.0{2}$/.test(numStr)){
    return numStr.replace(/\.0{2}$/, '');
  }else{
    return numStr;
  }
}

export default keepTwoDecimals;