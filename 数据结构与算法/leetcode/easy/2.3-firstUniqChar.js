
function firstUniqChar( str ) {
  let o = {}
  let len = str.length

  for( var i = 0; i < len; ++i ) {
    o[str[i]] = ~~o[str[i]] + 1;
  }
  for( var i = 0; i < len; ++i ) {
    if( o[str[i]] === 1) {
      return i;
    }
  }
}
