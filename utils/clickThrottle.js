/* 防止重复点击 */
let clickTimer = 0;

function clickThrottle(interval = 3000) {
  let now = +new Date();
  let timer = clickTimer;

  if (now - timer < interval) {
    return false;
  } else {
    clickTimer = now;
    return true;
  }
}

export default clickThrottle;
