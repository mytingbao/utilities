// 防止重复提交

function preventResubmit(promiseFunction) {
  let p = null;
  return function (...args) {
    return p
      ? p
      : (p = promiseFunction.apply(this, args).finally(() => (p = null)));
  };
}
/*
let count = 1;
let promiseFunction = () =>
  new Promise((rs) =>
    setTimeout(() => {
      rs(count++);
    }, 1000)
  );

let firstFn = preventResubmit(promiseFunction);

firstFn().then(console.log); // 1
firstFn().then(console.log); // 1
firstFn().then(console.log); // 1

*/

// 示例 1： 输入：nums = [2,7,11,15], target = 9 输出：[0,1] 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
// 示例 2： 输入：nums = [3,2,4], target = 6 输出：[1,2]
// 示例 3： 输入：nums = [3,3], target = 6 输出：[0,1]

function filterIndexFromList(list = [], target) {
  if (Array.isArray(list)) {
    for (const firstIndex in list) {
      const first = list[firstIndex];
      const secondIndex = list.findIndex((v) => target - first === v);
      if (secondIndex > -1) {
        return [Number(firstIndex), secondIndex];
      }
    }
  }
}

const indexList = filterIndexFromList([2, 3, 4, 5, 6, 7, 5], 9);
console.log(indexList);
