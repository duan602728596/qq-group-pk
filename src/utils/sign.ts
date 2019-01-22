import * as MD5 from 'md5.js';

/**
 * 摩点加密计算
 * @param { string } queryStr: 查询的字符串
 */
function sign(queryStr: string): string{
  const signStr: string = new MD5()
    .update(queryStr + '&p=das41aq6')
    .digest('hex');

  const sign: string = signStr.substr(5, 16);

  return `${ queryStr }&sign=${ sign }`;
}

export default sign;