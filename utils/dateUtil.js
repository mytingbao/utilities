/**
 * 关于时间处理的方法
 *
 * @date     2021-11-09
 * @author   Winston<153515782@qq.com>
 */

/**
 * 获取当前后某段时间的年月日时分秒字符串
 *
 * @param    {Date}  Date  任意值
 * @returns  String
 *
 * */

function getDateTimeNowString() {
  const date = new Date();
  const today = date.toISOString().slice(0, 10);
  const now = date.toTimeString().slice(0, 8);
  return today + " " + now;
}
