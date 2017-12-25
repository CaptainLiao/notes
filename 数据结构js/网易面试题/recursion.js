/* 
小易准备去魔法王国采购魔法神器,购买魔法神器需要使用魔法币,但是小易现在一枚魔法币都没有,但是小易有两台魔法机器可以通过投入x(x可以为0)个魔法币产生更多的魔法币。
魔法机器1:如果投入x个魔法币,魔法机器会将其变为2x+1个魔法币
魔法机器2:如果投入x个魔法币,魔法机器会将其变为2x+2个魔法币
小易采购魔法神器总共需要n个魔法币,所以小易只能通过两台魔法机器产生恰好n个魔法币,小易需要你帮他设计一个投入方案使他最后恰好拥有n个魔法币。 
输入描述:
输入包括一行,包括一个正整数n(1 ≤ n ≤ 10^9),表示小易需要的魔法币数量。

输出描述:
输出一个字符串,每个字符表示该次小易选取投入的魔法机器。其中只包含字符'1'和'2'。

输入例子1:
10

输出例子1:
12

*/
function createMagic(n) {
  let arr = [];

  function magicCoin(n) {

    if (n === 1) return arr.push(1);
    if (n === 2) return arr.push(2);

    if (n % 2 === 0) {
      magicCoin((n - 2) / 2);
      arr.push(2);
    } else {
      magicCoin((n - 1) / 2);
      arr.push(1);
    }
  }
  magicCoin(n);

  return arr.join('')
}

function magicCoin(n) {

  if (n < 1) return;
  if (n % 2 === 0) {
    return magicCoin((n - 2) / 2) + '2';
  } else {
    return magicCoin((n - 1) / 2) + '1';
  }
}

for (var i = 1; i < 20; i++) {
  console.log(i + ': ' + createMagic(i));
}


function hannuo(n, a, b, c) {
  if (n === 1) {
    console.log(`${a} ---> ${c}`)
    return
  }
  hannuo(n - 1, a, c, b);
  hannuo(1, a, b, c);
  hannuo(n - 1, b, a, c);
}

//hannuo(3, 'A', 'B', 'C');