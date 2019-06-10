// 根据客户端的需求，返回对应的类的实例

interface computerObj {
  ram: string;
  hdd: string;
  cpu: string;
}

abstract class Computer {
  abstract getRAM(): string;
  abstract getHDD(): string;
  abstract getCPU(): string;
}

class PC extends Computer {
  private ram: string;
  private hdd: string;
  private cpu: string;

  constructor(opts:computerObj) {
    super();
    this.ram = opts.ram;
    this.hdd = opts.hdd;
    this.cpu = opts.cpu;

  }

  getRAM() {
    return this.ram;
  }
  getHDD() {
    return this.hdd;
  }
  getCPU() {
    return this.cpu;
  }
}

class Server extends Computer {
  private ram: string;
  private hdd: string;
  private cpu: string;

  constructor(opts: computerObj) {
    super();
    this.ram = opts.ram;
    this.hdd = opts.hdd;
    this.cpu = opts.cpu;

  }

  getRAM() {
    return this.ram;
  }
  getHDD() {
    return this.hdd;
  }
  getCPU() {
    return this.cpu;
  }
}

function getComputer (type:string, rest:computerObj): Computer {
  if (type === 'pc') return new PC(rest);

  if (type === 'server') return new Server(rest);

  return null;
}


// test
const o = getComputer('pc', {ram: '1', hdd:'2', cpu: '3'});

console.log(o);
