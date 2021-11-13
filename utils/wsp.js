/**
 * 对接硬件webscoket的方法
 *
 * @date     2021-11-13
 * @author   Winston<153515782@qq.com>
 */

/**
 * 解释错误码
 *
 * @param code
 * @returns {string}
 */
function explainError(code) {
  if (code === 0) {
    return "成功";
  }
  if (code === -1) {
    return "参数错误";
  }
  if (code === -2) {
    return "超时";
  }
  if (code === -3) {
    return "设备连接错误";
  }
  if (code === -4) {
    return "发送数据失败";
  }
  if (code === -5) {
    return "读取数据失败";
  }
  if (code === -6) {
    return "文件操作失败";
  }
  if (code === -7) {
    return "设备返回错误信息";
  }
  if (code === -9) {
    return "取消";
  }
  return `操作失败，返回错误码为${code}`;
}

/**
 * 每种类型的消息同时只能一次
 */
class WebSocketAsPromised {
  constructor(url) {
    this.url = url;
    this.ws = undefined;
    this.pool = {};
  }

  open() {
    return new Promise((resolve, reject) => {
      if (this.ws === undefined) {
        this.ws = new WebSocket(this.url);
        this.ws.onopen = () => {
          resolve(this);
        };
        this.ws.onerror = (e) => {
          reject(e);
        };
      }
      this.ws.onmessage = (e) => {
        let { data } = e;
        data = JSON.parse(data);
        const { type } = data;
        const request = this.pool[type];
        if (data.ret === 0) {
          request.resolve(data);
        } else {
          request.reject(explainError(data.ret));
        }
        delete this.pool[type];
      };
    });
  }

  close() {
    this.ws.close();
  }

  send(type, data) {
    return new Promise((resolve, reject) => {
      this.pool[type] = { resolve, reject };
      this.ws.send(JSON.stringify({ type, ...data }));
    });
  }
}

/**
 * 采集指纹
 * 先不传文件名
 */
export async function collectFinger(
  TimeOut = 60,
  FileFullName = "D:\\test.png"
) {
  const wsp = new WebSocketAsPromised(fingerUrl);
  try {
    await wsp.open();
    const data = await wsp.send(12, { TimeOut, FileFullName });
    return base64ToFile(data.base64);
  } catch (e) {
    let error;
    if (typeof e === "string") {
      error = new Error(e);
    } else {
      error = e;
    }
    throw error;
  }
}
