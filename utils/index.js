/**
 * 个人常用的方法
 *
 * @date     2021-11-09
 * @author   Winston<153515782@qq.com>
 */

/**
 * 获取数据的类型
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
