var a = 2

var o = {
  a: 1,
  b() {
    return () => console.log(this.a)
  }
}

o.b()

