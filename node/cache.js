function memCache() {
  return {
    __data: Object.create(null),

    has: function(id) {
      return !!this.__data[id]
    },
    set: function(id, val) {
      this.__data[id] = vale;
    },
    get: function(id) {
      return this.__data[id]
    },
    del: function(id) {
      delete this.__data[id]
    }
  }
}

// http://www.cse.yorku.ca/~oz/hash.html
function stringHash(str) {
  var hash = 5381,
    i = str.length;

  while (i)
    hash = (hash * 33) ^ str.charCodeAt(--i);
  return (hash >>> 0).toString(36);
}