
var lengthOfLongestSubstring = function(s) {
	var max = 0
	var lastIndex = 0;
	[...s].forEach((item, index) => {
		var i = s.indexOf(item, lastIndex)
		if (i > -1 && i < index) {
			max = Math.max(index - lastIndex, max);
			lastIndex = i + 1;
		}		
	})
	return Math.max(s.length - lastIndex, max);
}


