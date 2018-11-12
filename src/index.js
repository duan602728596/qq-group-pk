import axios from 'axios';
import WebSocket from 'ws';
import sign from './utils/sign';
import sum from './utils/sum';
import keepTwoDecimals from './utils/keepTwoDecimals';

/* 信息配置 */
// 群号
const groupNumber: number = 513416626;
// QQ号
const selfId: number = 3125698156;
// 端口
const port: number = 7200;
// 摩点id
const id: Array<string> = ['38366', '38327', '38342', '38344', '38345', '38346', '38359', '38340'];

const eventIo: WebSocket = new WebSocket(`ws://127.0.0.1:${ port }/event`);
const apiIo: WebSocket = new WebSocket(`ws://127.0.0.1:${ port }/api`);

eventIo.on('message', handleWsOnMessage);

async function handleWsOnMessage(data: ?string): Promise<void>{
  if(!data) return void 0;

  const dataJson: Object = JSON.parse(data);

  if(
    'group_id' in dataJson
    && dataJson.group_id === groupNumber
    && dataJson.self_id === selfId
    && dataJson.message_type === 'group'
  ){
    // 群聊天
    const content: string = dataJson.raw_message ? dataJson.raw_message : dataJson.message;

    // 判断命令是否为pk
    if(!/^pk$/i.test(content)) return void 0;

    // 发送摩点的请求数据
    const res: Object = await axios({
      method: 'POST',
      url: 'https://wds.modian.com/api/project/detail',
      data: sign(`pro_id=${ id.join('%2C') }`),
      responseType: 'text'
    });

    const resData: Object = res.data.data;

    // 发送信息的模板
    const sum0: string = sum(resData[0].already_raised, resData[1].already_raised, resData[2].already_raised, resData[3].already_raised);
    const sum1: string = sum(resData[4].already_raised, resData[5].already_raised, resData[6].already_raised, resData[7].already_raised);

    const text: string = `【50小时限时·加油PK】
黑天鹅车队：${ keepTwoDecimals(sum0) }
 * 顼凘炀：${ keepTwoDecimals(resData[0].already_raised) }
 * 朱怡欣：${ keepTwoDecimals(resData[1].already_raised) }
 * 李珊珊：${ keepTwoDecimals(resData[2].already_raised) }
 * 吴羽霏：${ keepTwoDecimals(resData[3].already_raised) }
不秀钢车队：${ keepTwoDecimals(sum1) }
 * 孙歆文：${ keepTwoDecimals(resData[4].already_raised) }
 * 陈韫凌：${ keepTwoDecimals(resData[5].already_raised) }
 * 张羽涵：${ keepTwoDecimals(resData[6].already_raised) }
 * 臧  聪：${ keepTwoDecimals(resData[7].already_raised) }`;

    // 发送消息
    apiIo.send(JSON.stringify({
      action: 'send_group_msg',
      params: {
        group_id: groupNumber,
        message: text
      }
    }));
  }
}