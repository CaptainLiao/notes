const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';

// 返回随机字符串，前缀"H5"，长度24
function randomId() {
  const prefix = 'H5';
  let rnds = new Array(22);
  let r, i;

  for (i = 0; i < 22; i++) {
    if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
    rnds[i] = r >>> ((i & 0x03) << 3) & 0x3f;
  }

  rnds[21] %= (0x3f - 2);

  return prefix + rnds.map(x => charset[x]).join('');
}

export default randomId;
