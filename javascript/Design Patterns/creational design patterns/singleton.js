
class Singleton_1 {

}

const singleton_1 = new Singleton_1()

export const getSingleton = () => singleton_1

// 2
const singleton_2 = Object.create(null)
export const getSingleton = () => singleton_2

// lazy initialization
class Singleton_3 {

}
const singleton_3 = null
export const getSingleton = () => {
  if (!singleton_3) singleton_3 = new Singleton_3()

  return singleton_3
}
