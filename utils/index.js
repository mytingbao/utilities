/**
 * 个人常用的方法
 *
 * @date     2021-11-09
 * @author   Winston<153515782@qq.com>
 */

/**
 * 获取数据任意的类型
 *
 * 涵盖所有数据类型
 *
 * @param    {Any}  input    任意值
 * @returns  String
 *
 * */

function getType(input) {
  return Object.prototype.toString.call(input).slice(8, -1);
}

/**
 * base64字符串转成File对象
 *
 * @param    {String}  str    base64字符串（不需要前缀data:image/jpeg;base64）
 * @param    {String}  name    转换后的文件名
 * @param    {String}  type    转换的MIME类型
 * @returns  File
 *
 * */

function base64ToFile(str, name = "finger.png", type = "image/png") {
  const char = atob(str);
  const array = new Array(char.length);
  for (let i = 0; i < array.length; i += 1) {
    array[i] = char.charCodeAt(i);
  }
  return new File([new Uint8Array(array)], name, { type });
}
