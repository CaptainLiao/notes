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

